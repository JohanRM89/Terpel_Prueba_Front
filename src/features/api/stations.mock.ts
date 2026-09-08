import type { Service, Station, StationServiceRelation } from "../types/station.types";

export type ServiceKey = "Banos" | "Cajero" | "Soat" | "Tienda";

export interface Services {
  id: ServiceKey;
  label: string;
}

const SERVICE_ID_TO_KEY: Record<string, ServiceKey> = {
  s1: "Banos",
  s2: "Cajero",
  s3: "Soat",
  s4: "Tienda",
};

const rawStations = [
  { id: 1, name: "Estación Prueba 1", stationId: "001" },
  { id: 2, name: "Estación Prueba 2", stationId: "002" },
  { id: 3, name: "Estación Prueba 3", stationId: "003" },
  { id: 4, name: "Estación Prueba 4", stationId: "004" },
];

const rawRelStationsServices = [
  { id: 1, stationId: "001", idServicio: "s1" },
  { id: 2, stationId: "001", idServicios: "s2" },
  { id: 3, stationId: "002", idServicios: "s1" },
  { id: 4, stationId: "003", idServicio: "s3" },
  { id: 5, idEstacion: "003", idServicios: "s1" },
  { id: 6, idEstacion: "004", idServicios: "s4" },
];

const rawServices = [
  { id: 1, idServicio: "s1", nombreServ: "Baño" },
  { id: 2, idServicios: "s2", nombreServ: "Cajeros" },
  { id: 3, idServicio: "s3", nombreServ: "Soat" },
  { id: 4, idServicios: "s4", nombreServ: "Tienda" },
];

export const mapRawRelations = (): StationServiceRelation[] => {
  return rawRelStationsServices.map((r) => ({
    id: r.id,
    stationId: r.stationId || r.idEstacion || "",
    serviceId: (r.idServicio || r.idServicios) as any,
  }));
};

export const mapRawStations = (): Station[] => {
  const relations = mapRawRelations();

  return rawStations.map((s, index) => {
    const stationRelations = relations.filter((r) => r.stationId === s.stationId);

    const services: ServiceKey[] = stationRelations
      .map((r) => SERVICE_ID_TO_KEY[r.serviceId])
      .filter((key): key is ServiceKey => Boolean(key));

    return {
      id: s.id,
      name: s.name,
      stationId: s.stationId,
      status: index % 2 === 0 ? "published" : "draft",
      isActive: index % 2 === 0,
      updatedAt: new Date().toISOString(),
      servicesCount: services.length,
      services,
    };
  });
};

export const mapRawServices = (): Service[] => {
  return rawServices.map((s) => ({
    id: s.id,
    serviceId: (s.idServicio || s.idServicios) as any,
    name: s.nombreServ,
  }));
};