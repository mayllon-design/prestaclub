import { type ReactNode } from "react";
import Header from "@/shared/components/Header";
import Footer from "@/shared/components/Footer";
import WhatsAppButton from "@/shared/components/WhatsAppButton";
import MobileStickyBar from "@/shared/components/MobileStickyBar";
import SitePopup from "@/features/popup/SitePopup";

interface LayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppButton />
      <MobileStickyBar />
      <SitePopup />
    </div>
  );
};

export default MainLayout;
