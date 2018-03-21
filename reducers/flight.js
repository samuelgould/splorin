import { 
    STORE_DEPARTURE_AIRPORT,
    SUBMIT_DEPARTURE_AIRPORT,
    STORE_START_DATE,
    STORE_END_DATE,
    SUBMIT_TRAVEL_DATES
} from '../actions/flight';

const initialState = { 
    startLocationView: false,
    pickDatesView: false,
    destinationImagesView: true,
    code: null,
    startDate: null,
    endDate: null,
    destination: null
  }

export const reducer = (state = initialState, action) => {
  if (action.type === STORE_DEPARTURE_AIRPORT) {
		return Object.assign({}, state, {
			code: action.code,
		})
	} else if (action.type === SUBMIT_DEPARTURE_AIRPORT) {
        return Object.assign({}, state, {
            startLocationView: false,
            pickDatesView: true
        })
    } else if (action.type === STORE_START_DATE) {
		return Object.assign({}, state, {
            startDate: action.startDate,
            endDate: null
		})
	} else if (action.type === STORE_END_DATE) {
		return Object.assign({}, state, {
			endDate: action.endDate,
		})
	} else if (action.type === SUBMIT_TRAVEL_DATES) {
        return Object.assign({}, state, {
            pickDatesView: false,
            destinationImagesView: true
        })
    }
	return state;
}