"use client";

import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { MapPin, X, ArrowRight, Ban } from "lucide-react";
import Link from "next/link";

interface LocationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export const LocationModal = ({ isOpen, onClose, onConfirm }: LocationModalProps) => {
    const [showError, setShowError] = useState(false);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div
                className="bg-background w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <div className="h-10 w-10 rounded-full bg-gold/10 flex items-center justify-center">
                            <MapPin className="h-5 w-5 text-gold" />
                        </div>
                        <button
                            onClick={onClose}
                            className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-muted transition-colors"
                        >
                            <X className="h-4 w-4 text-muted-foreground" />
                        </button>
                    </div>

                    {!showError ? (
                        <div className="space-y-6">
                            <div className="text-center sm:text-left">
                                <h3 className="text-2xl font-bold text-foreground">¿Dónde se ubica tu propiedad?</h3>
                                <p className="text-muted-foreground mt-2 font-body">
                                    Para brindarte la mejor asesoría, necesitamos confirmar la ubicación de tu inmueble.
                                </p>
                            </div>

                            <div className="grid gap-3 pt-2">
                                <button
                                    onClick={() => {
                                        onConfirm();
                                        onClose();
                                    }}
                                    className="flex items-center justify-between p-4 rounded-2xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all text-left group"
                                >
                                    <div>
                                        <span className="block font-bold text-foreground">Lima o Callao</span>
                                        <span className="text-xs text-muted-foreground">Válido para toda Lima Metropolitana y Callao</span>
                                    </div>
                                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                </button>

                                <button
                                    onClick={() => setShowError(true)}
                                    className="flex items-center justify-between p-4 rounded-2xl border-2 border-border hover:border-red-500/50 hover:bg-red-500/5 transition-all text-left group"
                                >
                                    <div>
                                        <span className="block font-bold text-foreground">Provincia / Otro</span>
                                        <span className="text-xs text-muted-foreground">Fuera de Lima y Callao</span>
                                    </div>
                                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-red-500 transition-colors" />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-4 space-y-6">
                            <div className="h-16 w-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Ban className="h-8 w-8 text-red-600" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-foreground">🚫 Lo sentimos</h3>
                                <p className="text-muted-foreground mt-3 font-body leading-relaxed">
                                    Por el momento solo válido para inmuebles ubicados en <strong>Lima Metropolitana y Callao</strong>.
                                </p>
                            </div>
                            <div className="pt-4">
                                <Button variant="outline" className="w-full rounded-xl" asChild>
                                    <Link href="/nosotros" onClick={onClose}>Conoce más aquí</Link>
                                </Button>
                                <button
                                    onClick={() => setShowError(false)}
                                    className="mt-4 text-sm text-muted-foreground hover:text-primary underline"
                                >
                                    Volver a intentar
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
