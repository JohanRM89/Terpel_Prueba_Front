import type { ServiceKey } from "../api/stations.mock";

export type StationStatus = "draft" | "published" | "archived";
export type ServiceCode = "s1" | "s2" | "s3" | "s4";

export interface Station {
  id: number;
  name: string;
  stationId: string;
  status: StationStatus;
  isActive: boolean;
  updatedAt: string;
  servicesCount?: number; 
  services?: ServiceKey[];
};

export interface Service {
  id: number;
  serviceId: ServiceCode;
  name: string;
};

export interface StationServiceRelation {
  id: number;
  stationId: string;
  serviceId: ServiceCode;
}; 

