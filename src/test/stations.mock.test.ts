import { mapRawRelations, mapRawStations } from "@/features/api/stations.mock";
import { describe, it, expect } from "vitest";

describe("Mapeo de Estaciones y Servicios Mock", () => {
  it("debe mapear correctamente las relaciones de servicios", () => {
    const relations = mapRawRelations();
    expect(relations.length).toBeGreaterThan(0);
    expect(relations[0]).toHaveProperty("stationId");
    expect(relations[0]).toHaveProperty("serviceId");
  });

  it("debe mapear correctamente los IDs de servicio a claves de UI (Banos, Cajero, etc.)", () => {
    const stations = mapRawStations();
    
    expect(stations.length).toBe(4);
    
    // Estación 001 tiene s1 (Banos) y s2 (Cajero)
    const station1 = stations.find((s) => s.stationId === "001");
    expect(station1).toBeDefined();
    expect(station1?.services).toContain("Banos");
    expect(station1?.services).toContain("Cajero");
    expect(station1?.servicesCount).toBe(2);
  });
});