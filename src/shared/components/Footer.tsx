"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import logoPresta from "@/assets/logopresta.png";
import { useTrafficTracking } from "@/shared/hooks/useTrafficTracking";

const Footer = () => {
  const { whatsappUrl, whatsappNumber, clearTracking } = useTrafficTracking();
  return (
    <footer className="hero-gradient text-primary-foreground">
      <div className="container mx-auto px-4 py-16 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="mb-6">
              <Image
                src={logoPresta}
                alt="PrestaClub Logo"
                className="h-10 w-auto object-contain brightness-0 invert"
              />
            </div>
            <p className="text-sm text-primary-foreground/70 leading-relaxed mb-4">
              Fintech especialista en prestamos. Conectamos personas y empresas que necesitan financiamiento con inversionistas institucionales. Inscritos en la SBS en el Registro de Empresas de Préstamo.
            </p>
            <div className="flex gap-3">
              <a href="https://www.linkedin.com/company/prestaclubsac/" target="_blank" rel="noopener noreferrer" className="h-9 w-9 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors" aria-label="LinkedIn">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              </a>
              <a href="https://www.youtube.com/@PrestaclubPeru" target="_blank" rel="noopener noreferrer" className="h-9 w-9 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors" aria-label="YouTube">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
              </a>
              <a href="https://www.facebook.com/prestaclubperu/" target="_blank" rel="noopener noreferrer" className="h-9 w-9 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors" aria-label="Facebook">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
              </a>
              <a href="https://www.instagram.com/Prestaclub" target="_blank" rel="noopener noreferrer" className="h-9 w-9 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors" aria-label="Instagram">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.805.249 2.227.412.56.217.96.477 1.38.897.42.42.68.82.897 1.38.163.422.358 1.057.412 2.227.059 1.266.07 1.646.07 4.85s-.011 3.584-.07 4.85c-.054 1.17-.249 1.805-.412 2.227-.217.56-.477.96-.897 1.38-.42.42-.82.68-1.38.897-.422.163-1.057.358-2.227.412-1.266.059-1.646.07-4.85.07s-3.584-.011-4.85-.07c-1.17-.054-1.805-.249-2.227-.412-.56-.217-.96-.477-1.38-.897-.42-.42-.68-.82-.897-1.38-.163-.422-.358-1.057-.412-2.227-.059-1.266-.07-1.646-.07-4.85s.011-3.584.07-4.85c.054-1.17.054-1.17.249-1.805.412-2.227.217-.56.477-.96.897-1.38.42-.42.82-.68 1.38-.897.422-.163 1.057-.358 2.227-.412 1.266-.059 1.646-.07 4.85-.07zM12 0C8.741 0 8.333.014 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S1.335 3.35 1.03 4.14c-.297.765-.498 1.635-.558 2.913C.414 8.333.4 8.741.4 12c0 3.259.014 3.668.072 4.948.06 1.279.261 2.148.558 2.913.306.789.717 1.459 1.384 2.126s1.337 1.079 2.126 1.384c.766.297 1.635.498 2.913.558 1.28.06 1.688.072 4.948.072s3.668-.014 4.948-.072c1.279-.06 2.148-.261 2.913-.558.789-.306 1.459-.717 2.126-1.384s1.079-1.337 1.384-2.126c.297-.766.498-1.635.558-2.913.06-1.28.072-1.688.072-4.948s-.014-3.668-.072-4.948c-.06-1.279-.261-2.148-.558-2.913-.306-.789-.717-1.459-1.384-2.126s-1.337-1.079-2.126-1.384c-.766-.297-1.635-.498-2.913-.558C15.667.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4.162 4.162 0 1 1 0-8.324 4.162 4.162 0 0 1 0 8.324zM18.406 3.927a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" /></svg>
              </a>
              <a href="https://www.tiktok.com/@prestaclub" target="_blank" rel="noopener noreferrer" className="h-9 w-9 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors" aria-label="TikTok">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.13-1.47-.76-.54-1.43-1.14-2.01-1.89-.06 3.87.03 7.74-.02 11.61-.15 2.15-.84 4.33-2.33 5.96-1.46 1.63-3.6 2.62-5.77 2.8-2.65.2-5.41-.45-7.53-2.22C-.63 21.01-1.34 16.48 1.12 13.06c1.11-1.57 2.88-2.61 4.77-2.91 1.05-.12 2.11-.07 3.14.21v4.26c-.72-.25-1.5-.32-2.25-.19-1.2.14-2.35.85-2.97 1.91-.65 1.14-.64 2.62-.03 3.73.54 1.05 1.57 1.83 2.75 2.05 1.05.18 2.3-.01 3.1-.79.79-.81 1-2.02.99-3.11.03-5.78.02-11.56.03-17.34z" /></svg>
              </a>
            </div>
          </div>

          {/* Productos */}
          <div>
            <h4 className="font-bold text-base mb-4">Productos</h4>
            <div className="flex flex-col gap-2">
              <Link href="/financiamiento-con-garantia-hipotecaria" className="text-sm text-primary-foreground/70 hover:text-gold transition-colors">Financiamiento con Garantía Hipotecaria</Link>
              <Link href="/prestamo-con-garantia-vehicular" className="text-sm text-primary-foreground/70 hover:text-gold transition-colors">Crédito con Garantía Vehicular</Link>
              <Link href="/saneamiento-predial" className="text-sm text-primary-foreground/70 hover:text-gold transition-colors">Saneamiento Predial</Link>
            </div>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="font-bold text-base mb-4">Empresa</h4>
            <div className="flex flex-col gap-2">
              <Link href="/nosotros" className="text-sm text-primary-foreground/70 hover:text-gold transition-colors">Nosotros</Link>
              <Link href="/articulos" className="text-sm text-primary-foreground/70 hover:text-gold transition-colors">Artículos</Link>
              <Link href="/preguntas-frecuentes" className="text-sm text-primary-foreground/70 hover:text-gold transition-colors">Preguntas Frecuentes</Link>
              <Link href="/contacto" className="text-sm text-primary-foreground/70 hover:text-gold transition-colors">Contáctanos</Link>
              <a href="/politica-de-privacidad-de-prestaclub.pdf" target="_blank" rel="noopener noreferrer" className="text-sm text-primary-foreground/70 hover:text-gold transition-colors">Política de Privacidad</a>
              <Link href="/terminos-y-condiciones" className="text-sm text-primary-foreground/70 hover:text-gold transition-colors">Términos y Condiciones</Link>

            </div>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="font-bold text-base mb-4">Contacto</h4>
            <div className="flex flex-col gap-3">
              <a href="tel:012021500" className="flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-gold transition-colors">
                <Phone className="h-4 w-4 shrink-0" /> (01) 202-1500
              </a>
              <a href={whatsappUrl} onClick={clearTracking} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-gold transition-colors">
                <MessageCircle className="h-4 w-4 shrink-0" /> {whatsappNumber === '51921010200' ? '+51 921 010 200' : '+51 919 000 200'}
              </a>
              <a href="mailto:informes@prestaclub.com" className="flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-gold transition-colors">
                <Mail className="h-4 w-4 shrink-0" /> informes@prestaclub.com
              </a>
              <div className="flex items-start gap-2 text-sm text-primary-foreground/70">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-primary-foreground/90">Oficina Principal</p>
                  <p>Av. Nicolás de Piérola 950, Cercado de Lima</p>
                </div>
              </div>
              <div className="flex items-start gap-2 text-sm text-primary-foreground/70">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-primary-foreground/90">Oficina Ventanilla</p>
                  <p>Pj. 51 Mz G6 Lt. 4 (Angamos), Ventanilla</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-primary-foreground/50">
            © {new Date().getFullYear()} PrestaClub. Todos los derechos reservados.
          </p>
          <p className="text-xs text-primary-foreground/40">
            Inscritos en la SBS en el Registro de Empresas de Préstamo
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
