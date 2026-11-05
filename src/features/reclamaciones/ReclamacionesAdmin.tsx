"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/shared/components/ui/button";
import { authHeaders } from "@/features/articulos/api";
import { venceEn, type Reclamacion } from "./types";

const fechaCorta = (d: Date) => d.toLocaleDateString("es-PE", { day: "2-digit", month: "2-digit", year: "numeric" });

function Tarjeta({ r, onCambio }: { r: Reclamacion; onCambio: () => void }) {
  const [respuesta, setRespuesta] = useState(r.respuesta ?? "");
  const [guardando, setGuardando] = useState(false);

  const vence = venceEn(r.fecha_iso);
  const vencida = r.estado === "pendiente" && vence.getTime() < Date.now();

  const guardar = async (estado: "atendido" | "pendiente") => {
    setGuardando(true);
    const res = await fetch(`/api/admin/reclamaciones/${r.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...(await authHeaders()) },
      body: JSON.stringify({ estado, respuesta }),
    });
    setGuardando(false);
    if (res.ok) {
      toast.success("Reclamación actualizada");
      onCambio();
    } else {
      const data = await res.json().catch(() => ({}));
      toast.error(data.error || "No se pudo actualizar");
    }
  };

  return (
    <article className="bg-white rounded-2xl border p-5 space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <strong className="text-primary">{r.codigo}</strong>
        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-muted capitalize">{r.tipo}</span>
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${r.estado === "atendido" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}>{r.estado}</span>
        {r.estado === "pendiente" && (
          <span className={`text-xs font-semibold ${vencida ? "text-red-700" : "text-muted-foreground"}`}>
            {vencida ? "Plazo vencido el" : "Responder antes del"} {fechaCorta(vence)} (sin contar feriados)
          </span>
        )}
        <span className="text-xs text-muted-foreground ml-auto">{r.fecha_txt}</span>
      </div>
      <div className="text-sm space-y-1">
        <p><strong>Consumidor:</strong> {r.con_nombre} · {r.con_doc_tipo} {r.con_doc_num}</p>
        <p><strong>Contacto:</strong> {r.con_telefono || "—"} · {r.con_email || "—"} · {r.con_domicilio || "—"}</p>
        <p><strong>Responder por:</strong> {r.medio_respuesta === "correo" ? "correo electrónico" : "carta"}</p>
        {r.con_menor === 1 && <p><strong>Menor de edad.</strong> Apoderado: {r.apo_nombre || "—"}</p>}
        <p><strong>Bien:</strong> {r.bien_tipo}{r.bien_producto ? ` · ${r.bien_producto}` : ""}{r.bien_monto ? ` · S/ ${r.bien_monto}` : ""}{r.oficina ? ` · ${r.oficina}` : ""}</p>
        {r.bien_descripcion && <p><strong>Descripción:</strong> {r.bien_descripcion}</p>}
        <p className="whitespace-pre-line"><strong>Detalle:</strong> {r.detalle}</p>
        {r.pedido && <p className="whitespace-pre-line"><strong>Pedido:</strong> {r.pedido}</p>}
        {r.fecha_respuesta_txt && <p><strong>Atendida el:</strong> {r.fecha_respuesta_txt}</p>}
      </div>
      <label className="block">
        <span className="block text-sm font-semibold mb-1">Respuesta y acciones adoptadas</span>
        <textarea
          className="w-full px-3 py-2 rounded-xl border border-input text-sm outline-none focus:ring-2 focus:ring-ring"
          rows={3}
          value={respuesta}
          onChange={(e) => setRespuesta(e.target.value)}
        />
      </label>
      {r.estado === "pendiente" ? (
        <Button size="sm" onClick={() => guardar("atendido")} disabled={guardando}>Marcar como atendida</Button>
      ) : (
        <Button size="sm" variant="outline" onClick={() => guardar("pendiente")} disabled={guardando}>Reabrir</Button>
      )}
    </article>
  );
}

export default function ReclamacionesAdmin() {
  const [items, setItems] = useState<Reclamacion[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const cargar = useCallback(async () => {
    const res = await fetch("/api/admin/reclamaciones", { headers: await authHeaders() });
    const data = await res.json().catch(() => ({}));
    if (res.ok) {
      setItems(data);
      setError("");
    } else {
      setError(data.error || "No se pudo cargar el libro.");
    }
    setCargando(false);
  }, []);

  useEffect(() => {
    cargar();
  }, [cargar]);

  const pendientes = items.filter((r) => r.estado === "pendiente").length;

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Libro de Reclamaciones</h2>
        <p className="text-muted-foreground">{items.length} registro(s) · {pendientes} pendiente(s)</p>
      </div>
      {cargando && <p className="text-muted-foreground">Cargando…</p>}
      {error && <p role="alert" className="rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm p-3">{error}</p>}
      {!cargando && !error && items.length === 0 && <p className="text-muted-foreground">Aún no hay reclamaciones registradas.</p>}
      {items.map((r) => <Tarjeta key={r.id} r={r} onCambio={cargar} />)}
    </div>
  );
}
