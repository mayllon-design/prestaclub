import "./desarrollo-inmobiliario.css";

export default function DesarrolloInmobiliarioLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <div className="di-theme">{children}</div>;
}
