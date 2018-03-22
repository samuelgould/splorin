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

export const SEARCH_FLIGHT_LOADING = 'SEARCH_FLIGHT_LOADING';
export const searchFlightLoading = () => ({
  type: SEARCH_FLIGHT_LOADING
});

export const SEARCH_FLIGHT_SUCCESS = 'SEARCH_FLIGHT_SUCCESS';
export const searchFlightSuccess = flight => ({
  type: SEARCH_FLIGHT_SUCCESS,
  flight
});

export const SEARCH_FLIGHT_ERROR = 'SEARCH_FLIGHT_ERROR';
export const searchFlightError = error => ({
  type: SEARCH_FLIGHT_ERROR,
  error
});

export const searchFlight = (departure, destination, startDay, startMonth, startYear, endDay, endMonth, endYear) => {
    fetch(`https://api.skypicker.com/flights?flyFrom=${departure}&to=${destination}&dateFrom=${startDay}%2F${startMonth}%2F${startYear}&dateTo=${startDay}%2F${startMonth}%2F${startYear}&returnFrom=${endDay}%2F${endMonth}%2F${endYear}&returnTo=${endDay}%2F${endMonth}%2F${endYear}&typeFlight=round&partner=picky&partner_market=us&curr=USD&locale=en-US&stopoverto=00%3A00&maxstopovers=0&limit=1&sort=price&asc=1`, 
	{
		method: 'GET',
		headers: {
			'Accept': 'application/json'
	  }
  })
	.then(res => {
		if (!res.ok) {
			return Promise.reject('Something has gone wrong');
		}
		return res.json()
	})
	.then(results => {
    console.log(results);
	})
}