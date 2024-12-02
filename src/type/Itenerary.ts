export interface Carrier {
  name: string;
  logoUrl: string;
}

export interface Leg {
  origin: {
    name: string;
  };
  destination: {
    name: string;
  };
  departure: string;
  arrival: string;
  durationInMinutes: number;
  stopCount: number;
  carriers: {
    marketing: Carrier[];
  };
}

export interface Price {
  formatted: string;
}

export interface Itinerary {
  legs: Leg[];
  price?: Price;
}

export interface FlightCardProps {
  itinerary: Itinerary;
  index: number;
}
