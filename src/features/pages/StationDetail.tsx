import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, RefreshCw, Clock, Layers, MapPin } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ServiceIcons } from "@/components/ui/ServiceIcons";
import type { Station } from "../types/station.types";
import { stationsApi } from "../api/stattions.service";
import { ToastContainer, type ToastData } from "@/components/ui/ToastData";
import { StatusModal } from "@/components/ui/StatusModal";
import { InfoItem } from "@/components/ui/ItemsDetails";

export function StationDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const addToast = (type: "success" | "error" | "warning", title: string, message?: string) => {
    const newToast: ToastData = {
      id: Date.now().toString(),
      type,
      title,
      message,
    };
    setToasts((prev) => [...prev, newToast]);
  };

  const removeToast = (toastId: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== toastId));
  };
  const { data: stations = [], isLoading } = useQuery({
    queryKey: ["stations"],
    queryFn: stationsApi.getStations,
  });

  const station = stations.find((s) => String(s.id) === String(id) || s.stationId === id);
  const toggleStatusMutation = useMutation({
    mutationFn: async (targetStation: Station) => {
      await new Promise((resolve) => setTimeout(resolve, 800));
      return targetStation;
    },
    onSuccess: (updatedStation) => {
      queryClient.setQueryData<Station[]>(["stations"], (oldStations = []) =>
        oldStations.map((s) => {
          if (s.id === updatedStation.id) {
            const nextActive = !s.isActive;
            return {
              ...s,
              isActive: nextActive,
              status: nextActive ? "published" : "draft",
              updatedAt: new Date().toISOString(),
            };
          }
          return s;
        })
      );

      const nextState = !updatedStation.isActive;
      addToast(
        "success",
        nextState ? "Estación activada" : "Estación desactivada",
        `La estación "${updatedStation.name}" cambió de estado correctamente.`
      );
      setIsModalOpen(false);
    },
    onError: () => {
      addToast("error", "Error", "No se pudo cambiar el estado de la estación.");
      setIsModalOpen(false);
    },
  });

  if (isLoading) {
    return <div className="p-8 text-center text-text-secondary">Cargando información</div>;
  }

  if (!station) {
    return (
      <div className="p-8 text-center">
        <p className="text-text-primary font-medium">Estación no encontrada</p>
        <button
          onClick={() => navigate("/stations")}
          className="mt-4 px-4 py-2 bg-text-primary text-white text-xs font-semibold rounded-lg"
        >
          Volver 
        </button>
      </div>
    );
  }

  const isStationActive = station.isActive || station.status === "published";
  const services = station.services || [];

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      <ToastContainer toasts={toasts} onDismiss={removeToast} />

      <button
        onClick={() => navigate("/stations")}
        className="flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors mb-6"
      >
        <ArrowLeft size={16} />
        Volver 
      </button>

      <div className="bg-white rounded-2xl border border-border p-6 mb-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="text-xs font-mono font-semibold text-text-tertiary bg-background px-2 py-1 rounded-md">
                ID {station.stationId || station.id}
              </span>
              <span
                className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                  isStationActive
                    ? "bg-[#ECFDF3] text-[#027A48]"
                    : "bg-[#FEF3F2] text-[#B42318]"
                }`}
              >
                {isStationActive ? "Activa" : "Inactiva"}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-text-primary mb-1">{station.name}</h1>
            <div className="flex items-center gap-1.5 text-sm text-text-tertiary">
              <MapPin size={13} />
              Estación Principal
            </div>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
              isStationActive
                ? "bg-[#FEF3F2] text-error hover:bg-[#FEE4E2] border border-[#FDA29B]"
                : "bg-[#ECFDF3] text-[#027A48] hover:bg-[#D1FAE5] border border-[#A6F4C5]"
            }`}
          >
            <RefreshCw size={14} />
            {isStationActive ? "Desactivar estación" : "Activar estación"}
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6 pt-5 border-t border-[#F2F4F7]">
          <InfoItem
            icon={Layers}
            label="Estado actual"
            value={isStationActive ? "Activo" : "Inactivo"}
          />
          <InfoItem
            icon={Clock}
            label="Última actualización"
            value={
              station.updatedAt
                ? new Date(station.updatedAt).toLocaleDateString("es-CO")
                : "Reciente"
            }
          />
          <InfoItem
            icon={Layers}
            label="Servicios"
            value={`${services.length} disponibles`}
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
        <h2 className="text-base font-bold text-text-primary mb-1">Servicios disponibles</h2>
        <p className="text-sm text-text-tertiary mb-6">
          {services.length} servicio{services.length !== 1 ? "s" : ""} en esta estación
        </p>

        {services.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {services.map((serviceKey) => (
              <ServiceIcons key={serviceKey} service={serviceKey} showLabel />
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-sm text-text-tertiary">
            No hay servicios configurados.
          </div>
        )}
      </div>
      {isModalOpen && (
        <StatusModal
          stationName={station.name}
          currentStatus={isStationActive ? "active" : "inactive"}
          onConfirm={async () => {
            await toggleStatusMutation.mutateAsync(station);
          }}
          onCancel={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

