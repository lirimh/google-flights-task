import {useQuery} from '@tanstack/react-query';
import {SearchParams} from '../../type/Flight';
import {fetchFlights} from '../query/flights.query';

export const useFetchFlights = (
  params: SearchParams,
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: ['getFlights', params],
    queryFn: () => fetchFlights(params),
    enabled,
  });
};
