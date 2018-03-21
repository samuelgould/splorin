export const STORE_DEPARTURE_AIRPORT = 'STORE_DEPARTURE_AIRPORT';
export const storeDepartureAirport = code => ({
  type: STORE_DEPARTURE_AIRPORT,
  code
});

export const SUBMIT_DEPARTURE_AIRPORT = 'SUBMIT_DEPARTURE_AIRPORT';
export const submitDepartureAirport = () => ({
  type: SUBMIT_DEPARTURE_AIRPORT
});