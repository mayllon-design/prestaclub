import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ProcessSection from "./components/ProcessSection";
import SegmentsSection from "./components/SegmentsSection";
import UseCasesSection from "./components/UseCasesSection";
import ValuePropositionSection from "./components/ValuePropositionSection";
import TestimonialsSection from "./components/TestimonialsSection";
import Footer from "./components/Footer";
import CTASection from "./components/CTASection";

export default function DesarrolloInmobiliarioPage() {
    return (
        <div className="di-theme min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
                <HeroSection />
                <ValuePropositionSection />
                <div id="proceso">
                    <ProcessSection />
                </div>
                <UseCasesSection />
                <SegmentsSection />
                <TestimonialsSection />
                <CTASection />
            </main>
            <Footer />
        </div>
    );
}
