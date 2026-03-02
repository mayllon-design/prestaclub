import { Routes, Route, Navigate } from "react-router-dom";
import Principal from "@/features/home/PrincipalPage";
import Hipotecario from "@/features/hipotecario/HipotecarioPage";
import { CapitalDeTrabajo, Construccion, ConsolidacionDeudas, CompraHipoteca } from "@/features/hipotecario/BuyerHipotecarioPage";
import Vehicular from "@/features/vehicular/VehicularPage";
import Saneamiento from "@/features/saneamiento/SaneamientoPage";
import Nosotros from "@/features/company/NosotrosPage";
import Contacto from "@/features/company/ContactoPage";
import Articulos from "@/features/content/ArticulosPage";
import Faq from "@/features/content/FaqPage";
import Privacy from "@/features/legal/PrivacyPage";
import Terms from "@/features/legal/TermsPage";
import NotFound from "@/core/pages/NotFoundPage";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/principal" replace />} />
            <Route path="/principal" element={<Principal />} />
            <Route path="/financiamiento-con-garantia-hipotecaria" element={<Hipotecario />} />
            <Route path="/financiamiento-con-garantia-hipotecaria/capital-de-trabajo" element={<CapitalDeTrabajo />} />
            <Route path="/financiamiento-con-garantia-hipotecaria/construccion" element={<Construccion />} />
            <Route path="/financiamiento-con-garantia-hipotecaria/consolidacion-de-deudas" element={<ConsolidacionDeudas />} />
            <Route path="/financiamiento-con-garantia-hipotecaria/compra-de-hipoteca" element={<CompraHipoteca />} />
            <Route path="/credito-con-garantia-vehicular" element={<Vehicular />} />
            <Route path="/saneamiento-predial" element={<Saneamiento />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/articulos" element={<Articulos />} />
            <Route path="/preguntas-frecuentes" element={<Faq />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/politica-de-privacidad" element={<Privacy />} />
            <Route path="/terminos-y-condiciones" element={<Terms />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};
