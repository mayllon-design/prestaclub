"use client";

import { useState, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, MessageCircle, Shield, Eye, FileText, Car, AlertTriangle, Lock } from "lucide-react";

// ─── SCORING DATA ───
const BRANDS: Record<string, number> = {
    "Toyota": 5, "Hyundai": 5, "Kia": 5, "Nissan": 4, "Chevrolet": 4,
    "Suzuki": 4, "Mitsubishi": 4, "Honda": 4, "Ford": 3, "Mazda": 3,
    "Volkswagen": 3, "Subaru": 3, "Renault": 3, "Changan": 2, "JAC": 2,
    "MG": 2, "Great Wall": 2, "Chery": 2, "BYD": 2, "Geely": 2,
    "Haval": 2, "BAIC": 1, "Dongfeng": 1, "Foton": 1, "Lifan": 1,
    "Zotye": 1, "Brilliance": 1,
};

const getYearScore = (year: number): number => {
    const currentYear = new Date().getFullYear();
    const age = currentYear - year;
    if (age <= 2) return 5;
    if (age <= 4) return 4;
    if (age <= 6) return 3;
    if (age <= 8) return 2;
    if (age <= 10) return 1;
    return 0;
};

const getKmScore = (km: number): number => {
    if (km <= 20000) return 5;
    if (km <= 40000) return 4;
    if (km <= 60000) return 3;
    if (km <= 80000) return 2;
    if (km <= 100000) return 1;
    return 0;
};

const FUEL_SCORES: Record<string, number> = {
    "Gasolina": 5, "Diésel": 4, "GLP (Gas)": 3, "Híbrido": 4, "Eléctrico": 3,
};

// ─── PROGRESS BAR ───
const progressLabels = ["Datos del vehículo", "Condiciones técnicas", "Valor y simulación", "Confirmación"];

const getProgressIndex = (step: number): number => {
    if (step <= 1) return 0;
    if (step <= 3) return 1;
    if (step === 4) return 2;
    return 3;
};

interface ProgressBarProps { currentStep: number; }

const ProgressBar = ({ currentStep }: ProgressBarProps) => {
    const activeIndex = getProgressIndex(currentStep);
    return (
        <div className="flex items-center justify-between mb-10 px-2">
            {progressLabels.map((label, i) => (
                <div key={label} className="flex items-center flex-1 last:flex-none">
                    <div className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${i < activeIndex ? "wizard-step-completed" : i === activeIndex ? "wizard-step-active" : "wizard-step-pending"
                            }`}>
                            {i < activeIndex ? <Check size={18} /> : i + 1}
                        </div>
                        <span className="text-xs mt-2 text-center max-w-[80px] text-muted-foreground font-medium hidden sm:block">{label}</span>
                    </div>
                    {i < progressLabels.length - 1 && (
                        <div className={`flex-1 h-1 mx-2 rounded transition-all duration-300 ${i < activeIndex ? "bg-accent" : "bg-muted"
                            }`} />
                    )}
                </div>
            ))}
        </div>
    );
};

// ─── WIZARD COMPONENT ───
interface CreditWizardProps { }

const CreditWizard = forwardRef<HTMLDivElement, CreditWizardProps>((_, ref) => {
    const [step, setStep] = useState(0);
    const [brand, setBrand] = useState("");
    const [customBrand, setCustomBrand] = useState("");
    const [year, setYear] = useState("");
    const [km, setKm] = useState("");
    const [fuel, setFuel] = useState("");
    const [value, setValue] = useState("");
    const [custody, setCustody] = useState<boolean | null>(null);
    const [showCustodyInfo, setShowCustodyInfo] = useState(false);
    const [showOtherBrand, setShowOtherBrand] = useState(false);
    const [preApproved, setPreApproved] = useState(0);

    // Final form
    const [nombre, setNombre] = useState("");
    const [celular, setCelular] = useState("");
    const [correo, setCorreo] = useState("");
    const [placa, setPlaca] = useState("");

    const currentYear = new Date().getFullYear();

    const calculateLoan = () => {
        const brandScore = BRANDS[brand] || 0;
        const yearScore = getYearScore(parseInt(year));
        const kmScore = getKmScore(parseInt(km));
        const fuelScore = FUEL_SCORES[fuel] || 0;
        const totalScore = brandScore + yearScore + kmScore + fuelScore;
        const pj = totalScore / 20;
        const amount = Math.round(parseFloat(value) * pj * 0.50);
        setPreApproved(amount);
    };

    const handleBrandSelect = (selectedBrand: string) => {
        if (selectedBrand === "Otras marcas") {
            setShowOtherBrand(true);
        } else {
            setBrand(selectedBrand);
            setShowOtherBrand(false);
            setStep(1);
        }
    };

    const handleYearNext = () => {
        const y = parseInt(year);
        if (currentYear - y > 10) {
            // Too old - show redirect
            return;
        }
        setStep(2);
    };

    const handleValueNext = () => {
        const v = parseFloat(value);
        if (v < 10000) return;
        calculateLoan();
        setStep(5);
    };

    const handleCustodyYes = () => {
        setCustody(true);
        setStep(6);
    };

    const handleCustodyNo = () => {
        if (!showCustodyInfo) {
            setShowCustodyInfo(true);
        } else {
            // User insists NO → redirect
            window.open("https://wa.me/51921010200?text=Hola%2C%20quiero%20conocer%20otras%20opciones%20de%20crédito", "_blank");
        }
    };

    const handleFinalSubmit = () => {
        const message = `Hola PrestaClub, quiero continuar con la evaluación para mi crédito con garantía vehicular.

*Datos del Cliente:*
Nombre: ${nombre}
Celular: ${celular}
Correo: ${correo}
Placa: ${placa}

*Datos del Vehículo:*
Marca: ${brand}
Año: ${year}
Kilometraje: ${km} km
Combustible: ${fuel}
Valor estimado: S/ ${parseFloat(value).toLocaleString()}
Monto preaprobado: S/ ${preApproved.toLocaleString()}

Quedo atento a su respuesta.`;

        const whatsappUrl = `https://wa.me/51921010200?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, "_blank");
    };

    const yearTooOld = year && (currentYear - parseInt(year)) > 10;

    const stepVariants = {
        initial: { opacity: 0, x: 40 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -40 },
    };

    return (
        <section ref={ref} className="section-padding bg-background" id="simulador">
            <div className="container mx-auto max-w-2xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground text-center mb-2">
                        Simula tu crédito
                    </h2>
                    <p className="text-muted-foreground text-center mb-8">
                        Completa los datos de tu vehículo y obtén una preaprobación en minutos.
                    </p>
                </motion.div>

                <div className="glass-card p-6 sm:p-10">
                    {step < 6 && <ProgressBar currentStep={step} />}

                    <AnimatePresence mode="wait">
                        {/* STEP 0 - BRAND */}
                        {step === 0 && !showOtherBrand && (
                            <motion.div key="step0" {...stepVariants} transition={{ duration: 0.3 }}>
                                <h3 className="font-heading text-xl font-bold text-foreground mb-6">¿Cuál es la marca de tu vehículo?</h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[400px] overflow-y-auto pr-2">
                                    {[...Object.keys(BRANDS), "Otras marcas"].map((b) => (
                                        <button
                                            key={b}
                                            onClick={() => handleBrandSelect(b)}
                                            className={`p-3 rounded-xl border text-sm font-medium transition-all duration-200 hover:border-primary hover:bg-primary/5 ${b === "Otras marcas" ? "col-span-2 sm:col-span-3 border-dashed border-muted-foreground/40 text-muted-foreground" : "border-border text-foreground"
                                                }`}
                                        >
                                            {b}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* OTHER BRAND SCREEN */}
                        {step === 0 && showOtherBrand && (
                            <motion.div key="otherBrand" {...stepVariants} transition={{ duration: 0.3 }} className="text-center py-8">
                                <Car className="w-16 h-16 text-primary mx-auto mb-4" />
                                <h3 className="font-heading text-xl font-bold text-foreground mb-3">
                                    Tu vehículo será evaluado de manera personalizada por un asesor.
                                </h3>
                                <p className="text-muted-foreground mb-6">
                                    Actualmente no vemos tu marca en nuestro listado principal, pero podemos revisar tu caso.
                                </p>
                                <input
                                    type="text"
                                    placeholder="Escribe la marca de tu vehículo"
                                    value={customBrand}
                                    onChange={(e) => setCustomBrand(e.target.value)}
                                    className="w-full max-w-sm mx-auto block p-3 rounded-xl border border-border bg-background text-foreground mb-4"
                                />
                                <a
                                    href={`https://wa.me/51921010200?text=${encodeURIComponent(`Hola, vengo del simulador web. Mi marca no aparece en el listado. Mi vehículo es: ${customBrand}`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-whatsapp inline-flex items-center gap-2"
                                >
                                    <MessageCircle size={20} />
                                    Hablar por WhatsApp
                                </a>
                                <button onClick={() => setShowOtherBrand(false)} className="block mx-auto mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors">
                                    ← Volver a marcas
                                </button>
                            </motion.div>
                        )}

                        {/* STEP 1 - YEAR */}
                        {step === 1 && (
                            <motion.div key="step1" {...stepVariants} transition={{ duration: 0.3 }}>
                                <h3 className="font-heading text-xl font-bold text-foreground mb-2">¿Cuál es el año de tu {brand}?</h3>
                                <p className="text-muted-foreground text-sm mb-6">Máximo 10 años de antigüedad.</p>
                                <input
                                    type="number"
                                    min={currentYear - 15}
                                    max={currentYear}
                                    placeholder={`Ej: ${currentYear - 3}`}
                                    value={year}
                                    onChange={(e) => setYear(e.target.value)}
                                    className="w-full p-4 rounded-xl border border-border bg-background text-foreground text-lg mb-4"
                                />
                                {yearTooOld && (
                                    <div className="bg-accent/10 border border-accent/30 rounded-xl p-4 mb-4">
                                        <div className="flex items-start gap-3">
                                            <AlertTriangle className="w-5 h-5 text-accent mt-0.5" />
                                            <div>
                                                <p className="font-semibold text-foreground">Tu vehículo supera los 10 años de antigüedad.</p>
                                                <p className="text-muted-foreground text-sm mt-1">
                                                    Actualmente no califica para este producto, pero podemos evaluar otras opciones.
                                                </p>
                                                <a
                                                    href="https://wa.me/51921010200?text=Hola%2C%20mi%20vehículo%20tiene%20más%20de%2010%20años.%20¿Tienen%20otras%20opciones?"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="btn-whatsapp inline-flex items-center gap-2 mt-3 !py-2 !px-4 !text-sm"
                                                >
                                                    <MessageCircle size={16} />
                                                    Ver otras opciones
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className="flex gap-3">
                                    <button onClick={() => setStep(0)} className="btn-secondary-cta !py-3 !px-6 !text-sm">Atrás</button>
                                    <button onClick={handleYearNext} disabled={!year || !!yearTooOld} className="btn-cta flex-1 !py-3 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                                        Continuar <ChevronRight size={18} />
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* STEP 2 - KILOMETERS */}
                        {step === 2 && (
                            <motion.div key="step2" {...stepVariants} transition={{ duration: 0.3 }}>
                                <h3 className="font-heading text-xl font-bold text-foreground mb-2">¿Cuántos kilómetros tiene tu vehículo?</h3>
                                <p className="text-muted-foreground text-sm mb-6">Ingresa el kilometraje aproximado.</p>
                                <input
                                    type="number"
                                    min={0}
                                    placeholder="Ej: 45000"
                                    value={km}
                                    onChange={(e) => setKm(e.target.value)}
                                    className="w-full p-4 rounded-xl border border-border bg-background text-foreground text-lg mb-2"
                                />
                                {km && parseInt(km) > 100000 && (
                                    <p className="text-accent text-sm mb-3 flex items-center gap-1">
                                        <AlertTriangle size={14} /> Será sujeto a evaluación especial.
                                    </p>
                                )}
                                <div className="flex gap-3 mt-4">
                                    <button onClick={() => setStep(1)} className="btn-secondary-cta !py-3 !px-6 !text-sm">Atrás</button>
                                    <button onClick={() => { if (km) setStep(3); }} disabled={!km} className="btn-cta flex-1 !py-3 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                                        Continuar <ChevronRight size={18} />
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* STEP 3 - FUEL */}
                        {step === 3 && (
                            <motion.div key="step3" {...stepVariants} transition={{ duration: 0.3 }}>
                                <h3 className="font-heading text-xl font-bold text-foreground mb-6">¿Qué tipo de combustible usa?</h3>
                                <div className="grid grid-cols-1 gap-3">
                                    {Object.keys(FUEL_SCORES).map((f) => (
                                        <button
                                            key={f}
                                            onClick={() => { setFuel(f); setStep(4); }}
                                            className={`p-4 rounded-xl border text-left font-medium transition-all duration-200 hover:border-primary hover:bg-primary/5 ${fuel === f ? "border-primary bg-primary/5" : "border-border"
                                                }`}
                                        >
                                            {f}
                                        </button>
                                    ))}
                                </div>
                                <button onClick={() => setStep(2)} className="btn-secondary-cta !py-3 !px-6 !text-sm mt-4">Atrás</button>
                            </motion.div>
                        )}

                        {/* STEP 4 - VALUE */}
                        {step === 4 && (
                            <motion.div key="step4" {...stepVariants} transition={{ duration: 0.3 }}>
                                <h3 className="font-heading text-xl font-bold text-foreground mb-2">¿Cuál es el valor estimado de tu vehículo?</h3>
                                <p className="text-muted-foreground text-sm mb-6">Mínimo S/ 10,000</p>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold text-lg">S/</span>
                                    <input
                                        type="number"
                                        min={10000}
                                        placeholder="Ej: 45000"
                                        value={value}
                                        onChange={(e) => setValue(e.target.value)}
                                        className="w-full p-4 pl-12 rounded-xl border border-border bg-background text-foreground text-lg"
                                    />
                                </div>
                                {value && parseFloat(value) < 10000 && (
                                    <p className="text-destructive text-sm mt-2">El valor mínimo es S/ 10,000.</p>
                                )}
                                <div className="flex gap-3 mt-6">
                                    <button onClick={() => setStep(3)} className="btn-secondary-cta !py-3 !px-6 !text-sm">Atrás</button>
                                    <button onClick={handleValueNext} disabled={!value || parseFloat(value) < 10000} className="btn-cta flex-1 !py-3 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                                        Ver mi preaprobación <ChevronRight size={18} />
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* STEP 5 - CUSTODY */}
                        {step === 5 && (
                            <motion.div key="step5" {...stepVariants} transition={{ duration: 0.3 }}>
                                <div className="text-center mb-6">
                                    <div className="w-20 h-20 rounded-full bg-celeste flex items-center justify-center mx-auto mb-4">
                                        <span className="text-3xl font-heading font-bold text-primary">🎉</span>
                                    </div>
                                    <h3 className="font-heading text-2xl font-bold text-foreground mb-1">
                                        ¡Felicidades! Tienes un crédito preaprobado por:
                                    </h3>
                                    <p className="text-4xl font-heading font-bold text-primary mt-4">
                                        Hasta S/ {preApproved.toLocaleString()}
                                    </p>
                                    <p className="text-muted-foreground mt-2">Plazos disponibles desde 30 hasta 180 días.</p>
                                </div>

                                <div className="border-t border-border pt-6 mt-6">
                                    <h4 className="font-heading font-bold text-foreground mb-4">
                                        ¿Puedes dejar el vehículo en custodia segura hasta cancelar el crédito?
                                    </h4>

                                    {showCustodyInfo && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            className="bg-celeste rounded-xl p-5 mb-6"
                                        >
                                            <p className="font-semibold text-foreground mb-3">Tu vehículo será custodiado en nuestras instalaciones:</p>
                                            <ul className="space-y-2 text-sm text-foreground/80">
                                                <li className="flex items-center gap-2"><Lock size={16} className="text-primary" />Espacio cerrado y seguro</li>
                                                <li className="flex items-center gap-2"><Eye size={16} className="text-primary" />Vigilancia permanente</li>
                                                <li className="flex items-center gap-2"><FileText size={16} className="text-primary" />Control periódico documentado</li>
                                                <li className="flex items-center gap-2"><Shield size={16} className="text-primary" />Cubierto por póliza de seguros</li>
                                                <li className="flex items-center gap-2"><FileText size={16} className="text-primary" />Acta formal de entrega y devolución</li>
                                                <li className="flex items-center gap-2"><FileText size={16} className="text-primary" />Registro en SUNARP</li>
                                            </ul>
                                            <p className="text-sm text-muted-foreground mt-4">
                                                La custodia es parte esencial del respaldo del crédito y permite ofrecer mejores condiciones.
                                            </p>
                                        </motion.div>
                                    )}

                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <button onClick={handleCustodyYes} className="btn-cta flex-1 !py-3">
                                            {showCustodyInfo ? "Entiendo y deseo continuar" : "Sí, puedo dejarlo"}
                                        </button>
                                        <button onClick={handleCustodyNo} className="btn-secondary-cta flex-1 !py-3 !text-sm">
                                            {showCustodyInfo ? "Prefiero conocer otras opciones" : "No, prefiero no dejarlo"}
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* STEP 6 - FINAL FORM */}
                        {step === 6 && (
                            <motion.div key="step6" {...stepVariants} transition={{ duration: 0.3 }}>
                                <div className="text-center mb-8 bg-celeste rounded-2xl p-8">
                                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                                        <Check className="w-10 h-10 text-primary" />
                                    </div>
                                    <h3 className="font-heading text-2xl font-bold text-foreground">
                                        ¡Felicidades! Tienes un crédito preaprobado por:
                                    </h3>
                                    <p className="text-4xl font-heading font-bold text-primary mt-3">
                                        Hasta S/ {preApproved.toLocaleString()}
                                    </p>
                                    <p className="text-muted-foreground mt-2 text-sm">Plazos disponibles desde 30 hasta 180 días.</p>
                                </div>

                                <div className="space-y-4">
                                    <input
                                        type="text"
                                        placeholder="Nombre completo"
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                        className="w-full p-4 rounded-xl border border-border bg-background text-foreground"
                                    />
                                    <input
                                        type="tel"
                                        placeholder="Celular"
                                        value={celular}
                                        onChange={(e) => setCelular(e.target.value)}
                                        className="w-full p-4 rounded-xl border border-border bg-background text-foreground"
                                    />
                                    <input
                                        type="email"
                                        placeholder="Correo electrónico"
                                        value={correo}
                                        onChange={(e) => setCorreo(e.target.value)}
                                        className="w-full p-4 rounded-xl border border-border bg-background text-foreground"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Placa del vehículo"
                                        value={placa}
                                        onChange={(e) => setPlaca(e.target.value.toUpperCase())}
                                        className="w-full p-4 rounded-xl border border-border bg-background text-foreground uppercase"
                                    />
                                    <button
                                        onClick={handleFinalSubmit}
                                        disabled={!nombre || !celular || !correo || !placa}
                                        id="btn-vehicular"
                                        className="btn-cta w-full !py-4 disabled:opacity-40 disabled:cursor-not-allowed"
                                    >
                                        Quiero continuar con la evaluación
                                        <script type="text/javascript">
                                            document.getElementById('btn-vehicular').addEventListener('click', function() {



                                            }, false);
                                        </script>
                                    </button>
                                </div>

                                <p className="text-xs text-muted-foreground text-center mt-4">
                                    Sujeto a evaluación mecánica, estética y documentaria del vehículo.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
});

CreditWizard.displayName = "CreditWizard";

export default CreditWizard;
