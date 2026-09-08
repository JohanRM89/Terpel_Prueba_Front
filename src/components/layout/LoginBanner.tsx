import { TerpelLogo } from "@/features/components/TerpelLogo";

const STATS = [
    { value: "24", label: "Estaciones" },
    { value: "98%", label: "Tiempo de actividad" },
    { value: "4", label: "Servicios" },
];

export const LoginBanner = () => {

    return (
        <>
            <div
                className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col justify-between p-12"
                style={{ background: "linear-gradient(145deg, #B9040F 0%, #E30613 50%, #FF1A24 100%)" }}
            >
                <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full opacity-20" style={{ background: "white" }} />
                <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full opacity-10" style={{ background: "white" }} />
                <div className="absolute top-1/2 right-8 w-32 h-32 rounded-full opacity-10" style={{ background: "white" }} />
                <div className="relative z-10">
                    <TerpelLogo white />
                </div>
                <div className="relative z-10 flex-1 flex flex-col justify-center">
                    <div className="mb-10">
                        <div className="w-24 h-24 rounded-2xl flex items-center justify-center mb-8" style={{ background: "rgba(255,255,255,0.15)" }}>
                            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="6" y="20" width="24" height="22" rx="2" fill="white" fillOpacity="0.9" />
                                <rect x="10" y="24" width="7" height="6" rx="1" fill="#E30613" />
                                <rect x="21" y="24" width="7" height="6" rx="1" fill="#E30613" />
                                <rect x="12" y="34" width="8" height="8" rx="1" fill="#E30613" />
                                <rect x="6" y="14" width="24" height="8" rx="2" fill="white" />
                                <rect x="30" y="22" width="4" height="20" rx="1" fill="white" fillOpacity="0.7" />
                                <circle cx="34" cy="20" r="3" fill="white" fillOpacity="0.8" />
                                <rect x="34" y="8" width="2" height="12" rx="1" fill="white" fillOpacity="0.5" />
                                <circle cx="37" cy="7" r="4" fill="white" fillOpacity="0.6" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-white leading-tight mb-4">
                            Administra tu estación<br />con toda la seguridad.
                        </h2>
                        <p className="text-white/70 text-base leading-relaxed max-w-xs">
                            Administra en tiempo real los servicios, disponibilidad y estado operativo de cada estación TERPEL.
                        </p>
                    </div>
                    <div className="flex gap-8">
                        {STATS.map((s) => (
                            <div key={s.label}>
                                <div className="text-2xl font-bold text-white">{s.value}</div>
                                <div className="text-white/60 text-sm">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative z-10">
                    <p className="text-white/40 text-xs">© 2026 Terpel-Prueba Johan Andres Romero Medina.</p>
                </div>
            </div>

        </>
    )
};