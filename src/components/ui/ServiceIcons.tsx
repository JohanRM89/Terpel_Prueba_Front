import type { ServiceKey } from "@/features/api/stations.mock";
import { Toilet, Landmark, FileCheck, Fuel } from "lucide-react";

interface ServiceIconProps {
  service: ServiceKey;
  size?: number;
  showLabel?: boolean;
  className?: string;
}

const SERVICE_CONFIG: Record<
  ServiceKey,
  { icon: React.ElementType; label: string; color: string; bg: string }
> = {
  Banos: { icon: Toilet, label: "Baños", color: "#1D4ED8", bg: "#EFF6FF" },
  Cajero: { icon: Landmark, label: "Cajeros", color: "#7C3AED", bg: "#F5F3FF" },
  Soat: { icon: FileCheck, label: "SOAT", color: "#D97706", bg: "#FFFBEB" },
  Tienda: { icon: Fuel, label: "Tienda", color: "#E30613", bg: "#FFF1F2" },
};

export const ServiceIcons = ({
  service,
  size = 18,
  showLabel = false,
  className = "",
}: ServiceIconProps) => {
  const config = SERVICE_CONFIG[service];

  if (!config) return null;

  const Icon = config.icon;

  if (showLabel) {
    return (
      <div className={`flex flex-col items-center gap-2 ${className}`}>
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center transition-transform hover:scale-105"
          style={{ background: config.bg }}
          title={config.label}
        >
          <Icon size={24} style={{ color: config.color }} />
        </div>
        <span className="text-xs font-medium text-[#344054] text-center">{config.label}</span>
      </div>
    );
  }

  return (
    <div
      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${className}`}
      style={{ background: config.bg }}
      title={config.label}
    >
      <Icon size={size} style={{ color: config.color }} />
    </div>
  );
};

export { SERVICE_CONFIG };