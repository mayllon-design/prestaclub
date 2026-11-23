import { AdminHeader } from "@/features/articulos/admin/AdminHeader";
import PopupAdmin from "@/features/popup/PopupAdmin";

export const metadata = {
  title: "Popup - Admin",
  robots: { index: false, follow: false },
};

export default function AdminPopupPage() {
  return (
    <div className="min-h-screen bg-muted/20">
      <AdminHeader />
      <main className="container mx-auto px-4 py-8">
        <PopupAdmin />
      </main>
    </div>
  );
}
