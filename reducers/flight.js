import { 
    STORE_DEPARTURE_AIRPORT,
    SUBMIT_DEPARTURE_AIRPORT,
    STORE_START_DATE,
    STORE_END_DATE,
    SUBMIT_TRAVEL_DATES,
    SEARCH_FLIGHT_REQUEST,
    SEARCH_FLIGHT_SUCCESS,
    SEARCH_FLIGHT_ERROR,
    DISPLAY_NEXT_DESTINATION_IMAGE
} from '../actions/flight';

const initialState = { 
    startLocationView: true,
    pickDatesView: false,
    destinationImagesView: false,
    flightInformationView: false,
    code: null,
    startDate: null,
    endDate: null,
    destination: null,
    loading: false,
    error: null,
    flight: null,
    destinationImages: [
        {
            source: {uri: 'https://i.imgur.com/VvTCt8m.png'},
            airport: 'PUQ',
            description: 'Duel mountain peaks in the background with a winding road next to a lake',
            location: 'Patagonia, Chile',
            attraction: 'Torres Del Paine',
            why: 'Hike the W'
        },
        {
            source: {uri: 'https://i.imgur.com/vWssU.jpg'},
            airport: 'HKG',
            description: 'The lush, greeen Hong Kong Hills right next to the towering skyscrappers of Hong Kong',
            location: 'Hong Kong',
            attraction: 'Hong Kong Hills',
            why: 'Pearl of the Orient'
        },
    ]
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
    } else if (action.type === DISPLAY_NEXT_DESTINATION_IMAGE) {
        return Object.assign({}, state, {
            flightInformationView: false,
            destinationImagesView: true,
            destinationImages: state.destinationImages.slice(1)
        })
    } else if (action.type === SEARCH_FLIGHT_REQUEST) {
		return Object.assign({}, state, {
            loading: true,
            destinationImagesView: false,
            flightInformationView: true
		})
	} else if (action.type === SEARCH_FLIGHT_SUCCESS) {
		return Object.assign({}, state, {
			flight: action.flight,
			loading: false,
            error: null
		})
	} else if (action.type === SEARCH_FLIGHT_ERROR) {
		return Object.assign({}, state, {
			loading: false,
			error: action.error
        })
    }
	return state;
}