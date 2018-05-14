import React from 'react';
import { StyleSheet, Alert } from 'react-native';
import { connect } from 'react-redux';
import SwipeCards from 'react-native-swipe-cards';
import Swiper from 'react-native-deck-swiper';
import { View, DeckSwiper, Card, CardItem } from 'native-base';
import DestinationCard from './destination-card';
import { searchFlight, displayNextDestinationImage } from '../actions/flight';

export class DestinationViewport extends React.Component {
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
                renderCard={destination => <DestinationCard {...destination} />}

                showSecondCard={true}

                handleYup={destination => this.searchFlight(code, destination.airport, startDay, startMonth, startYear, endDay, endMonth, endYear)}
                handleNope={() => this.props.dispatch(displayNextDestinationImage())}

                yupTextStyle={styles.text}
                yupStyle={styles.yup}

                nopeTextStyle={styles.text}
                nopeStyle={styles.nope}
            />
        )
    }
}

const styles = StyleSheet.create({
    text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 36
    },
    nope: {
        backgroundColor: '#8D4E85',
        marginBottom: 200,
        marginLeft: 125,
        borderRadius: 8,
        borderColor: '#8D4E85'
    },
    yup: {
        backgroundColor: '#33CC99',
        marginBottom: 200,
        marginRight: 125,
        borderRadius: 8,
        borderColor: '#33CC99'
    }
});

const mapStateToProps = state => ({
    code: state.code,
    startDate: state.startDate,
    endDate: state.endDate,
    destinationImages: state.destinationImages,  
})

export default connect(mapStateToProps)(DestinationViewport);