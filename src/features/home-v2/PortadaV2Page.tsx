"use client";

// Portada alternativa "Elige tu camino" (diseño 1b de Claude Design, proyecto
// "Portada dividida Prestaclub"). Vive en /inicio-v2 para compararla con la home actual.

import { useState, type ReactNode } from "react";
import Link from "next/link";
import Image, { type StaticImageData } from "next/image";
import Layout from "@/core/layouts/MainLayout";
import fotoPersonas from "@/assets/portada-personas-pymes.webp";
import fotoEmpresas from "@/assets/portada-empresas-inmobiliario.webp";

type Opcion = { nombre: string; detalle: string; href: string; icono: ReactNode };

const svg = (d: ReactNode, color = "#F5921E") => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {d}
  </svg>
);

const iconoCasa = svg(<path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z" />);
const iconoMaletin = svg(<><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18" /></>);
const iconoObra = svg(<path d="M4 21h16M6 21V10l6-4 6 4v11M10 21v-5h4v5" />);
const iconoDeudas = svg(<path d="M4 6h5l4 6-4 6H4M20 12h-7M17 9l3 3-3 3" />);
const iconoTraslado = svg(<path d="M7 4v13M4 14l3 3 3-3M17 20V7M14 10l3-3 3 3" />);
const iconoAuto = svg(<><path d="M5 17h14M5 17a2 2 0 1 0 4 0M15 17a2 2 0 1 0 4 0M3 17v-4l2-5h12l3 5v4" /><path d="M3 13h18" /></>, "#1D2B6C");
const iconoDocumento = svg(<><path d="M14 3H7a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7z" /><path d="M14 3v4h4M9 13l2 2 4-4" /></>, "#1D2B6C");
const iconoEdificio = svg(<path d="M3 21h18M5 21V5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v16M15 9h3a1 1 0 0 1 1 1v11M8 8h2M8 12h2M8 16h2" />);

const opcionesPersonas: Opcion[] = [
  { nombre: "Libre uso", detalle: "Si necesitas dinero de libre uso con tu inmueble como respaldo", href: "/financiamiento-con-garantia-hipotecaria", icono: iconoCasa },
  { nombre: "Capital de Trabajo", detalle: "Si necesitas capital para tu negocio: mercadería, campaña o local", href: "/capital-de-trabajo", icono: iconoMaletin },
  { nombre: "Construcción", detalle: "Si quieres construir, ampliar o remodelar tu inmueble", href: "/financiamiento-con-garantia-hipotecaria/construccion", icono: iconoObra },
  { nombre: "Consolidación de Deudas", detalle: "Si quieres unir tus deudas en una sola cuota", href: "/financiamiento-con-garantia-hipotecaria/consolidacion-de-deudas", icono: iconoDeudas },
  { nombre: "Compra de Hipoteca", detalle: "Si ya tienes una hipoteca y quieres trasladarla", href: "/financiamiento-con-garantia-hipotecaria/compra-de-hipoteca", icono: iconoTraslado },
];

// Servicios que no son préstamo con garantía hipotecaria: van en un grupo aparte.
const otrasSoluciones: Opcion[] = [
  { nombre: "Crédito con Garantía Vehicular", detalle: "Si quieres liquidez rápida dejando tu auto en custodia", href: "/prestamo-con-garantia-vehicular", icono: iconoAuto },
  { nombre: "Saneamiento Predial", detalle: "Si necesitas regularizar tu propiedad ante SUNARP", href: "/saneamiento-predial", icono: iconoDocumento },
];

type Destacado = { titulo: string; valor: string; nota: string; puntos: string[] };

const datosEmpresas: Destacado = {
  titulo: "Por qué las empresas nos eligen",
  valor: "S/ 200,000 – S/ 2,000,000",
  nota: "Rango de financiamiento para empresas",
  puntos: [
    "Evaluamos el valor de tu inmueble, no solo tu historial",
    "Fondos de inversión institucionales, no banca tradicional",
    "Desarrollo inmobiliario con cobertura en todo el Perú",
  ],
};

// Cómo se llena la tarjeta de empresas, que tiene menos opciones que la de personas:
// "datos"   -> opciones normales + recuadro "Por qué las empresas nos eligen"
// "grandes" -> las dos opciones como tarjetas grandes que ocupan todo el alto
const ESTILO_EMPRESAS = "grandes" as "datos" | "grandes";

const opcionesEmpresas: Opcion[] = [
  { nombre: "Garantía Hipotecaria para Empresas", detalle: "Si tu empresa (RUC 20) necesita capital desde S/ 200,000", href: "/prestamos-con-garantia-hipotecaria-para-empresas", icono: iconoEdificio },
  { nombre: "Desarrollo Inmobiliario", detalle: "Si quieres financiar un proyecto inmobiliario", href: "/desarrollo-inmobiliario", icono: iconoObra },
];

const detalleLargoEmpresas: Record<string, string> = {
  "/prestamos-con-garantia-hipotecaria-para-empresas":
    "Capital de S/ 200,000 a S/ 2,000,000 para tu empresa con RUC 20, usando un inmueble como respaldo. La evaluación mira el valor de la garantía, no solo el historial.",
  "/desarrollo-inmobiliario":
    "Financiamiento y crédito puente para tu proyecto inmobiliario, a través de fondos de inversión institucionales. Cobertura en todo el Perú.",
};

const cifras = [
  { valor: "+24", texto: "años en el mercado" },
  { valor: "+15,000", texto: "operaciones gestionadas" },
  { valor: "+S/ 700M", texto: "desembolsados" },
  { valor: "SBS", texto: "empresa registrada" },
];

type TarjetaProps = {
  numero: string;
  etiqueta: string;
  titulo: ReactNode;
  resumen: string;
  foto: StaticImageData;
  altFoto: string;
  opciones: Opcion[];
  extras?: Opcion[];
  // Si se indica, las opciones se muestran como subcategorías de esta categoría.
  categoria?: { nombre: string; icono: ReactNode };
  destacado?: Destacado;
  opcionesGrandes?: boolean;
  cta: { texto: string; href: string };
  variante: "dorada" | "azul";
};

const Tarjeta = ({ numero, etiqueta, titulo, resumen, foto, altFoto, opciones, extras, categoria, destacado, opcionesGrandes, cta, variante }: TarjetaProps) => {
  // En móvil la lista se puede plegar; en escritorio siempre está visible.
  const [abierta, setAbierta] = useState(true);
  const dorada = variante === "dorada";

  return (
    <div className={`bg-white rounded-[20px] md:rounded-3xl overflow-hidden shadow-[0_24px_60px_rgba(13,22,63,0.16)] flex flex-col border-t-[6px] ${dorada ? "border-[#F9B826]" : "border-[#1D2B6C]"}`}>
      <button
        type="button"
        onClick={() => setAbierta(!abierta)}
        aria-expanded={abierta}
        className="text-left md:cursor-default"
      >
        <div className="relative h-[130px] md:h-[170px]">
          <Image src={foto} alt={altFoto} fill sizes="(min-width: 768px) 600px, 100vw" className="object-cover" />
          <span className={`absolute top-3 left-3 md:top-4 md:left-4 font-extrabold text-[10px] md:text-xs tracking-[0.08em] uppercase px-2.5 py-1.5 md:px-3 rounded-full ${dorada ? "bg-[#F9B826] text-[#1A2340]" : "bg-[#1D2B6C] text-white"}`}>
            {numero} · {etiqueta}
          </span>
        </div>
        <div className="flex items-center gap-3 px-[18px] pt-3.5 md:px-7 md:pt-[22px]">
          <div className="flex-1 flex flex-col gap-1">
            <h2 className="text-lg md:text-[26px] font-extrabold text-[#1D2B6C] leading-[1.15] md:leading-[1.1]">{titulo}</h2>
            <span className="text-xs text-[#6B7390] md:hidden">{resumen}</span>
          </div>
          <span className="md:hidden w-8 h-8 rounded-full bg-[#F3F5F9] text-[#1D2B6C] text-lg font-extrabold flex items-center justify-center shrink-0" aria-hidden="true">
            {abierta ? "−" : "+"}
          </span>
        </div>
      </button>

      <div className={`${abierta ? "flex" : "hidden"} md:flex flex-col flex-1 px-[18px] pb-[18px] pt-3.5 md:px-7 md:pb-[26px]`}>
        <p className="text-[13px] md:text-sm font-extrabold text-[#1D2B6C] pb-1">Elige según tu necesidad</p>
        {opcionesGrandes ? (
        <ul className="flex flex-col gap-3 md:gap-4 md:flex-1 pt-2">
          {opciones.map((o) => (
            <li key={o.href} className="md:flex-1 flex">
              <Link
                href={o.href}
                className="group flex-1 flex flex-col md:flex-row md:items-center gap-3 md:gap-5 p-4 md:px-6 md:py-5 rounded-2xl border-[1.5px] border-[#E6E8EF] bg-white text-[#1D2B6C] hover:border-[#F9B826] hover:bg-[#FFFBF2] transition-colors"
              >
                <span className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-[#FFF3D6] flex items-center justify-center shrink-0 [&_svg]:w-6 [&_svg]:h-6 md:[&_svg]:w-8 md:[&_svg]:h-8">{o.icono}</span>
                <span className="flex flex-col gap-1.5 md:gap-2 min-w-0">
                  <span className="block text-base md:text-lg font-extrabold leading-tight">{o.nombre}</span>
                  <span className="block text-[13px] md:text-[13.5px] leading-relaxed text-[#6B7390]">{detalleLargoEmpresas[o.href] ?? o.detalle}</span>
                  <span className="text-[13px] md:text-sm font-extrabold text-[#F5921E] group-hover:translate-x-1 transition-transform">Conocer más →</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        ) : categoria ? (
        <div className="pt-1">
          <div className="flex items-center gap-3 md:gap-3.5 py-2">
            <span className="w-[34px] h-[34px] md:w-9 md:h-9 rounded-[10px] bg-[#F9B826] flex items-center justify-center shrink-0 [&_svg]:stroke-[#1A2340]">{categoria.icono}</span>
            <span className="flex-1 min-w-0">
              <span className="block text-[14.5px] md:text-base font-extrabold text-[#1D2B6C] leading-tight">{categoria.nombre}</span>
              <span className="block text-[11.5px] md:text-xs text-[#6B7390]">{opciones.length} opciones</span>
            </span>
          </div>
          <ul className="ml-[17px] md:ml-[18px] pl-4 md:pl-5 border-l-2 border-[#F9B826]/50 flex flex-col">
            {opciones.map((o, i) => (
              <li key={o.href} className="relative">
                <span className="absolute -left-4 md:-left-5 top-1/2 w-3 md:w-4 border-t-2 border-[#F9B826]/50" aria-hidden="true" />
                <Link
                  href={o.href}
                  className={`flex items-center gap-3 min-h-[52px] py-2 px-1.5 text-[#1D2B6C] rounded-[10px] hover:bg-[#F3F5F9] transition-colors ${i < opciones.length - 1 ? "border-b border-[#E6E8EF]" : ""}`}
                >
                  <span className="w-[30px] h-[30px] rounded-lg bg-[#FFF3D6] flex items-center justify-center shrink-0 [&_svg]:w-4 [&_svg]:h-4">{o.icono}</span>
                  <span className="flex-1 min-w-0">
                    <span className="block text-[13.5px] md:text-sm font-extrabold">{o.nombre}</span>
                    <span className="block text-[11.5px] md:text-[12.5px] leading-[1.35] text-[#6B7390]">{o.detalle}</span>
                  </span>
                  <span className="text-[#F5921E] font-extrabold" aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        ) : (
        <ul className="flex flex-col">
          {opciones.map((o, i) => (
            <li key={o.href}>
              <Link
                href={o.href}
                className={`flex items-center gap-3 md:gap-3.5 min-h-14 py-2 md:py-2.5 px-0.5 md:px-1.5 text-[#1D2B6C] rounded-[10px] hover:bg-[#F3F5F9] transition-colors ${i < opciones.length - 1 ? "border-b border-[#E6E8EF]" : ""}`}
              >
                <span className="w-[34px] h-[34px] md:w-9 md:h-9 rounded-[10px] bg-[#FFF3D6] flex items-center justify-center shrink-0">{o.icono}</span>
                <span className="flex-1 min-w-0">
                  <span className="block text-[13.5px] md:text-sm font-extrabold">{o.nombre}</span>
                  <span className="block text-[11.5px] md:text-[12.5px] leading-[1.35] text-[#6B7390]">{o.detalle}</span>
                </span>
                <span className="text-[#F5921E] font-extrabold" aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ul>
        )}
        {extras && extras.length > 0 && (
          <div className="mt-4 pt-3 border-t-2 border-dashed border-[#E6E8EF]">
            <p className="text-[11px] font-extrabold text-[#6B7390] uppercase tracking-[0.1em] pb-2">También te ayudamos con</p>
            <ul className="grid sm:grid-cols-2 gap-2">
              {extras.map((o) => (
                <li key={o.href}>
                  <Link
                    href={o.href}
                    className="flex items-center gap-3 h-full p-2.5 rounded-xl bg-[#F3F5F9] text-[#1D2B6C] hover:bg-[#E8ECF8] transition-colors"
                  >
                    <span className="w-[34px] h-[34px] rounded-[10px] bg-white flex items-center justify-center shrink-0">{o.icono}</span>
                    <span className="flex-1 min-w-0">
                      <span className="block text-[13px] font-extrabold leading-tight">{o.nombre}</span>
                      <span className="block text-[11.5px] leading-[1.35] text-[#6B7390]">{o.detalle}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        {destacado && (
          <div className="mt-4 md:mt-6 rounded-2xl bg-[#EEF1FA] p-5 md:p-6 flex flex-col md:flex-1">
            <p className="text-[11px] font-extrabold text-[#6B7390] uppercase tracking-[0.1em]">{destacado.titulo}</p>
            <p className="mt-3 text-[22px] md:text-[28px] font-extrabold text-[#1D2B6C] leading-tight">
              {/* Cada monto queda entero; si no cabe, el salto cae después del guion. */}
              {destacado.valor.split(" – ").map((parte, i) => (
                <span key={parte}>{i > 0 && " – "}<span className="whitespace-nowrap">{parte}</span></span>
              ))}
            </p>
            <p className="text-[12.5px] text-[#6B7390]">{destacado.nota}</p>
            <ul className="mt-4 md:mt-auto md:pt-5 flex flex-col gap-2.5">
              {destacado.puntos.map((punto) => (
                <li key={punto} className="flex items-start gap-2.5 text-[13px] md:text-sm font-semibold text-[#1D2B6C] leading-snug">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-[#1D2B6C] text-white flex items-center justify-center shrink-0" aria-hidden="true">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L20 7" /></svg>
                  </span>
                  {punto}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="mt-4 md:mt-auto md:pt-[26px]">
          <Link
            href={cta.href}
            className={`flex justify-center items-center min-h-12 md:py-[15px] rounded-xl font-extrabold text-xs md:text-sm uppercase tracking-[0.04em] text-center px-3 transition-colors ${dorada ? "bg-gradient-to-r from-[#F9B826] to-[#F5921E] text-[#1A2340] hover:brightness-105" : "bg-[#1D2B6C] text-white hover:bg-[#0B163F]"}`}
          >
            {cta.texto} →
          </Link>
        </div>
      </div>
    </div>
  );
};

const PortadaV2Page = () => {
  return (
    <Layout>
      <section className="relative bg-[#F3F5F9] overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-[280px] md:h-[360px] bg-gradient-to-br from-[#1D2B6C] to-[#0B163F]" aria-hidden="true" />
        <div className="absolute -top-[120px] -right-20 w-[420px] h-[420px] rounded-full bg-[radial-gradient(circle,rgba(249,184,38,0.35),rgba(249,184,38,0)_70%)]" aria-hidden="true" />

        <div className="relative text-center px-6 pt-10 md:pt-14 flex flex-col gap-1.5 md:gap-2.5 items-center">
          <span className="text-[#F9B826] text-[11px] md:text-xs font-extrabold tracking-[0.14em] uppercase">
            Financiamiento alternativo<span className="hidden md:inline"> · +24 años</span>
          </span>
          <h1 className="text-white text-[26px] md:text-[46px] font-extrabold leading-[1.1] md:leading-[1.05] tracking-[-0.02em]">
            ¿Qué tipo de financiamiento necesitas?
          </h1>
          <p className="text-white/85 text-[13px] md:text-base max-w-[560px]">
            <span className="md:hidden">Toca la opción que te describe.</span>
            <span className="hidden md:inline">Elige la opción que te describe y te llevamos directo a la solución correcta.</span>
          </p>
        </div>

        <div className="relative max-w-[1200px] mx-auto grid md:grid-cols-2 gap-3.5 md:gap-12 px-4 md:px-10 pt-5 md:pt-[30px] items-stretch">
          <Tarjeta
            numero="01"
            etiqueta="Personas y Pymes"
            titulo={<>Soy persona o tengo un negocio <span className="text-[#F5921E]">(DNI / RUC 10)</span></>}
            resumen="De S/ 10 mil a S/ 1 millón"
            foto={fotoPersonas}
            altFoto="Familia emprendedora en su tienda de productos peruanos"
            opciones={opcionesPersonas}
            categoria={{ nombre: "Financiamiento con Garantía Hipotecaria", icono: iconoCasa }}
            extras={otrasSoluciones}
            cta={{ texto: "Ver financiamiento para personas y pymes", href: "/financiamiento-con-garantia-hipotecaria" }}
            variante="dorada"
          />
          <Tarjeta
            numero="02"
            etiqueta="Empresas e Inmobiliario"
            titulo={<>Represento una empresa <span className="text-[#F5921E]">(RUC 20)</span> o desarrollo proyectos inmobiliarios</>}
            resumen="Desde S/ 200,000 · personas jurídicas"
            foto={fotoEmpresas}
            altFoto="Edificio en construcción con grúas en Lima al atardecer"
            opciones={opcionesEmpresas}
            destacado={ESTILO_EMPRESAS === "datos" ? datosEmpresas : undefined}
            opcionesGrandes={ESTILO_EMPRESAS === "grandes"}
            cta={{ texto: "Ver financiamiento para empresas", href: "/prestamos-con-garantia-hipotecaria-para-empresas" }}
            variante="azul"
          />
        </div>

        <div className="relative grid grid-cols-2 gap-y-8 gap-x-4 md:flex md:justify-center md:gap-20 px-6 md:px-16 pt-14 pb-16 md:pt-20 md:pb-24">
          {cifras.map((c) => (
            <div key={c.valor} className="text-center">
              <div className="text-[32px] md:text-5xl font-extrabold text-[#1D2B6C] leading-none">{c.valor}</div>
              <div className="mt-2 text-sm md:text-base text-[#6B7390]">
                {c.texto}
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default PortadaV2Page;
