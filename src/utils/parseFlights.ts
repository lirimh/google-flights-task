import {FlightItinerary} from '../type/Flight';

export const parseFlights = (response: any): FlightItinerary[] => {
  // Extract itineraries from response
  const itineraries = response.data.itineraries;

  if (!itineraries || itineraries.length === 0) {
    return [];
  }

  return itineraries.map((itinerary: any) => {
    const originCity = itinerary.legs[0]?.origin?.city || 'Unknown';
    const destinationCity = itinerary.legs[0]?.destination?.city || 'Unknown';
    const price = itinerary.price?.formatted || 'No price available';

    return {
      id: itinerary.id,
      origin: originCity,
      destination: destinationCity,
      price: price,
      isSelfTransfer: itinerary.isSelfTransfer,
      isProtectedSelfTransfer: itinerary.isProtectedSelfTransfer,
      // Other attributes like duration, tags, etc., can be added as needed
    };
  });
};
