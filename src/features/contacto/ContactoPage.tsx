"use client";

import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { Mail, Phone, MapPin, Send, MessageCircle, Clock } from "lucide-react";
import Layout from "@/core/layouts/MainLayout";
import { useTrafficTracking } from "@/shared/hooks/useTrafficTracking";

const ContactoPage = () => {
    const { getWhatsAppUrl, whatsappNumber, clearTracking } = useTrafficTracking();
    const [form, setForm] = useState({
        nombre: "",
        correo: "",
        celular: "",
        mensaje: ""
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Lógica de envío o redirección a WhatsApp
        const text = `Consulta Web:\nNombre: ${form.nombre}\nCorreo: ${form.correo}\nMensaje: ${form.mensaje}`;
        window.open(getWhatsAppUrl(text), "_blank");
        clearTracking();
    };

    return (
        <Layout>
            <section className="section-padding bg-background">
                <div className="container mx-auto">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-16">
                            {/* Info Side */}
                            <div>
                                <h1 className="text-4xl font-extrabold text-foreground mb-6">Contáctanos</h1>
                                <p className="text-lg text-muted-foreground font-body mb-12">
                                    Estamos aquí para resolver tus dudas. Déjanos un mensaje y uno de nuestros asesores expertos se pondrá en contacto contigo en breve.
                                </p>

                                <div className="space-y-8">
                                    <div className="flex items-start gap-4">
                                        <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                                            <Phone className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <div className="font-bold text-lg">Teléfono</div>
                                            <p className="text-muted-foreground">(01) 420-8470</p>
                                            <a href={getWhatsAppUrl()} onClick={clearTracking} className="text-primary font-semibold hover:underline flex items-center gap-1 mt-1">
                                                <MessageCircle className="h-4 w-4" /> WhatsApp: {whatsappNumber === '51921010200' ? '921 010 200' : '919 000 200'}
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                                            <Mail className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <div className="font-bold text-lg">Correo Electrónico</div>
                                            <p className="text-muted-foreground">informes@prestaclub.com</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                                            <MapPin className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <div className="font-bold text-lg">Oficina Principal</div>
                                            <p className="text-muted-foreground">
                                                Av. Canaval y Moreyra 340, Piso 12<br />
                                                San Isidro, Lima - Perú
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                                            <Clock className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <div className="font-bold text-lg">Horario de Atención</div>
                                            <p className="text-muted-foreground">Lunes a Viernes: 9:00 AM - 6:00 PM</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Form Side */}
                            <div className="card-elevated p-8 md:p-12">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold mb-2">Nombre Completo</label>
                                            <input
                                                required
                                                type="text"
                                                className="w-full h-12 px-4 rounded-xl border border-input bg-background"
                                                placeholder="Ej: Juan Pérez"
                                                value={form.nombre}
                                                onChange={e => setForm({ ...form, nombre: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold mb-2">Número Celular</label>
                                            <input
                                                required
                                                type="tel"
                                                className="w-full h-12 px-4 rounded-xl border border-input bg-background"
                                                placeholder="999 999 999"
                                                value={form.celular}
                                                onChange={e => setForm({ ...form, celular: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold mb-2">Correo Electrónico</label>
                                        <input
                                            required
                                            type="email"
                                            className="w-full h-12 px-4 rounded-xl border border-input bg-background"
                                            placeholder="juan@ejemplo.com"
                                            value={form.correo}
                                            onChange={e => setForm({ ...form, correo: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold mb-2">Mensaje</label>
                                        <textarea
                                            required
                                            rows={4}
                                            className="w-full p-4 rounded-xl border border-input bg-background resize-none"
                                            placeholder="¿En qué podemos ayudarte?"
                                            value={form.mensaje}
                                            onChange={e => setForm({ ...form, mensaje: e.target.value })}
                                        ></textarea>
                                    </div>
                                    <Button variant="gold" className="w-full py-7 text-lg font-bold" type="submit">
                                        ENVIAR MENSAJE <Send className="ml-2 h-5 w-5" />
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="h-[400px] w-full bg-muted overflow-hidden">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m12!1m3!1d1!2d-77.0267!3d-12.0944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c8667b938f3d%3A0xc39281a1a1a1a1a1!2sPrestaClub!5e0!3m2!1ses!2spe!4v1"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                ></iframe>
            </section>
        </Layout>
    );
};

export default ContactoPage;
