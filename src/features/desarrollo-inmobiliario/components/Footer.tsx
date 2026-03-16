"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import logoFooter from "@/assets/logo-footer.svg";
import { useDesarrolloWhatsApp } from "../hooks/useDesarrolloWhatsApp";

const Footer = () => {
    const whatsappUrl = useDesarrolloWhatsApp();
    const router = useRouter();
    const pathname = usePathname();

    const handleNavClick = (id: string) => {
        if (pathname === '/desarrollo-inmobiliario') {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            router.push('/desarrollo-inmobiliario');
            setTimeout(() => {
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }
    };

    return (
        <footer className="py-12 border-t border-border bg-navy-dark">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <Link href="/" className="inline-block mb-4">
                            <img src={logoFooter.src} alt="Prestaclub" className="h-12 w-auto" />
                        </Link>
                        <p className="text-muted-foreground font-body text-sm max-w-md">
                            Financiamiento Puente Estructurado para desarrollo inmobiliario.
                            Capital con garantía hipotecaria, otorgado por fondos de inversión.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-display font-semibold mb-4">Navegación</h4>
                        <ul className="space-y-2">
                            <li>
                                <button
                                    onClick={() => handleNavClick('inicio')}
                                    className="text-muted-foreground font-body text-sm hover:text-secondary transition-colors"
                                >
                                    Inicio
                                </button>
                            </li>

                            <li>
                                <button
                                    onClick={() => handleNavClick('proceso')}
                                    className="text-muted-foreground font-body text-sm hover:text-secondary transition-colors"
                                >
                                    Proceso
                                </button>
                            </li>
                            <li>
                                <a
                                    href={whatsappUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted-foreground font-body text-sm hover:text-secondary transition-colors"
                                >
                                    Contacto
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="font-display font-semibold mb-4">Legal</h4>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="https://prestaclub.com/politica-de-privacidad/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted-foreground font-body text-sm hover:text-secondary transition-colors"
                                >
                                    Política de privacidad
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-muted-foreground font-body text-sm">
                        © {new Date().getFullYear()} Prestaclub. Todos los derechos reservados.
                    </p>
                    <p className="text-muted-foreground font-body text-xs">
                        Condiciones sujetas a evaluación. Capital otorgado por fondos de inversión.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
