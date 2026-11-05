"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { CheckCircle2, Printer } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { DOC_TIPOS, OFICINAS, PLAZO_DIAS_HABILES, PRODUCTOS, PROVEEDOR } from "./types";

const inputClass =
  "w-full h-11 px-4 rounded-xl border border-input bg-background text-foreground focus:ring-2 focus:ring-ring outline-none";
const textareaClass =
  "w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:ring-2 focus:ring-ring outline-none";

const Campo = ({ label, children }: { label: string; children: ReactNode }) => (
  <label className="block">
    <span className="block text-sm font-semibold text-foreground mb-1">{label}</span>
    {children}
  </label>
);

const Seccion = ({ titulo, children }: { titulo: string; children: ReactNode }) => (
  <fieldset className="space-y-4">
    <legend className="text-lg font-extrabold text-primary pb-2">{titulo}</legend>
    {children}
  </fieldset>
);

const Opcion = ({ activa, onClick, children }: { activa: boolean; onClick: () => void; children: ReactNode }) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={activa}
    className={`p-3 rounded-xl border-2 text-sm font-semibold transition-all ${activa ? "border-primary bg-primary/5 text-primary" : "border-border text-muted-foreground hover:border-primary/50"}`}
  >
    {children}
  </button>
);

const inicial = {
  con_nombre: "",
  con_doc_tipo: "DNI",
  con_doc_num: "",
  con_domicilio: "",
  con_telefono: "",
  con_email: "",
  con_menor: false,
  apo_nombre: "",
  medio_respuesta: "correo",
  bien_tipo: "servicio",
  bien_producto: "",
  bien_monto: "",
  bien_descripcion: "",
  oficina: "",
  tipo: "",
  detalle: "",
  pedido: "",
  empresa_web: "",
};

type Constancia = { codigo: string; fecha?: string; correoEnviado?: boolean };

export default function ReclamacionForm() {
  const [f, setF] = useState(inicial);
  const [acepta, setAcepta] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState("");
  const [constancia, setConstancia] = useState<Constancia | null>(null);

  const set = <K extends keyof typeof inicial>(campo: K, valor: (typeof inicial)[K]) =>
    setF((prev) => ({ ...prev, [campo]: valor }));

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!f.tipo) {
      setError("Selecciona si es un reclamo o una queja.");
      return;
    }
    setEnviando(true);
    setError("");
    try {
      const res = await fetch("/api/reclamacion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(f),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "No pudimos registrar tu reclamación. Inténtalo de nuevo.");
        return;
      }
      setConstancia(data);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setError("No hay conexión. Inténtalo de nuevo o escríbenos a informes@prestaclub.com.");
    } finally {
      setEnviando(false);
    }
  };

  if (constancia) {
    return (
      <div className="card-elevated p-6 md:p-10 text-center space-y-4 bg-card">
        <CheckCircle2 className="h-14 w-14 text-gold mx-auto" />
        <h2 className="text-2xl font-extrabold text-foreground">Reclamación registrada</h2>
        <p className="text-muted-foreground font-body">Tu hoja de reclamación quedó registrada con el código:</p>
        <p className="text-2xl font-extrabold text-primary break-all">{constancia.codigo}</p>
        <div className="text-left text-sm font-body bg-muted/50 rounded-xl p-4 space-y-1">
          {constancia.fecha && <p><strong>Fecha:</strong> {constancia.fecha}</p>}
          <p><strong>Proveedor:</strong> {PROVEEDOR.razonSocial}, RUC {PROVEEDOR.ruc}</p>
          <p><strong>Consumidor:</strong> {f.con_nombre} ({f.con_doc_tipo} {f.con_doc_num})</p>
          <p><strong>Tipo:</strong> {f.tipo === "reclamo" ? "Reclamo" : "Queja"}</p>
          <p className="whitespace-pre-line"><strong>Detalle:</strong> {f.detalle}</p>
          {f.pedido && <p className="whitespace-pre-line"><strong>Pedido:</strong> {f.pedido}</p>}
        </div>
        <p className="text-muted-foreground font-body">
          Guarda este código como constancia. Te responderemos por {f.medio_respuesta === "correo" ? "correo electrónico" : "carta"} en
          un plazo no mayor a <strong>{PLAZO_DIAS_HABILES} días hábiles</strong>.
          {constancia.correoEnviado && " También enviamos una copia a tu correo."}
        </p>
        <Button variant="outline" onClick={() => window.print()} className="print:hidden">
          <Printer className="h-4 w-4 mr-2" /> Imprimir o guardar constancia
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card-elevated p-6 md:p-10 space-y-8 bg-card">
      <div className="rounded-xl bg-muted/50 p-4 text-sm font-body text-foreground">
        <p className="font-bold">{PROVEEDOR.razonSocial}</p>
        <p>RUC {PROVEEDOR.ruc}</p>
        <p>{PROVEEDOR.domicilio}</p>
      </div>

      <Seccion titulo="1. Identificación del consumidor">
        <Campo label="Nombre y apellidos *">
          <input className={inputClass} value={f.con_nombre} onChange={(e) => set("con_nombre", e.target.value)} maxLength={200} autoComplete="name" required />
        </Campo>
        <div className="grid sm:grid-cols-2 gap-4">
          <Campo label="Tipo de documento *">
            <select className={inputClass} value={f.con_doc_tipo} onChange={(e) => set("con_doc_tipo", e.target.value)}>
              {DOC_TIPOS.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </Campo>
          <Campo label="Número de documento *">
            <input className={inputClass} value={f.con_doc_num} onChange={(e) => set("con_doc_num", e.target.value)} maxLength={20} required />
          </Campo>
          <Campo label="Teléfono">
            <input className={inputClass} type="tel" value={f.con_telefono} onChange={(e) => set("con_telefono", e.target.value)} maxLength={30} autoComplete="tel" />
          </Campo>
          <Campo label={f.medio_respuesta === "correo" ? "Correo electrónico *" : "Correo electrónico"}>
            <input className={inputClass} type="email" value={f.con_email} onChange={(e) => set("con_email", e.target.value)} maxLength={200} autoComplete="email" required={f.medio_respuesta === "correo"} />
          </Campo>
        </div>
        <Campo label={f.medio_respuesta === "carta" ? "Domicilio *" : "Domicilio"}>
          <input className={inputClass} value={f.con_domicilio} onChange={(e) => set("con_domicilio", e.target.value)} maxLength={300} autoComplete="street-address" required={f.medio_respuesta === "carta"} />
        </Campo>
        <div>
          <span className="block text-sm font-semibold text-foreground mb-2">¿Cómo quieres recibir la respuesta? *</span>
          <div className="grid grid-cols-2 gap-3">
            <Opcion activa={f.medio_respuesta === "correo"} onClick={() => set("medio_respuesta", "correo")}>Por correo electrónico</Opcion>
            <Opcion activa={f.medio_respuesta === "carta"} onClick={() => set("medio_respuesta", "carta")}>Por carta a mi domicilio</Opcion>
          </div>
        </div>
        <label className="flex items-center gap-3 cursor-pointer text-sm text-foreground">
          <input type="checkbox" checked={f.con_menor} onChange={(e) => set("con_menor", e.target.checked)} className="h-4 w-4 accent-primary" />
          El consumidor es menor de edad
        </label>
        {f.con_menor && (
          <Campo label="Nombre del padre, madre o apoderado *">
            <input className={inputClass} value={f.apo_nombre} onChange={(e) => set("apo_nombre", e.target.value)} maxLength={200} required />
          </Campo>
        )}
      </Seccion>

      <Seccion titulo="2. Identificación del bien contratado">
        <div className="grid grid-cols-2 gap-3">
          <Opcion activa={f.bien_tipo === "servicio"} onClick={() => set("bien_tipo", "servicio")}>Servicio</Opcion>
          <Opcion activa={f.bien_tipo === "producto"} onClick={() => set("bien_tipo", "producto")}>Producto</Opcion>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Campo label="Producto o servicio">
            <select className={inputClass} value={f.bien_producto} onChange={(e) => set("bien_producto", e.target.value)}>
              <option value="">Selecciona</option>
              {PRODUCTOS.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </Campo>
          <Campo label="Monto reclamado (S/)">
            <input className={inputClass} type="number" min="0" step="0.01" value={f.bien_monto} onChange={(e) => set("bien_monto", e.target.value)} />
          </Campo>
        </div>
        <Campo label="Lugar de atención">
          <select className={inputClass} value={f.oficina} onChange={(e) => set("oficina", e.target.value)}>
            <option value="">Selecciona</option>
            {OFICINAS.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </Campo>
        <Campo label="Descripción">
          <input className={inputClass} value={f.bien_descripcion} onChange={(e) => set("bien_descripcion", e.target.value)} maxLength={500} placeholder="Ej.: número de operación, fecha de la atención" />
        </Campo>
      </Seccion>

      <Seccion titulo="3. Detalle de la reclamación">
        <div className="grid grid-cols-2 gap-3">
          <Opcion activa={f.tipo === "reclamo"} onClick={() => set("tipo", "reclamo")}>Reclamo</Opcion>
          <Opcion activa={f.tipo === "queja"} onClick={() => set("tipo", "queja")}>Queja</Opcion>
        </div>
        <p className="text-xs text-muted-foreground font-body">
          <strong>Reclamo:</strong> disconformidad relacionada a los productos o servicios.{" "}
          <strong>Queja:</strong> disconformidad no relacionada a los productos o servicios, o malestar respecto a la atención al público.
        </p>
        <Campo label="Detalle *">
          <textarea className={textareaClass} rows={5} value={f.detalle} onChange={(e) => set("detalle", e.target.value)} maxLength={5000} required />
        </Campo>
        <Campo label="Pedido del consumidor">
          <textarea className={textareaClass} rows={3} value={f.pedido} onChange={(e) => set("pedido", e.target.value)} maxLength={3000} />
        </Campo>
      </Seccion>

      {/* Honeypot: oculto para personas, los bots lo llenan */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label>
          No llenar
          <input type="text" tabIndex={-1} autoComplete="off" value={f.empresa_web} onChange={(e) => set("empresa_web", e.target.value)} />
        </label>
      </div>

      <div className="space-y-3 text-xs text-muted-foreground font-body">
        <p>
          La formulación del reclamo no impide acudir a otras vías de solución de controversias ni es requisito previo para
          interponer una denuncia ante el INDECOPI. El proveedor debe dar respuesta en un plazo no mayor a {PLAZO_DIAS_HABILES} días
          hábiles improrrogables.
        </p>
        <label className="flex items-start gap-3 cursor-pointer text-sm text-foreground">
          <input type="checkbox" checked={acepta} onChange={(e) => setAcepta(e.target.checked)} className="mt-1 h-4 w-4 accent-primary" required />
          <span>
            Declaro que los datos consignados son verdaderos y acepto su tratamiento para atender mi reclamación, conforme a la{" "}
            <a href="/politica-de-privacidad-de-prestaclub-2026.pdf" target="_blank" rel="noopener noreferrer" className="text-primary underline">Política de Privacidad</a>.
          </span>
        </label>
      </div>

      {error && <p role="alert" className="rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm p-3">{error}</p>}

      <Button type="submit" variant="gold" size="lg" className="w-full" disabled={enviando}>
        {enviando ? "Enviando…" : "Enviar reclamación"}
      </Button>
    </form>
  );
}
