import { CheckCircle, Radio, RefreshCw, TrendingUp, XCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { stationsApi } from "../../features/api/stattions.service";

export const DashboardKpis = () => {
  const { data: stations = [], isLoading, isError } = useQuery({
    queryKey: ["stations"],
    queryFn: stationsApi.getStations,
  });

  const total = stations.length;
  const active = stations.filter((s) => String(s.status) === "active" || s.isActive === true).length;
  const inactive = total - active;
  const recentlyUpdated = stations.filter((s) => {
    if (!s.updatedAt) return false;
    const updatedAt = new Date(s.updatedAt).getTime();
    const twentyFourHoursAgo = Date.now() - 24 * 60 * 60 * 1000;
    return updatedAt > twentyFourHoursAgo;
  }).length;

  const activePercentage = total > 0 ? Math.round((active / total) * 100) : 0;
  const inactivePercentage = total > 0 ? Math.round((inactive / total) * 100) : 0;

  const kpis = [
    {
      label: "Estaciones totales",
      value: total,
      icon: Radio,
      iconColor: "#E30613",
      iconBg: "#FFF1F2",
      trend: null,
      sub: "Todas las estaciones registradas",
      barWidth: "100%",
    },
    {
      label: "Estaciones activas",
      value: active,
      icon: CheckCircle,
      iconColor: "#12B76A",
      iconBg: "#ECFDF3",
      trend: "+2 al mes",
      sub: `${activePercentage}% de total`,
      barWidth: `${activePercentage}%`,
    },
    {
      label: "Estaciones inactivas",
      value: inactive,
      icon: XCircle,
      iconColor: "#F04438",
      iconBg: "#FEF3F2",
      trend: null,
      sub: `${inactivePercentage}% de total`,
      barWidth: `${inactivePercentage}%`,
    },
    {
      label: "Actualizaciones recientes",
      value: recentlyUpdated,
      icon: RefreshCw,
      iconColor: "#7C3AED",
      iconBg: "#F5F3FF",
      trend: "Ultimas 24 horas",
      sub: "Contido actualizado recientemente",
      barWidth: total > 0 ? `${Math.round((recentlyUpdated / total) * 100)}%` : "0%",
    },
  ];

  if (isLoading) {
    return <div className="p-4 text-sm text-text-secondary">Cargando cards...</div>;
  }

  if (isError) {
    return <div className="p-4 text-sm text-error">Error al cargar métricas</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-10">
      {kpis.map(({ label, value, icon: Icon, iconColor, iconBg, trend, sub, barWidth }) => (
        <div
          key={label}
          className="bg-white rounded-2xl border border-border p-5 hover:shadow-md transition-shadow group"
        >
          <div className="flex items-start justify-between mb-4">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: iconBg }}
            >
              <Icon size={20} style={{ color: iconColor }} />
            </div>
            {trend && (
              <span className="flex items-center gap-1 text-xs font-medium text-success bg-[#ECFDF3] px-2 py-1 rounded-full">
                <TrendingUp size={10} />
                {trend}
              </span>
            )}
          </div>
          <div className="text-3xl font-bold text-text-primary mb-1">{value}</div>
          <div className="text-sm font-semibold text-text-secondary mb-0.5">{label}</div>
          <div className="text-xs text-text-secondary">{sub}</div>

          <div className="mt-4 h-1 bg-background rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: barWidth,
                background: iconColor,
                opacity: 0.6,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}