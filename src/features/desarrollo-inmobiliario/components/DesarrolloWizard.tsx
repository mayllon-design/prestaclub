"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Check,
    ChevronRight,
    ArrowLeft,
    MessageCircle,
    Building2,
    MapPin,
    FileText,
    CircleDollarSign,
    Milestone,
    AlertCircle,
    ArrowRight
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import { useTrafficTracking } from "@/shared/hooks/useTrafficTracking";

interface WizardData {
    tipoProyecto: string;
    ubicacion: string;
    fase: string;
    unidades: string;
    monto: string;
    razonSocial: string;
    privacidad: boolean;
}

const DESARROLLO_PHASES = [
    "Idea de proyecto",
    "Terreno adquirido",
    "Preventa",
    "En ejecución / obra",
    "Cerca de finalización",
    "Terminado (remanente)"
];

const Paso1 = ({ value, onSelect }: { value: string, onSelect: (v: string) => void }) => (
    <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="space-y-6"
    >
        {value === "NO" ? (
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 space-y-6"
            >
                <div className="w-20 h-20 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto">
                    <AlertCircle className="w-10 h-10 text-amber-500" />
                </div>
                <div className="space-y-2">
                    <h3 className="font-display text-2xl md:text-3xl font-bold">Este financiamiento es específico</h3>
                    <p className="text-muted-foreground text-lg leading-relaxed max-w-md mx-auto">
                        Nuestro programa de <strong>Desarrollo Inmobiliario</strong> está diseñado exclusivamente para proyectos de construcción y edificaciones.
                    </p>
                </div>
                
                <div className="bg-card/50 border border-border/50 rounded-2xl p-6 text-left space-y-4">
                    <p className="text-sm font-semibold uppercase tracking-wider text-secondary">¿Buscas otro tipo de préstamo?</p>
                    <p className="text-foreground">
                        Si necesitas capital para otros fines con libertad de uso, nuestro <strong>Préstamo con Garantía Hipotecaria</strong> es la opción ideal para ti.
                    </p>
                    <Button variant="gold" className="w-full h-12 text-sm font-bold uppercase group" asChild>
                        <Link href="/financiamiento-con-garantia-hipotecaria">
                            Ver Garantía Hipotecaria
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </Button>
                </div>

                <button 
                    onClick={() => onSelect("")}
                    className="text-muted-foreground hover:text-foreground text-sm font-bold underline underline-offset-4 transition-colors"
                >
                    Regresar y cambiar respuesta
                </button>
            </motion.div>
        ) : (
            <>
                <div className="text-center mb-8">
                    <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4">
                        <Building2 className="w-8 h-8 text-secondary" />
                    </div>
                    <span className="text-secondary font-body text-sm uppercase tracking-widest mb-2 block">Paso 1</span>
                    <h3 className="font-display text-3xl md:text-4xl font-bold">Tipo de proyecto</h3>
                    <p className="text-muted-foreground text-lg md:text-xl mt-4 max-w-lg mx-auto leading-relaxed">
                        ¿Estás desarrollando un proyecto inmobiliario o mixto (edificio de viviendas, comercios, oficinas, etc.)?
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    {["SI", "NO"].map((opt) => (
                        <button
                            key={opt}
                            onClick={() => onSelect(opt)}
                            className={`py-8 rounded-2xl border-2 font-display text-3xl font-bold transition-all ${value === opt
                                ? "border-secondary bg-secondary/10 text-secondary"
                                : "border-border/50 bg-card/50 hover:border-secondary/50 text-muted-foreground"
                                }`}
                        >
                            {opt}
                        </button>
                    ))}
                </div>
            </>
        )}
    </motion.div>
);

const Paso2 = ({ data, update, showErrors }: { data: Partial<WizardData>, update: (f: keyof WizardData, v: string) => void, showErrors?: boolean }) => (
    <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="space-y-6"
    >
        <div className="text-center mb-8 sm:mb-10">
            <span className="text-secondary font-body text-sm uppercase tracking-widest mb-2 block">Paso 2</span>
            <h3 className="font-display text-3xl md:text-4xl font-bold">Sobre tu proyecto</h3>
        </div>

        <div className="space-y-8">
            <div>
                <label className={`block text-lg font-bold mb-3 flex items-center gap-2 ${showErrors && !data.ubicacion ? 'text-red-500' : 'text-foreground'}`}>
                    <MapPin className={`w-5 h-5 ${showErrors && !data.ubicacion ? 'text-red-500' : 'text-secondary'}`} /> Ubicación exacta
                    {showErrors && !data.ubicacion && <span className="text-red-500 text-sm font-normal ml-auto">Requerido</span>}
                </label>
                <input
                    type="text"
                    placeholder="Ej: Av. Benavides 1234, Miraflores"
                    value={data.ubicacion || ""}
                    onChange={(e) => update("ubicacion", e.target.value)}
                    className={`w-full bg-background border rounded-xl p-4 sm:p-5 text-base sm:text-lg outline-none transition-all placeholder:text-muted-foreground/40 ${showErrors && !data.ubicacion ? 'border-red-500/50 focus:ring-2 focus:ring-red-500/50' : 'border-border/50 focus:ring-2 focus:ring-secondary/50'}`}
                />
            </div>

            <div>
                <label className={`block text-lg font-bold mb-3 flex items-center gap-2 ${showErrors && !data.fase ? 'text-red-500' : 'text-foreground'}`}>
                    <Milestone className={`w-5 h-5 ${showErrors && !data.fase ? 'text-red-500' : 'text-secondary'}`} /> Fase del proyecto
                    {showErrors && !data.fase && <span className="text-red-500 text-sm font-normal ml-auto">Requerido</span>}
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
                    {DESARROLLO_PHASES.map((fase) => (
                        <button
                            key={fase}
                            onClick={() => update("fase", fase)}
                            className={`p-3 sm:p-4 rounded-xl border text-xs sm:text-sm font-bold transition-all shadow-sm ${data.fase === fase
                                ? "border-secondary bg-secondary/10 text-secondary scale-[1.02]"
                                : showErrors && !data.fase
                                    ? "border-red-500/50 bg-red-500/5 hover:border-red-500/80 text-red-600"
                                    : "border-border/50 bg-card/60 hover:border-secondary/30"
                                }`}
                        >
                            {fase}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <label className={`block text-lg font-bold mb-3 flex items-center gap-2 ${showErrors && !data.unidades ? 'text-red-500' : 'text-foreground'}`}>
                    <Building2 className={`w-5 h-5 ${showErrors && !data.unidades ? 'text-red-500' : 'text-secondary'}`} /> ¿Cuántas unidades inmobiliarias tendrá?
                    {showErrors && !data.unidades && <span className="text-red-500 text-sm font-normal ml-auto">Requerido</span>}
                </label>
                <input
                    type="text"
                    placeholder="Ej: 24 departamentos, 2 locales"
                    value={data.unidades || ""}
                    onChange={(e) => update("unidades", e.target.value)}
                    className={`w-full bg-background border rounded-xl p-4 sm:p-5 text-base sm:text-lg outline-none transition-all placeholder:text-muted-foreground/40 ${showErrors && !data.unidades ? 'border-red-500/50 focus:ring-2 focus:ring-red-500/50' : 'border-border/50 focus:ring-2 focus:ring-secondary/50'}`}
                />
            </div>
        </div>
    </motion.div>
);

const Paso3 = ({ data, update, showErrors }: { data: Partial<WizardData>, update: (f: keyof WizardData, v: string) => void, showErrors?: boolean }) => (
    <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="space-y-6"
    >
        <div className="text-center mb-8 sm:mb-10">
            <span className="text-secondary font-body text-sm uppercase tracking-widest mb-2 block">Paso 3</span>
            <h3 className="font-display text-3xl md:text-4xl font-bold">Datos de tu empresa y financiamiento</h3>
        </div>

        <div className="space-y-8">
            <div>
                <label className={`block text-lg font-bold mb-3 flex items-center gap-2 ${showErrors && !data.monto ? 'text-red-500' : 'text-foreground'}`}>
                    <CircleDollarSign className={`w-5 h-5 ${showErrors && !data.monto ? 'text-red-500' : 'text-secondary'}`} /> ¿Qué monto requieres actualmente?
                    {showErrors && !data.monto && <span className="text-red-500 text-sm font-normal ml-auto">Requerido</span>}
                </label>
                <div className="relative">
                    <span className={`absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-xl ${showErrors && !data.monto ? 'text-red-500/70' : 'text-muted-foreground'}`}>$</span>
                    <input
                        type="text"
                        placeholder="Ej: 500,000"
                        value={data.monto || ""}
                        onChange={(e) => update("monto", e.target.value)}
                        className={`w-full bg-background border rounded-xl p-4 sm:p-5 pl-10 sm:pl-10 text-xl outline-none transition-all ${showErrors && !data.monto ? 'border-red-500/50 focus:ring-2 focus:ring-red-500/50' : 'border-border/50 focus:ring-2 focus:ring-secondary/50'}`}
                    />
                </div>
            </div>

            <div>
                <label className={`block text-lg font-bold mb-3 flex items-center gap-2 ${showErrors && !data.razonSocial ? 'text-red-500' : 'text-foreground'}`}>
                    <FileText className={`w-5 h-5 ${showErrors && !data.razonSocial ? 'text-red-500' : 'text-secondary'}`} /> Razón social / Nombre comercial
                    {showErrors && !data.razonSocial && <span className="text-red-500 text-sm font-normal ml-auto">Requerido</span>}
                </label>
                <input
                    type="text"
                    placeholder="Nombre de tu inmobiliaria"
                    value={data.razonSocial || ""}
                    onChange={(e) => update("razonSocial", e.target.value)}
                    className={`w-full bg-background border rounded-xl p-4 sm:p-5 text-base sm:text-lg outline-none transition-all ${showErrors && !data.razonSocial ? 'border-red-500/50 focus:ring-2 focus:ring-red-500/50' : 'border-border/50 focus:ring-2 focus:ring-secondary/50'}`}
                />
            </div>
        </div>
    </motion.div>
);

const Resumen = ({ data, onPrivacidadChange, showErrors }: { data: WizardData, onPrivacidadChange: (v: boolean) => void, showErrors?: boolean }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-2"
    >
        <div className="text-left mb-2">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground">Resumen de tu solicitud</h3>
        </div>

        <div className="bg-secondary/5 border border-secondary/10 rounded-2xl p-4 md:p-6 space-y-1">
            {[
                { label: "Proyecto:", value: data.tipoProyecto },
                { label: "Ubicación:", value: data.ubicacion },
                { label: "Fase actual:", value: data.fase },
                { label: "Unidades:", value: data.unidades },
                { label: "Monto:", value: `$${data.monto}`, color: true },
                { label: "Empresa:", value: data.razonSocial }
            ].map((item, idx) => (
                <div key={idx} className="flex justify-between items-center py-1">
                    <span className="text-muted-foreground/80 text-sm sm:text-base">{item.label}</span>
                    <span className={`font-bold text-sm sm:text-base md:text-lg text-right ml-4 ${item.color ? "text-secondary" : "text-foreground"}`}>
                        {item.value || "---"}
                    </span>
                </div>
            ))}
        </div>

        <div className="pt-4">
            <label className="flex items-start gap-4 cursor-pointer group py-3 px-1">
                <div className="relative flex items-center mt-1">
                    <input
                        type="checkbox"
                        checked={data.privacidad}
                        onChange={e => onPrivacidadChange(e.target.checked)}
                        className="sr-only"
                    />
                    <div className={`w-6 h-6 min-w-[24px] border-2 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm ${
                        data.privacidad 
                        ? "bg-secondary border-secondary scale-110" 
                        : showErrors && !data.privacidad
                            ? "border-red-500 bg-red-500/10"
                            : "border-secondary/40 bg-card group-hover:border-secondary group-hover:bg-secondary/5"
                    }`}>
                        {data.privacidad && <Check className="w-4 h-4 text-background stroke-[3]" />}
                    </div>
                </div>
                <span className={`text-sm md:text-base leading-relaxed select-none ${showErrors && !data.privacidad ? 'text-red-500' : 'text-muted-foreground'}`}>
                    Acepto la <a href="/politica-de-privacidad-de-prestaclub.pdf" target="_blank" rel="noopener noreferrer" className="text-secondary font-bold hover:underline decoration-2 underline-offset-4">Política de Privacidad</a> y autorizo el tratamiento de mis datos personales.
                </span>
            </label>
            {showErrors && !data.privacidad && (
                <p className="text-red-500 text-sm font-bold pl-11 mt-1">Debes aceptar la política para continuar.</p>
            )}
        </div>
    </motion.div>
);

const DesarrolloWizard = () => {
    const [step, setStep] = useState(1);
    const [showErrors, setShowErrors] = useState(false);
    const [data, setData] = useState<WizardData>({
        tipoProyecto: "",
        ubicacion: "",
        fase: "",
        unidades: "",
        monto: "",
        razonSocial: "",
        privacidad: false
    });

    const { campaign, getWhatsAppUrl } = useTrafficTracking();

    const updateData = (field: keyof WizardData, value: string | boolean) => {
        setData(prev => ({ ...prev, [field]: value }));
    };

    const nextStep = (customValue?: string) => {
        const val = customValue || data.tipoProyecto;
        if (step === 1 && val === "NO") return; // Stays on step 1 to show disqualification message
        setStep(s => Math.min(s + 1, 4));
    };
    const prevStep = () => setStep(s => Math.max(s - 1, 1));

    const isStepValid = () => {
        if (step === 1) return data.tipoProyecto !== "";
        if (step === 2) return data.ubicacion && data.fase && data.unidades;
        if (step === 3) return data.monto && data.razonSocial;
        if (step === 4) return data.privacidad;
        return false;
    };

    const handleNextStep = () => {
        if (!isStepValid()) {
            setShowErrors(true);
            return;
        }
        setShowErrors(false);
        nextStep();
    };

    const handleFinalSubmit = () => {
        if (!isStepValid()) {
            setShowErrors(true);
            return;
        }
        setShowErrors(false);

        const baseMessage = `Hola PrestaClub, estoy interesado en financiamiento para mi proyecto inmobiliario.
        
*Datos del Proyecto:*
- ¿Es proyecto inmobiliario/mixto?: ${data.tipoProyecto}
- Ubicación: ${data.ubicacion}
- Fase actual: ${data.fase}
- Unidades: ${data.unidades}

*Datos Financieros y Empresa:*
- Empresa/Razón Social: ${data.razonSocial}
- Monto requerido: $${data.monto}

${campaign ? `\nCampaña: ${campaign}` : ""}`;

        const phone = "51924274894";
        const source = (typeof window !== 'undefined' && localStorage.getItem('pc_last_source')) || '';
        const campaignName = campaign || '';

        const sourcePart = [source, campaignName].filter(Boolean).join(' ');
        const prefix = sourcePart ? `[${sourcePart}] - ` : '';

        const finalMessage = `${prefix}${baseMessage}`;
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(finalMessage)}`;

        window.open(url, "_blank");
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            {/* Progress Bar - Reference matching */}
            <div className="mb-6">
                <div className="flex justify-between items-end mb-2">
                    <span className="text-muted-foreground font-body text-sm font-semibold">Paso {step} de 4</span>
                    <span className="text-muted-foreground font-body text-sm font-bold">{step * 25}%</span>
                </div>
                <div className="h-2 w-full bg-border/30 rounded-full overflow-hidden">
                    <motion.div 
                        className="h-full bg-secondary shadow-gold"
                        initial={{ width: 0 }}
                        animate={{ width: `${step * 25}%` }}
                        transition={{ duration: 0.5 }}
                    />
                </div>
            </div>

            <div className="glass-card border-secondary/20 p-5 sm:p-12 relative overflow-hidden min-h-[350px] flex flex-col">
                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full blur-3xl -mr-16 -mt-16" />

                <div>
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <Paso1
                                key="p1"
                                value={data.tipoProyecto}
                                onSelect={(v) => { 
                                    updateData("tipoProyecto", v); 
                                    setShowErrors(false);
                                    if (v === "SI") nextStep("SI"); 
                                }}
                            />
                        )}
                        {step === 2 && (
                            <Paso2
                                key="p2"
                                data={data}
                                update={updateData}
                                showErrors={showErrors}
                            />
                        )}
                        {step === 3 && (
                            <Paso3
                                key="p3"
                                data={data}
                                update={updateData}
                                showErrors={showErrors}
                            />
                        )}
                        {step === 4 && (
                            <Resumen
                                key="p4"
                                data={data}
                                onPrivacidadChange={(v) => {
                                    updateData("privacidad", v);
                                    if (v) setShowErrors(false);
                                }}
                                showErrors={showErrors}
                            />
                        )}
                    </AnimatePresence>
                </div>

                {/* Footer Navigation - Image Matching */}
                <div className="mt-6 pt-6 border-t border-border/20 flex flex-row items-center justify-between gap-2 sm:gap-4 w-full">
                    {step > 1 ? (
                        <button
                            onClick={prevStep}
                            className="h-12 flex-1 sm:flex-none sm:px-6 rounded-xl border border-border/50 hover:bg-muted font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-1 sm:gap-2"
                        >
                            <ArrowLeft className="w-4 h-4" /> ANTERIOR
                        </button>
                    ) : (
                        <div className="hidden sm:block" />
                    )}

                    {step < 4 ? (
                        step !== 1 && (
                            <Button
                                variant="gold"
                                onClick={handleNextStep}
                                className="h-12 flex-1 sm:flex-none sm:px-10 text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center"
                            >
                                Continuar
                                <ChevronRight className="w-4 h-4 ml-1 sm:ml-2" />
                            </Button>
                        )
                    ) : (
                        <Button
                            variant="gold"
                            onClick={handleFinalSubmit}
                            className="h-12 sm:h-14 flex-1 sm:flex-none sm:px-10 text-xs sm:text-sm font-bold uppercase tracking-widest shadow-lg shadow-gold/20 flex items-center justify-center"
                        >
                            <span className="hidden sm:inline">Enviar por WhatsApp</span>
                            <span className="sm:hidden">Enviar</span>
                            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1 sm:ml-2" />
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DesarrolloWizard;
