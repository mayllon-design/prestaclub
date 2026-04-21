"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/shared/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import logoPresta from "@/assets/logopresta.png";
import Image from "next/image";

const products = [
  { name: "Financiamiento con Garantía Hipotecaria", path: "/financiamiento-con-garantia-hipotecaria" },
  { name: "Crédito con Garantía Vehicular", path: "/prestamo-con-garantia-vehicular" },
  { name: "Saneamiento Predial", path: "/saneamiento-predial" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;
  const isDevoluciones = pathname === "/gestion-de-devoluciones-de-saldo";
  const isVehicular = pathname === "/prestamo-con-garantia-vehicular";
  const isSaneamiento = pathname === "/saneamiento-predial";
  
  const precalificarHref = isVehicular ? "#simulador" : isSaneamiento ? "#formulario" : "/financiamiento-con-garantia-hipotecaria#precalificar";
  const precalificarText = isSaneamiento ? "CONSULTAR AHORA" : "PRECALIFICAR";

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src={logoPresta}
            alt="PrestaClub Logo"
            className="h-10 w-auto object-contain md:h-12"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          <Link
            href="/"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive("/") ? "bg-primary/10 text-primary" : "text-foreground/70 hover:text-primary hover:bg-muted"}`}
          >
            Principal
          </Link>

          {/* Products Dropdown */}
          <div className="relative" onMouseEnter={() => setProductsOpen(true)} onMouseLeave={() => setProductsOpen(false)}>
            <button className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium text-foreground/70 hover:text-primary hover:bg-muted transition-colors">
              Productos <ChevronDown className="h-4 w-4" />
            </button>
            {productsOpen && (
              <div className="absolute top-full left-0 pt-2 w-80 animate-fade-in">
                <div className="bg-card rounded-2xl shadow-xl border border-border p-2">
                  {products.map((p) => (
                    <Link
                      key={p.path}
                      href={p.path}
                      className="block px-4 py-3 rounded-xl text-sm font-medium text-foreground/80 hover:bg-primary/5 hover:text-primary transition-colors"
                    >
                      {p.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link
            href="/articulos"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive("/articulos") ? "bg-primary/10 text-primary" : "text-foreground/70 hover:text-primary hover:bg-muted"}`}
          >
            Artículos
          </Link>
          <Link
            href="/nosotros"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive("/nosotros") ? "bg-primary/10 text-primary" : "text-foreground/70 hover:text-primary hover:bg-muted"}`}
          >
            Nosotros
          </Link>
          <Link
            href="/contacto"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive("/contacto") ? "bg-primary/10 text-primary" : "text-foreground/70 hover:text-primary hover:bg-muted"}`}
          >
            Contáctanos
          </Link>
        </nav>

        {/* CTA */}
        {!isDevoluciones && (
          <div className="hidden lg:flex items-center gap-3">
            <Button variant="hero" size="lg" asChild>
              <Link href={precalificarHref}>{precalificarText}</Link>
            </Button>
          </div>
        )}

        {/* Mobile Toggle */}
        <button className="lg:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-6 w-6 text-foreground" /> : <Menu className="h-6 w-6 text-foreground" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-card border-t border-border animate-fade-in">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
            <Link href="/" className="px-4 py-3 rounded-xl text-sm font-medium hover:bg-muted" onClick={() => setMobileOpen(false)}>Principal</Link>
            <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Productos</div>
            {products.map((p) => (
              <Link key={p.path} href={p.path} className="px-6 py-3 rounded-xl text-sm font-medium hover:bg-muted" onClick={() => setMobileOpen(false)}>
                {p.name}
              </Link>
            ))}
            <Link href="/articulos" className="px-4 py-3 rounded-xl text-sm font-medium hover:bg-muted" onClick={() => setMobileOpen(false)}>Artículos</Link>
            <Link href="/nosotros" className="px-4 py-3 rounded-xl text-sm font-medium hover:bg-muted" onClick={() => setMobileOpen(false)}>Nosotros</Link>
            <Link href="/contacto" className="px-4 py-3 rounded-xl text-sm font-medium hover:bg-muted" onClick={() => setMobileOpen(false)}>Contáctanos</Link>
            {!isDevoluciones && (
              <Button variant="hero" size="lg" className="mt-3" asChild>
                <Link href={precalificarHref} onClick={() => setMobileOpen(false)}>{precalificarText}</Link>
              </Button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
