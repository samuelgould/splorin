import { 
    STORE_DEPARTURE_AIRPORT,
    SUBMIT_DEPARTURE_AIRPORT
} from '../actions/flight';

const initialState = { 
    startLocationView: true,
    calendarView: false,
    code: '',
    date: '',
    days: 1,
    destination: ''
  }

export const reducer = (state = initialState, action) => {
  if (action.type === STORE_DEPARTURE_AIRPORT) {
		return Object.assign({}, state, {
			code: action.code,
		})
	} else if (action.type === SUBMIT_DEPARTURE_AIRPORT) {
        return Object.assign({}, state, {
            startLocationView: false,
            calendarView: true
        })
    }
	return state;
}