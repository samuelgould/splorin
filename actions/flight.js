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

export const STORE_CURRENT_INDEX = 'STORE_CURRENT_INDEX';
export const storeCurrentIndex = currentIndex => ({
  type: STORE_CURRENT_INDEX,
  currentIndex
});

export const DISPLAY_NEXT_DESTINATION_IMAGE = 'DISPLAY_NEXT_DESTINATION_IMAGE';
export const displayNextDestinationImage = currentIndex => ({
  type: DISPLAY_NEXT_DESTINATION_IMAGE,
  currentIndex
});

export const DISPLAY_CURRENT_DESTINATION_IMAGE = 'DISPLAY_CURRENT_DESTINATION_IMAGE';
export const displayCurrentDestinationImage = () => ({
  type: DISPLAY_CURRENT_DESTINATION_IMAGE
});

export const SEARCH_FLIGHT_REQUEST = 'SEARCH_FLIGHT_REQUEST';
export const searchFlightRequest = (destination, location, attraction, why, currentIndex) => ({
  type: SEARCH_FLIGHT_REQUEST,
  destination,
  location,
  attraction,
  why,
  currentIndex
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

export const searchFlight = (departure, destination, startDay, startMonth, startYear, endDay, endMonth, endYear, location, attraction, why, currentIndex) => dispatch => {
    dispatch(searchFlightRequest(destination, location, attraction, why, currentIndex));
    return fetch(`https://api.skypicker.com/flights?flyFrom=${departure}&to=${destination}&dateFrom=${startDay}%2F${startMonth}%2F${startYear}&dateTo=${startDay}%2F${startMonth}%2F${startYear}&returnFrom=${endDay}%2F${endMonth}%2F${endYear}&returnTo=${endDay}%2F${endMonth}%2F${endYear}&typeFlight=round&partner=picky&partner_market=us&curr=USD&locale=en-US&maxstopovers=${2}&limit=${1}&sort=price&asc=${1}`, 
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
    dispatch(searchFlightSuccess(results.data[0]));
  })
  .catch(err => 
    dispatch(searchFlightError(err))
  )
}

export const searchFlightWithNoRestrictions = (departure, destination, startDay, startMonth, startYear, endDay, endMonth, endYear) => dispatch => {
  dispatch(searchFlightRequest());
  return fetch(`https://api.skypicker.com/flights?flyFrom=${departure}&to=${destination}&dateFrom=${startDay}%2F${startMonth}%2F${startYear}&dateTo=${startDay}%2F${startMonth}%2F${startYear}&returnFrom=${endDay}%2F${endMonth}%2F${endYear}&returnTo=${endDay}%2F${endMonth}%2F${endYear}&typeFlight=round&partner=picky&partner_market=us&curr=USD&locale=en-US&limit=${1}&sort=price&asc=${1}`, 
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
    if (results.data[0]) {
      dispatch(searchFlightSuccess(results.data[0]));
    } else {
      dispatch(searchFlightWithNoRestrictionsFail());
    }
  })
  .catch(err => 
    dispatch(searchFlightError(err))
  )
}

export const SEARCH_FLIGHT_WITH_NO_RESTRICTIONS_FAIL = 'SEARCH_FLIGHT_WITH_NO_RESTRICTIONS_FAIL';
export const searchFlightWithNoRestrictionsFail = () => ({
  type: SEARCH_FLIGHT_WITH_NO_RESTRICTIONS_FAIL
});

export const TOGGLE_MORE_INFO = 'TOGGLE_MORE_INFO';
export const toggleMoreInfo = () => ({
  type: TOGGLE_MORE_INFO
});

export const HIDE_MORE_INFO = 'HIDE_MORE_INFO';
export const hideMoreInfo = () => ({
  type: HIDE_MORE_INFO
});

export const RESTART_SEARCH = 'RESTART_SEARCH';
export const restartSearch = () => ({
  type: RESTART_SEARCH
});