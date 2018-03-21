export const STORE_DEPARTURE_AIRPORT = 'STORE_DEPARTURE_AIRPORT';
export const storeDepartureAirport = code => ({
  type: STORE_DEPARTURE_AIRPORT,
  code
});

export const SUBMIT_DEPARTURE_AIRPORT = 'SUBMIT_DEPARTURE_AIRPORT';
export const submitDepartureAirport = () => ({
  type: SUBMIT_DEPARTURE_AIRPORT
});

export const STORE_START_DATE = 'STORE_START_DATE';
export const storeStartDate = startDate => ({
  type: STORE_START_DATE,
  startDate
});

export const STORE_END_DATE = 'STORE_END_DATE';
export const storeEndDate = endDate => ({
  type: STORE_END_DATE,
  endDate
});

export const SUBMIT_TRAVEL_DATES = 'SUBMIT_TRAVEL_DATES';
export const submitTravelDates = () => ({
  type: SUBMIT_TRAVEL_DATES
});