import { useQuery } from '@tanstack/react-query';
import { stationsApi } from '../api/stattions.service';

export const useStationServices = (stationId: string | null) => {
  return useQuery({
    queryKey: ['station-services', stationId],
    queryFn: () => stationsApi.getServicesByStationId(stationId!),
    enabled: !!stationId, 
    staleTime: 1000 * 60 * 5,
  });
};