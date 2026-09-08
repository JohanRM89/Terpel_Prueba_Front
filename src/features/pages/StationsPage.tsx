import { useState } from "react";
import { Plus, Search, SortAsc } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import type { Station } from "../types/station.types";
import { stationsApi } from "../api/stattions.service";
import { EmptyState, ErrorState, SearchEmptyState, SkeletonGrid } from "@/components/ui/StationStates";
import { StationCard } from "@/components/ui/StationCard";


type StatusFilter = "all" | "published" | "draft";
type SortBy = "name" | "id" | "updated";

export const StationsPage = () => {
  const navigate = useNavigate();

  const {
    data: stations = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["stations"],
    queryFn: stationsApi.getStations,
  });

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sortBy, setSortBy] = useState<SortBy>("name");
  const [menuOpen, setMenuOpen] = useState<number | string | null>(null);

  const handleSelectStation = (station: Station) => {
    navigate(`/stations/${station.id}`);
  };

  const filtered = stations
    .filter((s) => {
      const matchSearch =
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        String(s.stationId || s.id).includes(search);
      const matchStatus = statusFilter === "all" || s.status === statusFilter;
      return matchSearch && matchStatus;
    })
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "id")
        return String(a.stationId || a.id).localeCompare(String(b.stationId || b.id));
      return b.updatedAt.localeCompare(a.updatedAt);
    });

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Estaciones</h1>
          <p className="text-sm text-text-tertiary mt-0.5">{stations.length} Estaciones Registradas</p>
        </div>
   
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex items-center gap-2 bg-white border border-border rounded-lg px-3.5 py-2.5 flex-1 max-w-sm">
          <Search size={15} className="text-text-tertiary shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar estacion por ID o nombre"
            className="flex-1 bg-transparent text-sm outline-none text-text-primary placeholder:text-text-tertiary"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          <div className="flex items-center gap-1 bg-white border border-border rounded-lg p-1">
            {(["all", "published", "draft"] as StatusFilter[]).map((f) => (
              <button
                key={f}
                onClick={() => setStatusFilter(f)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all capitalize
                  ${statusFilter === f ? "bg-text-primary text-white" : "text-text-tertiary hover:text-text-primary]"}`}
              >
                {f === "all" ? "Todos" : f === "published" ? "Activo" : "Inactivo"}
              </button>
            ))}
          </div>

        </div>
      </div>

      {isLoading ? (
        <SkeletonGrid />
      ) : isError ? (
        <ErrorState onRetry={refetch} />
      ) : filtered.length === 0 ? (
        search ? (
          <SearchEmptyState query={search} />
        ) : (
          <EmptyState />
        )
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4">
          {filtered.map((station) => (
            <StationCard
              key={station.id}
              station={station}
              menuOpen={menuOpen === station.id}
              onMenuToggle={() => setMenuOpen(menuOpen === station.id ? null : station.id)}
              onView={() => handleSelectStation(station)}
              onStatusChange={() => {
                setMenuOpen(null);
              }}
            />
          ))}
        </div>
      )}

      {menuOpen !== null && (
        <div className="fixed inset-0 z-20" onClick={() => setMenuOpen(null)} />
      )}
    </div>
  );
}