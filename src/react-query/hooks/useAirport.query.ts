import {useQuery} from '@tanstack/react-query';
import {fetchAirports} from '../query/airports.query';

type SearchParams = {
  query: string;
};

export const useFetchAirports = (
  params: SearchParams,
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: ['getAirports', params],
    queryFn: () => fetchAirports(params),
    enabled,
  });
};
