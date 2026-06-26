# Contexto: Sección de Artículos (Blog) + Gestor — para replicar en otro proyecto

Documento de referencia de cómo está implementado el blog en este proyecto (Next.js App Router). Sirve para reconstruir lo mismo en otro proyecto.

---

## 1. Arquitectura en una frase

- **Framework:** Next.js 16 (App Router) + TypeScript.
- **Datos de los artículos:** base de datos **MySQL** (tabla `articles`), accedida con `mysql2/promise`.
- **Imágenes:** **Supabase Storage** (bucket `articulos`), servidas bajo el dominio propio mediante un *rewrite* de `next.config.ts`.
- **Editor de contenido:** **React Quill** (`react-quill-new`), guarda HTML en la columna `content`.
- **Autenticación del gestor:** **Supabase Auth** (email/password) — protege el panel `/admin`.
- **Notificaciones UI:** `sonner` (toasts).

> Dos servicios externos: **MySQL** (contenido) y **Supabase** (imágenes + login). No están acoplados: podrías cambiar uno sin el otro.

### Dependencias clave (`package.json`)
```
"next": "16.1.6",
"mysql2": "^3.20.0",
"@supabase/supabase-js": "^2.99.2",
"react-quill-new": "^3.8.3",
"sonner": "^2.0.7"
```

---

## 2. Variables de entorno (`.env.local`)

```bash
# MySQL (contenido de artículos)
MYSQL_HOST=...
MYSQL_USER=...
MYSQL_PASSWORD=...
MYSQL_DATABASE=...
MYSQL_PORT=3306

# Supabase (imágenes + auth del gestor)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

---

## 3. Base de datos — tabla `articles`

No hay archivo `.sql` en el repo; este es el esquema reconstruido a partir del código (tipos + queries):

```sql
CREATE TABLE articles (
  id              BIGINT AUTO_INCREMENT PRIMARY KEY,
  slug            VARCHAR(255) NOT NULL UNIQUE,   -- usado en la URL /articulos/{slug}
  title           VARCHAR(255) NOT NULL,
  excerpt         TEXT NULL,                       -- resumen para las tarjetas
  content         LONGTEXT NOT NULL,               -- HTML generado por React Quill
  image_url       VARCHAR(500) NULL,               -- ej: /uploads/articulos/123-abc.jpg  (o URL externa)
  category        VARCHAR(100) NULL,
  section         VARCHAR(150) NULL,
  author          VARCHAR(150) NULL,
  seo_title       VARCHAR(255) NULL,
  seo_description VARCHAR(500) NULL,
  published_at    DATETIME NOT NULL,               -- programable; se filtra published_at <= NOW()
  created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at      DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

Notas:
- **Publicación programada:** lo público filtra `WHERE published_at <= NOW()`. Si la fecha es futura, el artículo existe pero no se muestra hasta esa hora.
- **Slug único:** si se repite, el INSERT falla (el gestor muestra "Revisa si el slug ya existe").
- **`content` es HTML** (no markdown); se inyecta con `dangerouslySetInnerHTML`.

### Tipo TypeScript (`src/features/articulos/types.ts`)
```ts
export interface Article {
  id: string; slug: string; title: string;
  excerpt: string | null; content: string; image_url: string | null;
  category: string | null; section: string | null; author: string | null;
  published_at: string; seo_title: string | null; seo_description: string | null;
  created_at: string; updated_at: string;
}
export type CreateArticleInput = Omit<Article, 'id' | 'created_at' | 'updated_at'>;
export type UpdateArticleInput = Partial<CreateArticleInput>;
```

---

## 4. Imágenes — Supabase Storage + rewrite

1. **Bucket:** `articulos` (público) en Supabase Storage.
2. **Subida** (`POST /api/upload`): recibe el archivo, genera nombre único `{timestamp}-{random}.{ext}`, lo sube al bucket y **devuelve una URL relativa** `/uploads/articulos/{fileName}` (NO la URL de Supabase).
3. **Rewrite** en `next.config.ts` para servir esa ruta relativa desde el dominio propio (mejor para SEO y para ocultar Supabase):
```ts
async rewrites() {
  return [{
    source: '/uploads/articulos/:path*',
    destination: 'https://xxxxxxxx.supabase.co/storage/v1/object/public/articulos/:path*',
  }];
}
```
4. **Compresión en cliente** antes de subir (`src/shared/lib/image-utils.ts`, `compressImage`): Canvas API, redimensiona a máx 1200px de ancho y convierte a JPEG calidad 0.8. Límite de 5MB y validación de tipo en el formulario.

> El campo `image_url` también acepta una **URL externa** pegada a mano (ej. Unsplash); el componente la usa tal cual.

---

## 5. Autenticación del gestor (Supabase Auth)

- **Login** (`/admin/login` → `src/features/admin/auth/LoginPage.tsx`): `supabase.auth.signInWithPassword({ email, password })`. Los usuarios se crean en el panel de Supabase (Auth → Users).
- **Protección** (`src/app/admin/articulos/layout.tsx`): client component que en `useEffect` valida `supabase.auth.getSession()`; si no hay sesión redirige a `/admin/login`. También escucha `onAuthStateChange` para cerrar sesión.

> ⚠️ **Importante (seguridad):** la protección es **solo del lado del cliente** (oculta la UI). Las **API routes `/api/articles` (POST/PUT/DELETE) NO validan sesión** en el servidor. En el proyecto nuevo conviene añadir verificación de token de Supabase dentro de las API routes para que no se puedan crear/editar/borrar artículos sin autenticación.

---

## 6. Mapa de archivos

```
src/
├─ app/
│  ├─ articulos/
│  │  ├─ page.tsx                      # Lista pública (renderiza <ArticulosPage/>, client + Suspense)
│  │  └─ [slug]/page.tsx               # Detalle del artículo (SERVER component, lee MySQL directo)
│  ├─ admin/
│  │  ├─ login/page.tsx                # Login (renderiza <LoginPage/>)
│  │  └─ articulos/
│  │     ├─ layout.tsx                 # Guard de sesión Supabase
│  │     ├─ page.tsx                   # Listado admin (CRUD)
│  │     ├─ nuevo/page.tsx             # Crear  -> <ArticleForm/>
│  │     └─ [id]/page.tsx              # Editar -> <ArticleForm initialData/>
│  └─ api/
│     ├─ articles/route.ts             # GET (lista, ?admin=true) + POST (crear)
│     ├─ articles/[id]/route.ts        # GET + PUT + DELETE por id
│     ├─ articles/by-slug/[slug]/route.ts  # GET por slug (solo publicados)
│     └─ upload/route.ts               # POST imagen -> Supabase Storage
├─ features/
│  ├─ articulos/
│  │  ├─ types.ts                      # Interface Article + inputs
│  │  ├─ api.ts                        # articlesApi (fetch wrapper al /api/articles)
│  │  ├─ ArticulosPage.tsx             # Grid + paginación (12/pág) de la lista pública
│  │  └─ admin/
│  │     ├─ ArticleForm.tsx            # Formulario create/edit (tabs: Contenido/Detalles/SEO)
│  │     ├─ RichTextEditor.tsx         # Wrapper de React Quill
│  │     └─ AdminHeader.tsx            # Cabecera del panel
│  └─ admin/auth/LoginPage.tsx         # UI de login
├─ shared/lib/
│  ├─ db.ts                            # Pool MySQL (mysql2/promise)
│  ├─ supabase.ts                      # Cliente Supabase (browser)
│  └─ image-utils.ts                   # compressImage (Canvas)
└─ next.config.ts                      # rewrite /uploads/articulos -> Supabase
```

---

## 7. Flujos completos

### A) Lectura pública
- **Lista** `/articulos`: `ArticulosPage` (client) llama `articlesApi.getAll()` → `GET /api/articles` → `SELECT * FROM articles WHERE published_at <= NOW() ORDER BY published_at DESC`. Paginación en cliente (12 por página). Tarjeta enlaza a `/articulos/{slug}`.
- **Detalle** `/articulos/[slug]`: **Server Component** que consulta MySQL directo (`getArticle(slug)`), hace `generateMetadata` para SEO, inyecta `content` con `dangerouslySetInnerHTML`, muestra artículos relacionados (por `section`, fallback `category`) y el CTA de WhatsApp.

### B) Gestión (admin)
1. `/admin/login` → Supabase `signInWithPassword` → redirige a `/admin/articulos`.
2. El `layout.tsx` valida sesión; si no hay, vuelve al login.
3. `nuevo` o `[id]` montan `<ArticleForm/>`:
   - Tabs **Contenido** (título, slug auto-generado del título, editor Quill), **Detalles** (excerpt, category, section, author, fecha de publicación programable en hora Lima GMT-5, imagen principal con subida o URL), **SEO** (seo_title/description con preview tipo Google y contadores 60/160).
   - **Imagen:** `compressImage` → `POST /api/upload` → guarda `image_url` relativo.
   - **Guardar:** `articlesApi.create` (`POST`) o `update` (`PUT`). Formatea `published_at` a `YYYY-MM-DD HH:mm:ss`.

### Cliente API (`src/features/articulos/api.ts`)
`getAll(admin?)`, `getById(id)`, `getBySlug(slug)`, `create(data)`, `update(id, data)`, `delete(id)` — todos `fetch` a `/api/articles*`.

---

## 8. Detalles finos a no olvidar al replicar

- **Zonas horarias:** el form convierte entre UTC (BD) y Lima GMT-5 al mostrar/guardar `published_at` (`toLimaTimeString` / `toUtcString`). Ajustar al huso del nuevo proyecto.
- **Auto-slug:** al escribir el título en un artículo NUEVO, se genera el slug automáticamente (minúsculas, sin tildes/símbolos, guiones).
- **Imágenes bajo dominio propio:** depende 100% del rewrite de `next.config.ts`. Si se omite, las `image_url` relativas no resuelven.
- **`content` = HTML:** se renderiza con `dangerouslySetInnerHTML`. Considerar sanitización si el contenido no es de confianza.
- **Seguridad de las API:** añadir verificación de sesión Supabase en las rutas de escritura (ver §5).
- **Bucket Supabase:** crear bucket `articulos` **público** y políticas de subida acordes a la anon key (o usar service role en el servidor).

---

## 9. Checklist para el proyecto nuevo

1. [ ] Crear tabla `articles` (§3) en una BD MySQL.
2. [ ] Crear proyecto Supabase: bucket público `articulos` + usuario admin en Auth.
3. [ ] Configurar `.env.local` (§2).
4. [ ] `npm i mysql2 @supabase/supabase-js react-quill-new sonner`.
5. [ ] Copiar/portar: `db.ts`, `supabase.ts`, `image-utils.ts`, las API routes, `next.config.ts` (rewrite), `types.ts`, `api.ts`, `ArticulosPage.tsx`, `ArticleForm.tsx`, `RichTextEditor.tsx`, el guard `layout.tsx`, `LoginPage.tsx`, y las páginas `articulos/` y `admin/`.
6. [ ] Ajustar zona horaria y dominio en el rewrite.
7. [ ] (Recomendado) Proteger las API routes de escritura con el token de Supabase.
```
```
