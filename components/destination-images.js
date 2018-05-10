import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Alert, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import SwipeCards from 'react-native-swipe-cards';
import Card from './destination-card';
import { searchFlight, displayNextDestinationImage, restartSearch, toggleMoreInfo } from '../actions/flight';

export class DestinationImages extends React.Component {
    searchFlight(code, airport, startDay, startMonth, startYear, endDay, endMonth, endYear) {
        if (code !== airport) {
            this.props.dispatch(searchFlight(code, airport, startDay, startMonth, startYear, endDay, endMonth, endYear))
        } else {
            Alert.alert(
                'Whoops...',
                'Seems like you want to visit your own city. Maybe you should stop playing with us and start splorin\'.',
                [
                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
            )
        }
    }

    render() {
        let { code, startDate, endDate, destinationImages } = this.props;

        const { airport } = destinationImages[0];
        
        startDate = new Date(startDate);
        startDay = startDate.getDate();
        startMonth = startDate.getMonth() + 1;
        startYear = startDate.getFullYear();

        endDate = new Date(endDate);
        endDay = endDate.getDate();
        endMonth = endDate.getMonth() + 1;
        endYear = endDate.getFullYear();

        return (
            <SwipeCards
                cards={destinationImages}
                renderCard={cardData => <Card {...cardData} />}

                handleYup={() => this.searchFlight(code, airport, startDay, startMonth, startYear, endDay, endMonth, endYear)}
                handleNope={() => this.props.dispatch(displayNextDestinationImage())}
            />
        )
    }
}

const mapStateToProps = state => ({
    code: state.code,
    startDate: state.startDate,
    endDate: state.endDate,
    destinationImages: state.destinationImages,  
})

export default connect(mapStateToProps)(DestinationImages);