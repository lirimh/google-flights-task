import {apiClient} from '../../api/apiClient';
import {SearchParams} from '../../type/Flight';

export const fetchFlights = async (params: SearchParams) => {
  const {data} = await apiClient.get('searchFlights', {
    params: params,
  });
  return data;
};
