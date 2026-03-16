"use client";

import { motion } from "framer-motion";
import { Building2 } from "lucide-react";
import Link from "next/link";

import { Button } from "@/shared/components/ui/button";

import logo from "@/assets/logopresta.png";
import { useDesarrolloWhatsApp } from "../hooks/useDesarrolloWhatsApp";

const styles = {
    logoImg: {
        height: '40px', // Ajusta el tamaño que desees
        width: 'auto'
    }
};


const Navbar = () => {
    const whatsappUrl = useDesarrolloWhatsApp();
    const handleNavClick = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-100"
        >
            <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <img src={logo.src} alt="Logo Desarrollo Inmobiliario" style={styles.logoImg} />
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    <button
                        onClick={() => handleNavClick('inicio')}
                        className="font-body text-sm text-black hover:text-primary transition-colors"
                    >
                        Inicio
                    </button>

                    <button
                        onClick={() => handleNavClick('proceso')}
                        className="font-body text-sm text-black hover:text-primary transition-colors"
                    >
                        Proceso
                    </button>
                    <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-body text-sm text-black hover:text-primary transition-colors"
                    >
                        Contacto
                    </a>
                </div>

                {/* CTA */}
                <Button variant="gold" size="sm" asChild>
                    <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Solicitar EVALUACIÓN
                    </a>
                </Button>
            </div>
        </motion.nav>
    );
};

export default Navbar;
