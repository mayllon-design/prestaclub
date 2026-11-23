"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/shared/components/ui/button";
import { authHeaders } from "@/features/articulos/api";
import { DURACIONES, PAGINAS, TODAS, type PopupConfig } from "./types";

const VACIO: PopupConfig = { activo: false, image_url: "", alt_text: "", duracion_ms: 3000, paginas: ["/"], version: "" };

export default function PopupAdmin() {
  const [config, setConfig] = useState<PopupConfig>(VACIO);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [subiendo, setSubiendo] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/admin/popup", { headers: await authHeaders() });
      const data = await res.json().catch(() => null);
      if (!res.ok) setError(data?.error || "No se pudo cargar el popup.");
      else if (data) setConfig(data);
      setCargando(false);
    })();
  }, []);

  const set = <K extends keyof PopupConfig>(k: K, v: PopupConfig[K]) => setConfig((c) => ({ ...c, [k]: v }));

  const todas = config.paginas.includes(TODAS);
  const togglePagina = (path: string) => {
    if (path === TODAS) return set("paginas", todas ? [] : [TODAS]);
    const actuales = config.paginas.filter((p) => p !== TODAS);
    set("paginas", actuales.includes(path) ? actuales.filter((p) => p !== path) : [...actuales, path]);
  };

  const subirImagen = async (file: File) => {
    if (!file.type.startsWith("image/")) return toast.error("El archivo debe ser una imagen.");
    if (file.size > 2 * 1024 * 1024) return toast.error("La imagen pesa más de 2 MB. Comprímela antes de subirla.");
    setSubiendo(true);
    const form = new FormData();
    form.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", headers: await authHeaders(), body: form });
    const data = await res.json().catch(() => ({}));
    setSubiendo(false);
    if (res.ok && data.url) {
      set("image_url", data.url);
      toast.success("Imagen subida. Recuerda guardar los cambios.");
    } else {
      toast.error(data.error || "No se pudo subir la imagen.");
    }
  };

  const guardar = async () => {
    setGuardando(true);
    const res = await fetch("/api/admin/popup", {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...(await authHeaders()) },
      body: JSON.stringify(config),
    });
    const data = await res.json().catch(() => ({}));
    setGuardando(false);
    if (res.ok) toast.success(config.activo ? "Popup guardado y encendido." : "Popup guardado (apagado).");
    else toast.error(data.error || "No se pudo guardar.");
  };

  if (cargando) return <p className="text-muted-foreground">Cargando…</p>;
  if (error) return <p className="text-red-700 bg-red-50 border border-red-200 rounded-xl p-4">{error}</p>;

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Popup de la web</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Se muestra una vez por visita. Al guardar cambios vuelve a mostrarse a quien ya lo vio. Los cambios
          pueden tardar hasta 1 minuto en verse en la web.
        </p>
      </div>

      <div className="grid md:grid-cols-[1fr_280px] gap-6">
        <div className="space-y-6">
          {/* Encendido */}
          <section className="bg-white rounded-2xl border p-5 flex items-center justify-between gap-4">
            <div>
              <p className="font-semibold">Estado</p>
              <p className="text-sm text-muted-foreground">{config.activo ? "Encendido: se muestra en las páginas elegidas." : "Apagado: no se muestra en ninguna página."}</p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={config.activo}
              onClick={() => set("activo", !config.activo)}
              className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${config.activo ? "bg-green-600" : "bg-slate-300"}`}
            >
              <span className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-all ${config.activo ? "left-[22px]" : "left-0.5"}`} />
              <span className="sr-only">Encender o apagar el popup</span>
            </button>
          </section>

          {/* Imagen */}
          <section className="bg-white rounded-2xl border p-5 space-y-3">
            <p className="font-semibold">Imagen</p>
            <p className="text-sm text-muted-foreground">Formato vertical recomendado (por ejemplo 640 × 800 px), JPG, PNG o WebP, máximo 2 MB.</p>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) subirImagen(f);
                e.target.value = "";
              }}
            />
            <Button type="button" variant="outline" disabled={subiendo} onClick={() => inputRef.current?.click()}>
              {subiendo ? "Subiendo…" : config.image_url ? "Cambiar imagen" : "Subir imagen"}
            </Button>
            <label className="block">
              <span className="block text-sm font-semibold mb-1">Texto de la imagen (para lectores de pantalla y Google)</span>
              <textarea
                value={config.alt_text}
                onChange={(e) => set("alt_text", e.target.value)}
                rows={3}
                maxLength={500}
                placeholder="Escribe lo que dice la imagen"
                className="w-full rounded-xl border px-3 py-2 text-sm"
              />
            </label>
          </section>

          {/* Duración */}
          <section className="bg-white rounded-2xl border p-5 space-y-3">
            <p className="font-semibold">Duración</p>
            <select
              value={config.duracion_ms}
              onChange={(e) => set("duracion_ms", Number(e.target.value))}
              className="w-full rounded-xl border px-3 py-2 text-sm bg-white"
            >
              {DURACIONES.map((d) => (
                <option key={d.ms} value={d.ms}>{d.label}</option>
              ))}
            </select>
            <p className="text-sm text-muted-foreground">El visitante siempre puede cerrarlo antes con la X o tocando fuera.</p>
          </section>

          {/* Páginas */}
          <section className="bg-white rounded-2xl border p-5 space-y-3">
            <p className="font-semibold">Páginas donde se muestra</p>
            <label className="flex items-center gap-2 text-sm font-semibold">
              <input type="checkbox" checked={todas} onChange={() => togglePagina(TODAS)} className="h-4 w-4" />
              Todas las páginas
            </label>
            <div className="grid sm:grid-cols-2 gap-2">
              {PAGINAS.map((p) => (
                <label key={p.path} className={`flex items-center gap-2 text-sm ${todas ? "opacity-50" : ""}`}>
                  <input
                    type="checkbox"
                    disabled={todas}
                    checked={todas || config.paginas.includes(p.path)}
                    onChange={() => togglePagina(p.path)}
                    className="h-4 w-4"
                  />
                  {p.label}
                </label>
              ))}
            </div>
          </section>

          <Button onClick={guardar} disabled={guardando || subiendo} className="w-full sm:w-auto">
            {guardando ? "Guardando…" : "Guardar cambios"}
          </Button>
        </div>

        {/* Vista previa */}
        <aside className="md:sticky md:top-6 self-start">
          <p className="text-sm font-semibold mb-2">Vista previa</p>
          <div className="rounded-2xl bg-slate-800/80 p-6 flex items-center justify-center min-h-[320px]">
            {config.image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={config.image_url} alt={config.alt_text} className="w-full max-w-[240px] h-auto rounded-xl shadow-2xl" />
            ) : (
              <span className="text-sm text-white/70">Sin imagen</span>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
