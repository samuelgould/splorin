import { 
    STORE_DEPARTURE_AIRPORT,
    SUBMIT_DEPARTURE_AIRPORT,
    STORE_START_DATE,
    STORE_END_DATE,
    SUBMIT_TRAVEL_DATES,
    SEARCH_FLIGHT_REQUEST,
    SEARCH_FLIGHT_SUCCESS,
    SEARCH_FLIGHT_ERROR,
    SEARCH_FLIGHT_WITH_NO_RESTRICTIONS_FAIL,
    DISPLAY_NEXT_DESTINATION_IMAGE,
    DISPLAY_CURRENT_DESTINATION_IMAGE,
    TOGGLE_MORE_INFO,
    RESTART_SEARCH,
    STORE_CURRENT_INDEX
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
    moreInfo: false,
    currentIndex: 0,
    loading: false,
    error: null,
    flight: null,
    noRestrictionsFail: false,
    destination: null,
    location: null,
    attraction: null,
    why: null,
    destinationImages: [
        {
            source: {uri: 'https://i.imgur.com/Y6qMZTX.jpg'},
            airport: 'PUQ',
            description: 'Two mountain clusters in the background of a bright blue lake with a little house on an island with a bridge leading to it',
            location: 'Patagonia, Chile',
            attraction: 'Torres Del Paine',
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
            location: 'Banff National Park, Canada',
            attraction: 'Lake Louise',
            why: 'Enjoy the celestial blue waters of Lake Louise in the heart of the Canadian Rockies with glaciers only a short hike away.'
        },
        {
            source: {uri: 'https://i.imgur.com/Iwgn9ly.jpg'},
            airport: 'REP',
            description: 'The lush, greeen Hong Kong Hills right next to the towering skyscrappers of Hong Kong lit up at night',
            location: 'Siem Reap, Cambodia',
            attraction: 'Ta Prohm',
            why: 'Revel in the remains of the Khmer Empire, exploring the ancient temples of Ankgor Wat, Ta Prohm, and Bayon.'
        },
        {
            source: {uri: 'https://i.imgur.com/odnVEcd.jpg'},
            airport: 'SFO',
            description: 'The view of the Golden Gate Bridge from Baker Beach during the sunrise',
            location: 'San Francisco, California',
            attraction: 'Golden Gate Bridge',
            why: 'Get to know the hills of San Francisco and don\'t miss this stunning view of the Golden Gate Bridge from Baker Beach.'
        },
        {
            source: {uri: 'https://i.imgur.com/K15QDrm.jpg'},
            airport: 'HNL',
            description: 'Sunset on the North Shore of Oahu, HI',
            location: 'Oahu, Hawaii',
            attraction: 'North Shore Beaches',
            why: 'Relax on the beach. Explore the volcanoes. Just don\'t stay inside.'
        },
        {
            source: {uri: 'https://i.imgur.com/F3nmZ6C.jpg'},
            airport: 'DEN',
            description: 'A waterfall rushing through the mountainous terrain of the Rocky Mountains',
            location: 'Rocky Mountain National Park, Colorado',
            attraction: 'Alberta Falls',
            why: 'Get out on the continental divide and find hidden gems scattered throughout the Rocky Mountain National Park.'
        },
        {
            source: {uri: 'https://i.imgur.com/1S60G9Y.jpg'},
            airport: 'DXB',
            description: 'The Burj Khalifa with fountains in the foreground with a sunset in the background',
            location: 'Dubai, UAE',
            attraction: 'Burj Khalifa',
            why: 'Visit the Burj Khalifa, the tallest building in the world, in the midst of this rapidly gsrowing modern city.'
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
    } else if (action.type === STORE_CURRENT_INDEX) {
		return Object.assign({}, state, {
			currentIndex: action.currentIndex
		})
	} else if (action.type === DISPLAY_NEXT_DESTINATION_IMAGE) {
        return Object.assign({}, state, {
            moreInfo: false,
            destinationImages: [...state.destinationImages.slice(1), state.destinationImages[0]]
        })
    } else if (action.type === DISPLAY_CURRENT_DESTINATION_IMAGE) {
        return Object.assign({}, state, {
            flightInformationView: false,
            destinationImagesView: true,
            noRestrictionsFail: false,
            moreInfo: false
        })
    } else if (action.type === SEARCH_FLIGHT_REQUEST) {
		return Object.assign({}, state, {
            loading: true,
            destinationImagesView: false,
            flightInformationView: true,
            destination: action.destination,
            location: action.location,
            attraction: action.attraction,
            why: action.why
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
    } else if (action.type === SEARCH_FLIGHT_WITH_NO_RESTRICTIONS_FAIL) {
		return Object.assign({}, state, {
			loading: false,
			noRestrictionsFail: true
        })
    } else if (action.type === TOGGLE_MORE_INFO) {
		return Object.assign({}, state, {
			moreInfo: !state.moreInfo
        })
    } else if (action.type === RESTART_SEARCH) {
        return Object.assign({}, initialState, {
            code: state.code
        })
    }
	return state;
}