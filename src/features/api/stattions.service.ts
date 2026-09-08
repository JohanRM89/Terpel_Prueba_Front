import type { Service, Station } from '../types/station.types';
import { mapRawStations, mapRawRelations, mapRawServices } from './stations.mock';

let stationsDB = mapRawStations();
const relationsDB = mapRawRelations();
const servicesDB = mapRawServices();


const delay = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms));

export const stationsApi = {
  getStations: async (): Promise<Station[]> => {
    await delay();
    return [...stationsDB];
  },

  getServicesByStationId: async (stationId: string): Promise<Service[]> => {
    await delay();
    const relatedServiceIds = relationsDB
      .filter((r) => r.stationId === stationId)
      .map((r) => r.serviceId);

    return servicesDB.filter((s) => relatedServiceIds.includes(s.serviceId));
  },

  toggleStationStatus: async (id: number): Promise<Station> => {
    await delay();
    const index = stationsDB.findIndex((s) => s.id === id);
    if (index === -1) throw new Error('Estación no encontrada');

    stationsDB[index] = {
      ...stationsDB[index],
      isActive: !stationsDB[index].isActive,
      updatedAt: new Date().toISOString(),
    };
    return stationsDB[index];
  },
};