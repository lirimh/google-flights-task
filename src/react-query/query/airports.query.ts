import {apiClientV2} from '../../api/apiClientV2';

type SearchParams = {
  query: string;
};

export const fetchAirports = async (params: SearchParams) => {
  const {data} = await apiClientV2.get('searchAirport', {
    params: params,
  });
  return data;
};
