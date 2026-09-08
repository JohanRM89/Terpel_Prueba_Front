import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { stationsApi } from '../api/stattions.service';


export const STATIONS_QUERY_KEY = ['stations'];

export const useStations = () => {
    return useQuery({
        queryKey: STATIONS_QUERY_KEY,
        queryFn: stationsApi.getStations,
        staleTime: 1000 * 60 * 5, 
    });
}; 

export const useToggleStationStatus = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: stationsApi.toggleStationStatus,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: STATIONS_QUERY_KEY });
        },
    });
};