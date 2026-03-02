import Layout from "@/core/layouts/MainLayout";

const TermsPage = () => {
  return (
    <Layout>
      <section className="section-padding bg-background min-h-screen">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-4xl font-extrabold mb-8">Términos y Condiciones</h1>
          <div className="prose prose-slate max-w-none font-body text-muted-foreground space-y-6">
            <p><strong>Vigente desde: 20 de Febrero de 2024</strong></p>
            <p>Al acceder y utilizar el sitio web de PrestaClub, aceptas cumplir con los siguientes términos y condiciones de uso.</p>

            <h2 className="text-2xl font-bold text-foreground pt-4">1. Uso del Sitio</h2>
            <p>El contenido de las páginas de este sitio web es para tu información general y uso exclusivo. Está sujeto a cambios sin previo aviso.</p>

            <h2 className="text-2xl font-bold text-foreground pt-4">2. Veracidad de la Información</h2>
            <p>El usuario se compromete a proporcionar información veraz y exacta en los formularios de precalificación. El proporcionar información falsa puede resultar en el rechazo de la solicitud o la anulación de cualquier acuerdo previo.</p>

            <h2 className="text-2xl font-bold text-foreground pt-4">3. No Asesoría Financiera Directa</h2>
            <p>La información contenida en este sitio no constituye asesoría financiera legal. La decisión de solicitar un préstamo o inversión es responsabilidad exclusiva del usuario, previa evaluación de sus condiciones personales.</p>

            <h2 className="text-2xl font-bold text-foreground pt-4">4. Propiedad Intelectual</h2>
            <p>Este sitio web contiene material que es propiedad de PrestaClub. La reproducción está prohibida salvo de conformidad con el aviso de copyright, que forma parte de estos términos y condiciones.</p>

            <h2 className="text-2xl font-bold text-foreground pt-4">5. Registro SBS</h2>
            <p>PrestaClub opera bajo el marco legal peruano y está inscrito en el Registro de Empresas de Préstamo y Empeño de la SBS.</p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default TermsPage;
