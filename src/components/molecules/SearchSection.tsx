import {useEffect, useState} from 'react';
import {FlexBox} from '../atoms/FlexBox';
import Button from '../atoms/Button';
import SearchIcon from '@mui/icons-material/Search';
import DatePicker from '../atoms/DatePicker';
import dayjs, {Dayjs} from 'dayjs';
import {useFetchFlights} from '../../react-query/hooks/useFlights.query';
import {useFetchAirports} from '../../react-query/hooks/useAirport.query';
import {Toastr} from '../atoms/Popover';
import {
  TextField,
  Autocomplete,
  Container,
  CircularProgress,
} from '@mui/material';
import {Airport} from '../../type/Airport';
import {debounce} from 'lodash';
import FlightCard from './FlightCard';
import {Itinerary} from '../../type/Itenerary';

const SearchSection = () => {
  /**
   * local states
   */
  const [originSkyId, setOriginSkyId] = useState('');
  const [originEntityId, setOriginEntityId] = useState('');
  const [departureSkyId, setDepartureSkyId] = useState('');
  const [departureEntityId, setDepartureEntityId] = useState('');

  const [title, setTitle] = useState('');
  const [departureTitle, setDepartureTitle] = useState('');

  const [departureDate, setDepartureDate] = useState<Dayjs | null>(null);
  const [returnDate, setReturnDate] = useState<Dayjs | null>(null);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const [airportSuggestions, setAirportSuggestions] = useState<Airport[]>([]);
  const [departureAirportSuggestions, setDepartureAirportSuggestions] =
    useState<Airport[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);

  // params
  const searchParams = {
    limit: 2,
    originSkyId: originSkyId,
    destinationSkyId: departureSkyId,
    date: departureDate ? dayjs(departureDate).format('YYYY-MM-DD') : '',
    returnDate: returnDate ? dayjs(returnDate).format('YYYY-MM-DD') : '',
    originEntityId: originEntityId,
    destinationEntityId: departureEntityId,
  };

  const searchParamsOrigin = {query: title};
  const searchParamsDeparture = {query: departureTitle};

  /**
   * queries
   */
  const {data, isLoading, error, refetch} = useFetchFlights(
    searchParams,
    false
  );

  const {data: airportsOrigin} = useFetchAirports(searchParamsOrigin, true);
  const {data: airportsDeparture} = useFetchAirports(
    searchParamsDeparture,
    true
  );

  /**
   * handlers
   */
  const updateAirportSuggestions = () => {
    if (airportsOrigin?.data) {
      setAirportSuggestions(airportsOrigin.data);
      setLoadingSuggestions(false);
    }
  };

  const updateDepartureAirportSuggestions = () => {
    if (airportsDeparture?.data) {
      setDepartureAirportSuggestions(airportsDeparture.data);
      setLoadingSuggestions(false);
    }
  };

  const debouncedOriginSearch = debounce((query: string) => {
    setLoadingSuggestions(true);
    setTitle(query);
  }, 500);

  const debouncedDepartureSearch = debounce((query: string) => {
    setLoadingSuggestions(true);
    setDepartureTitle(query);
  }, 500);

  const handleSearch = () => {
    if (originSkyId && departureSkyId && departureDate) {
      setShowToast(false);
      refetch();
    } else {
      setToastMessage('Please fill in all the required fields!');
      setShowToast(true);
    }
  };

  /**
   * effects
   */
  useEffect(() => {
    if (airportsOrigin?.data) updateAirportSuggestions();
    if (airportsDeparture?.data) updateDepartureAirportSuggestions();
  }, [airportsOrigin, airportsDeparture]);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <Container>
      <FlexBox
        sx={{
          gap: 2,
          padding: 5,
          boxShadow: 5,
          borderRadius: '10px',
          flexDirection: {xs: 'column', lg: 'row'},
        }}
      >
        <Autocomplete
          sx={{width: '100%'}}
          value={
            airportSuggestions.find(
              (airport) => airport.presentation.title === title
            ) || undefined
          }
          onInputChange={(event, value) => debouncedOriginSearch(value)}
          onChange={(event, selectedOption) => {
            if (selectedOption) {
              setTitle(selectedOption.presentation.title);
              setOriginSkyId(selectedOption.skyId);
              setOriginEntityId(selectedOption.entityId);
            }
          }}
          options={airportSuggestions}
          loading={loadingSuggestions}
          disableClearable
          getOptionLabel={(option) => option?.presentation?.title || ''}
          renderInput={(params) => (
            <TextField {...params} label='Origin*' fullWidth />
          )}
        />

        <Autocomplete
          sx={{width: '100%'}}
          value={
            departureAirportSuggestions.find(
              (airport) => airport.presentation.title === departureTitle
            ) || undefined
          }
          onInputChange={(event, value) => debouncedDepartureSearch(value)}
          onChange={(event, selectedOption) => {
            if (selectedOption) {
              setDepartureTitle(selectedOption.presentation.title);
              setDepartureSkyId(selectedOption.skyId);
              setDepartureEntityId(selectedOption.entityId);
            }
          }}
          options={departureAirportSuggestions}
          loading={loadingSuggestions}
          disableClearable
          getOptionLabel={(option) => option?.presentation?.title || ''}
          renderInput={(params) => (
            <TextField {...params} label='Departure*' fullWidth />
          )}
        />

        <DatePicker
          sx={{width: '100%'}}
          value={departureDate}
          onChange={setDepartureDate}
          label='Departure Date*'
        />
        <DatePicker
          sx={{width: '100%'}}
          value={returnDate}
          onChange={setReturnDate}
          label='Return Date'
        />
      </FlexBox>

      <FlexBox justifyContent='center'>
        <Button
          startIcon={<SearchIcon />}
          sx={{
            mt: '-15px',
            textTransform: 'capitalize',
            display: 'flex',
            justifyContent: 'center',
          }}
          title='Explore'
          onClick={handleSearch}
        />
      </FlexBox>

      {showToast && <Toastr message={toastMessage} type='error' />}

      <FlexBox
        justifyContent='center'
        alignItems='center'
        flexDirection='column'
        my={5}
      >
        <div className='mt-6 w-full max-w-4xl'>
          {isLoading && <CircularProgress />}
          {error && <div>Error fetching flights. Please try again later.</div>}
        </div>
        {data?.data?.itineraries?.map((itinerary: Itinerary) => (
          <FlightCard itinerary={itinerary} />
        ))}
      </FlexBox>
    </Container>
  );
};

export default SearchSection;
