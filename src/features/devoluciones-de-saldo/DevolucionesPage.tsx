"use client";

import Layout from "@/core/layouts/MainLayout";
import { useEffect } from "react";

const DevolucionesPage = () => {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://cdn.bitrix24.es/b32110929/crm/form/loader_63.js?" + Math.floor(Date.now() / 180000);
        script.async = true;
        script.setAttribute("data-b24-form", "inline/63/s1aqc5");
        script.setAttribute("data-skip-moving", "true");

        const container = document.getElementById("bitrix-form-container");
        if (container) {
            container.appendChild(script);
        }

        return () => {
            // Cleanup in case the component unmounts
            if (container && container.contains(script)) {
                container.removeChild(script);
            }
            // Bitrix often injects additional iframes/divs, but we'll leave it simple for now
        };
    }, []);

    return (
        <Layout>
            <section className="hero-gradient pt-32 pb-16">
                <div className="container mx-auto max-w-4xl text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-primary-foreground leading-tight">
                        <span className="text-gradient-gold">Gestión de devoluciones de saldo</span>
                    </h1>
                </div>
            </section>

            <section className="section-padding bg-background min-h-[600px] flex items-center justify-center">
                <div className="container mx-auto max-w-4xl w-full">
                    <div id="bitrix-form-container" className="w-full flex justify-center"></div>
                </div>
            </section>
        </Layout>
    );
};

export default DevolucionesPage;
