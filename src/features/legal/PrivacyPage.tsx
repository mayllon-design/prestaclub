import Layout from "@/core/layouts/MainLayout";

const PrivacyPage = () => {
  return (
    <Layout>
      <section className="section-padding bg-background min-h-screen">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-4xl font-extrabold mb-8">Política de Privacidad</h1>
          <div className="prose prose-slate max-w-none font-body text-muted-foreground space-y-6">
            <p><strong>Última actualización: 20 de Febrero de 2024</strong></p>
            <p>En PrestaClub, nos tomamos muy en serio la privacidad y seguridad de tus datos. Esta política describe cómo recopilamos, usamos y protegemos la información personal que nos proporcionas a través de nuestro sitio web y servicios.</p>

            <h2 className="text-2xl font-bold text-foreground pt-4">1. Recopilación de Información</h2>
            <p>Recopilamos información cuando te registras en nuestro sitio, solicitas una precalificación o te pones en contacto con nosotros. La información recopilada puede incluir tu nombre, dirección de correo electrónico, número de teléfono e información sobre tu propiedad.</p>

            <h2 className="text-2xl font-bold text-foreground pt-4">2. Uso de la Información</h2>
            <p>Cualquier información que recopilemos de ti puede ser usada para personalizar tu experiencia, mejorar nuestro servicio al cliente, procesar transacciones u operaciones hipotecarias, y enviar correos electrónicos periódicos sobre tu solicitud.</p>

            <h2 className="text-2xl font-bold text-foreground pt-4">3. Protección de Datos</h2>
            <p>Implementamos una variedad de medidas de seguridad para mantener la seguridad de tu información personal. Utilizamos encriptación avanzada para proteger los datos sensibles transmitidos en línea.</p>

            <h2 className="text-2xl font-bold text-foreground pt-4">4. Divulgación a Terceros</h2>
            <p>No vendemos, intercambiamos ni transferimos a terceros tu información de identificación personal. Esto no incluye a terceros de confianza que nos asisten en la operación de nuestro sitio web o en la realización de nuestro negocio (como inversionistas institucionales o peritos tasadores), siempre que dichas partes acuerden mantener esta información confidencial.</p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PrivacyPage;
