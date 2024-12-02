import axios from 'axios';

export const apiClientV2 = axios.create({
  baseURL: 'https://sky-scrapper.p.rapidapi.com/api/v1/flights/',
  headers: {
    'X-RapidAPI-Key': 'd71870277dmsh7cd2314b409a2e7p1947c3jsnae3b5c03c3b7',
    'X-RapidAPI-Host': 'sky-scrapper.p.rapidapi.com',
  },
});
