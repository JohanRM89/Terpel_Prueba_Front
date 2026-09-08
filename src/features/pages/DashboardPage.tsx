import { useNavigate } from "react-router-dom";
import { stationsApi } from "../api/stattions.service";
import { useQuery } from "@tanstack/react-query";
import { AlertCircle, Radio, } from "lucide-react";
import { PATHS } from "@/routes/paths";
import { DashboardKpis } from "@/components/ui/DashboardKpis";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { DashboardSkeleton } from "@/components/ui/DashboardSkeleton";


export const DashboardPage = () => {
    const navigate = useNavigate();
    const { data: stations = [], isLoading, isError, refetch } = useQuery({
        queryKey: ["stations"],
        queryFn: stationsApi.getStations,
    });



    if (isLoading) {
        return <DashboardSkeleton />;
    }

    if (isError) {
        return (
            <div className="p-8 max-w-6xl mx-auto text-center">
                <div className="bg-white rounded-2xl border border-border p-8 flex flex-col items-center justify-center">
                    <AlertCircle size={48} className="text-error mb-3" />
                    <h3 className="text-lg font-bold text-text-primary mb-1">Error al cargar las estaciones</h3>
                    <p className="text-sm text-text-secondary mb-4">No pudimos conectar con el servidor para obtener las estadísticas.</p>
                    <button
                        onClick={() => refetch()}
                        className="px-4 py-2 bg-brand text-white rounded-lg text-sm font-semibold hover:bg-brand-dark transition-colors"
                    >
                        Reintentar
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 md:p-8 max-w-6xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-1">Contenido por Estación</h1>
                <p className="text-text-secondary text-sm md:text-base">
                    Administra el contenido de cada estación Terpel en Colomboa
                </p>
            </div>

            <div >
                <DashboardKpis />
            </div>

            <div className="bg-white rounded-2xl border border-border overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                    <h2 className="text-base font-semibold text-text-primary">Estaciones Recientes</h2>
                    <button
                        onClick={() => navigate(PATHS.STATIONS)}
                        className="text-sm font-medium text-brand hover:text-brand-dark transition-colors cursor-pointer"
                    >
                        Ver más +
                    </button>
                </div>

                {stations.length === 0 ? (
                    <div className="p-8 text-center text-text-tertiary text-sm">
                        No hay estaciones registradas por el momento.
                    </div>
                ) : (
                    <div className="divide-y divide-[#F2F4F7]">
                        {stations.slice(0, 5).map((station) => (
                            <div
                                key={station.id}
                                onClick={() => navigate(PATHS.STATIONS)}
                                className="flex items-center gap-4 px-6 py-4 hover:bg-background transition-colors group cursor-pointer"
                            >
                                <div className="w-9 h-9 rounded-lg bg-[#FFF1F2] flex items-center justify-center shrink-0">
                                    <Radio size={16} className="text-brand" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-semibold text-text-primary truncate">{station.name}</span>
                                        <span className="text-xs text-text-tertiary">#{station.id}</span>
                                    </div>
                                    <div className="text-xs text-text-tertiary">
                                        Bogotá, Colombia {station.updatedAt || "Recently"}
                                    </div>
                                </div>
                                <StatusBadge status={station.status || (station.isActive ? "active" : "inactive")} />
                                <span className="text-xs text-text-tertiary hidden sm:block">
                                    {station.servicesCount || 0} servicios
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}


