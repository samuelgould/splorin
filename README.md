# Splorin'

Splorin' is a travel-inspiration mobile app. Decision paralysis is crippling when it comes to figuring out where to go on vacation when there are so many wonderful places to visit. Splorin' helps users realize how easy it is to access amazing destinations all around the world, and have fun doing it. Users simply enter their home airport and travel dates, and then start Splorin'. They will then be presented with images from some of the most breathtaking vacation destinations around the world. If a user is feeling inspired, all it takes is a swipe to the right and since the app is plugged into the Kiwi API, they will then see flight costs to their desired destination. On the other hand, if they aren't excited, they can simply left swipe and the app will bring up a new travel destination.

## Screenshots

Landing Page:
----------------------------------------------------------------------------------------------
![LandingPage](./screenshots/splorin-landing-page.png "LandingPage")

Destination Page:
----------------------------------------------------------------------------------------------
![DestinationPage](./screenshots/splorin-destination-page.png "DestinationPage")

## Technology Stack

Front End: React Native

State Management: Redux

## Component Rundown

The Splorin' app is very simple and moves the users through a chain of components taking in a small amount of information about their future trip with each component.

##### Landing Page
Page for user to enter their home airport where they will be traveling from and returning to for this vacation.

##### Travel Dates Page
Page for user to enter their travel dates for this desired vacation.

##### Destination Page
Page for user to look at an image of a potential travel destination and decide if they are interested in seeing how much it would cost to fly to this destination. They can also chose to view a small blurb about the destination from this view.

##### Flight Information Page
Page for user to see how much a flight to their desired destination would cost. They can click through, out of the app, to kiwi.com to immediately book their flight, or go back to the destination page to keep looking at other destinations.

## What's next for Splorin'?

Splorin' is in a proof of concept stage. Some major changes need to be made in terms of structure to move travel destinations from being stored in the state to being held in a database. Also after making that transition, the app needs to dramatically increase the number of travel destinations included in the app, so users can have fun imagining future vacations for more than 5 minutes.

In terms of functionality, the next step for Splorin' is to build out the capacity for a user to save a travel destination. Currently a user can book a trip or keep searching, but often a travel decision isn't that binary. Perhaps a user doesn't have a long enough vacation to travel from California to Patagonia, but they may want to keep an eye on this destination for future trips.