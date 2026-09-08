import { MoreVertical } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import type { StationCardProps } from "../interfaces/ILayout";
import { ServiceIcons } from "./ServiceIcons";
export const StationCard = ({
    station,
    menuOpen,
    onMenuToggle,
    onView,
    onStatusChange,
}: StationCardProps) => {
    const serviceCount = station.servicesCount ?? station.services?.length ?? 0;
    return (
        <div className="bg-white rounded-2xl border border-border p-5 hover:shadow-md hover:border-[#D0D5DD] transition-all group relative">
            <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono font-semibold text-text-tertiary">
                            #{station.stationId || station.id}
                        </span>
                        <StatusBadge status={station.status} />
                    </div>
                    <h3 className="text-base font-bold text-text-primary truncate">{station.name}</h3>
                </div>

                <div className="relative ml-2">
                    <button
                        onClick={onMenuToggle}
                        className="p-1.5 rounded-lg hover:bg-background text-text-tertiary hover:text-text-primary transition-colors"
                    >
                        <MoreVertical size={16} />
                    </button>
                    {menuOpen && (
                        <div className="absolute right-0 top-9 w-44 bg-white rounded-xl shadow-lg border border-border py-1 z-30">
                            <button
                                onClick={onView}
                                className="w-full px-4 py-2.5 text-sm text-text-primary hover:bg-background text-left transition-colors"
                            >
                                Ver detalle
                            </button>
                            <button
                                onClick={onStatusChange}
                                className="w-full px-4 py-2.5 text-sm text-text-tertiary hover:bg-background text-left transition-colors"
                            >
                                Cambiar estado
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-2 mb-4 min-h-9 flex-wrap">
                {serviceCount > 0 && station.services && station.services.length > 0 ? (
                    <>
                        <div className="flex items-center gap-1.5 flex-wrap">
                            {station.services.map((s) => (
                                <ServiceIcons key={s} service={s} size={14} />
                            ))}
                        </div>
                        <span className="text-xs text-text-tertiary">
                            {serviceCount} servicio{serviceCount !== 1 ? "s" : ""}
                        </span>
                    </>
                ) : (
                    <span className="text-xs text-text-tertiary">No tiene servicios</span>
                )}
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-border">
                <span className="text-xs text-text-tertiary">
                    Actualización {new Date(station.updatedAt).toLocaleDateString()}
                </span>
                <button
                    onClick={onView}
                    className="flex items-center gap-1.5 text-xs font-semibold text-brand hover:text-brand-dark transition-colors"
                >
                    Ver estación
                </button>
            </div>
        </div>
    );
}