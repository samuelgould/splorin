import { 
    SEARCH_AIRPORT_CODE_REQUEST,
    SEARCH_AIRPORT_CODE_SUCCESS,
    SEARCH_AIRPORT_CODE_ERROR,
    SUBMIT_DEPARTURE_AIRPORT,
    STORE_START_DATE,
    STORE_END_DATE,
    SUBMIT_TRAVEL_DATES,
    STORE_CURRENT_INDEX,
    SEARCH_FLIGHT_REQUEST,
    SEARCH_FLIGHT_SUCCESS,
    SEARCH_FLIGHT_ERROR,
    SEARCH_FLIGHT_WITH_NO_RESTRICTIONS_FAIL,
    DISPLAY_NEXT_DESTINATION_IMAGE,
    DISPLAY_CURRENT_DESTINATION_IMAGE,
    TOGGLE_MORE_INFO,
    HIDE_MORE_INFO,
    RESTART_SEARCH,
    SELECT_AIRPORT_CODE_OPTION,
    EMPTY_SEARCH_QUERY
} from '../actions/flight';

const initialState = { 
    startLocationView: true,
    pickDatesView: false,
    destinationImagesView: false,
    flightInformationView: false,
    query: null,
    airports: [],
    startDate: null,
    endDate: null,
    destination: null,
    moreInfo: false,
    currentIndex: -1,
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
            // source: {uri: 'https://i.imgur.com/Y6qMZTX.jpg'},
            source: require('../destination-images/torres-del-paine-image.jpeg'),
            airport: 'PUQ',
            description: 'Two mountain clusters in the background of a bright blue lake with waves crashing on rocks',
            location: 'Patagonia, Chile',
            attraction: 'Torres Del Paine',
            why: 'Explore the breathe-taking views that inspired your favorite outdoor clothing brand.'
        },
        {
            // source: {uri: 'https://i.imgur.com/BXJ40.jpg'},
            source: require('../destination-images/hong-kong-hills-image.jpg'),
            airport: 'HKG',
            description: 'The lush, greeen Hong Kong Hills right next to the towering skyscrappers of Hong Kong lit up at night',
            location: 'Hong Kong',
            attraction: 'The Peak of Hong Kong',
            why: 'Find skyscrappers in the midst of lush green hills in the city where nature and civilization live side by side.'
        },
        {
            // source: {uri: 'https://i.imgur.com/SAT57Cy.jpg'},
            source: require('../destination-images/lake-louise-image.jpg'),
            airport: 'YYC',
            description: 'The bright blue water of Lake Louise reflecting the surrounding snowcapped mountains',
            location: 'Banff National Park, Canada',
            attraction: 'Lake Louise',
            why: 'Enjoy the celestial blue waters of Lake Louise in the heart of the Canadian Rockies with glaciers only a short hike away.'
        },
        {
            // source: {uri: 'https://i.imgur.com/Iwgn9ly.jpg'},
            source: require('../destination-images/ta-prohm-image.jpg'),
            airport: 'REP',
            description: 'The lush, greeen Hong Kong Hills right next to the towering skyscrappers of Hong Kong lit up at night',
            location: 'Siem Reap, Cambodia',
            attraction: 'Ta Prohm',
            why: 'Revel in the remains of the Khmer Empire, exploring the ancient temples of Ankgor Wat, Ta Prohm, and Bayon.'
        },
        {
            // source: {uri: 'https://i.imgur.com/odnVEcd.jpg'},
            source: require('../destination-images/san-francisco-image.jpg'),
            airport: 'SFO',
            description: 'The view of the Golden Gate Bridge covered in fog.',
            location: 'San Francisco, California',
            attraction: 'Golden Gate Bridge',
            why: 'Get to know the hills of San Francisco and be sure to check out the Golden Gate Bridge. Don\'t forget a sweatshirt though.'
        },
        {
            // source: {uri: 'https://i.imgur.com/K15QDrm.jpg'},
            source: require('../destination-images/lanikai-beach-image.jpg'),
            airport: 'HNL',
            description: 'Sunrise on Lanikai Beach of Oahu, HI',
            location: 'Oahu, Hawaii',
            attraction: 'Lanikai Beach',
            why: 'Relax on the beach. Swim in the ocean. Explore the volcanoes. Just don\'t go inside them.'
        },
        {
            // source: {uri: 'https://i.imgur.com/F3nmZ6C.jpg'},
            source: require('../destination-images/rocky-mountains-image.jpg'),
            airport: 'DEN',
            description: 'A river in the midst of the mountainous terrain of the Rocky Mountains',
            location: 'Rocky Mountains, Colorado',
            attraction: 'Bear Lake Trail',
            why: 'Get out on the continental divide and find hidden gems scattered throughout the Rocky Mountain National Park.'
        },
        {
            // source: {uri: 'https://i.imgur.com/1S60G9Y.jpg'},
            source: require('../destination-images/burj-khalifa-image.jpg'),
            airport: 'DXB',
            description: 'The Burj Khalifa lit up at night in the heart of Dubai',
            location: 'Dubai, UAE',
            attraction: 'Burj Khalifa',
            why: 'Visit the Burj Khalifa, the tallest building in the world, in the midst of this rapidly growing city.'
        }
    ]
  }

export const reducer = (state = initialState, action) => {
  if (action.type === SEARCH_AIRPORT_CODE_REQUEST) {
		return Object.assign({}, state, {
            loading: true,
            query: action.query
		})
	} else if (action.type === SEARCH_AIRPORT_CODE_ERROR) {
		return Object.assign({}, state, {
			loading: false,
			error: action.error
        })
    } else if (action.type === SEARCH_AIRPORT_CODE_SUCCESS) {
		return Object.assign({}, state, {
			airports: action.airports,
			loading: false,
            error: null
		})
	} else if (action.type === SELECT_AIRPORT_CODE_OPTION) {
        return Object.assign({}, state, {
            airports: [],
            query: action.code
        })
    } else if (action.type === EMPTY_SEARCH_QUERY) {
        return Object.assign({}, state, {
            airports: [],
            query: ''
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
        let index = action.currentIndex;
        if (index === 7) {
            index = -1;
        }
        return Object.assign({}, state, {
			currentIndex: index
		})
	} else if (action.type === DISPLAY_NEXT_DESTINATION_IMAGE) {
        let images = [...state.destinationImages.slice(action.currentIndex+2), ...state.destinationImages.slice(0, action.currentIndex+2)];
        if (action.currentIndex === -1) {
            images = [...state.destinationImages.slice(1), state.destinationImages[0]];
        }
        return Object.assign({}, state, {
            moreInfo: false,
            destinationImages: images
        })
    } else if (action.type === DISPLAY_CURRENT_DESTINATION_IMAGE) {
        return Object.assign({}, state, {
            flightInformationView: false,
            destinationImagesView: true,
            noRestrictionsFail: false,
            moreInfo: false,
            currentIndex: -1
        })
    } else if (action.type === SEARCH_FLIGHT_REQUEST) {
        let images = [...state.destinationImages.slice(action.currentIndex+1), ...state.destinationImages.slice(0, action.currentIndex+1)];
        if (action.currentIndex === -1) {
            images = [...state.destinationImages]
        }
        return Object.assign({}, state, {
            loading: true,
            destinationImagesView: false,
            flightInformationView: true,
            destination: action.destination,
            location: action.location,
            attraction: action.attraction,
            why: action.why,
            destinationImages: images
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
    } else if (action.type === HIDE_MORE_INFO) {
		return Object.assign({}, state, {
			moreInfo: false
        })
    } else if (action.type === RESTART_SEARCH) {
        return Object.assign({}, initialState, {
            query: state.query
        })
    }
	return state;
}