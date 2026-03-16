import Link from 'next/link';
import { Package, Plus } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';

export function AdminHeader() {
  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Package className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold">Panel Admin - PrestaClub</h1>
        </div>
        <nav className="flex items-center gap-4">
          <Link href="/articulos" className="text-sm text-muted-foreground hover:text-primary">
            Ver Blog
          </Link>
          <Button asChild>
            <Link href="/admin/articulos/nuevo">
              <Plus className="h-4 w-4 mr-2" /> Nuevo Artículo
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
