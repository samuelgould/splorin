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
            attraction: 'Torres Del Paine National Park',
            why: 'Explore breathe-taking views that inspired your favorite outdoor brand.'
        },
        {
            source: {uri: 'https://i.imgur.com/BXJ40.jpg'},
            airport: 'HKG',
            description: 'The lush, greeen Hong Kong Hills right next to the towering skyscrappers of Hong Kong lit up at night',
            location: 'Hong Kong',
            attraction: 'The Peak of Hong Kong',
            why: 'Find skyscrappers in the midst of lush green hills in the city where contrast, variety, trendiness and excitement live side by side.'
        },
        {
            source: {uri: 'https://i.imgur.com/SAT57Cy.jpg'},
            airport: 'YYC',
            description: 'The bright blue water of Lake Louise reflecting the surrounding snowcapped mountains',
            location: 'Banff, Canada',
            attraction: 'Banff National Park',
            why: 'Enjoy the celestial blue waters of Lake Louise in the heart of the Canadian Rockies with glaciers only a short hike away.'
        },
        {
            source: {uri: 'https://i.imgur.com/Iwgn9ly.jpg'},
            airport: 'REP',
            description: 'The lush, greeen Hong Kong Hills right next to the towering skyscrappers of Hong Kong lit up at night',
            location: 'Cambodia',
            attraction: 'Ta Prohm',
            why: 'Revel in the remains of the Khmer Empire, exploring the ancient temples of Ankgor Wat, Ta Prohm, and Bayon.'
        }
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