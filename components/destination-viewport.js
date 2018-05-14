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
            <DeckSwiper
                ref={c => this._deckSwiper = c} 
                dataSource={destinationImages}
                renderItem={destination =>
                    <Card>
                        <CardItem cardBody>
                            <DestinationCard content={destination} />
                        </CardItem>
                    </Card>
                }

                looping={true}

                onSwipeRight={destination => this.searchFlight(code, destination.airport, startDay, startMonth, startYear, endDay, endMonth, endYear)}
                onSwipeLeft={() => this.props.dispatch(displayNextDestinationImage())}
            />
        )
    }
}

const styles = StyleSheet.create({
    yup: {
        textAlign: 'center',
        margin: 'auto',
        alignItems: 'center'
    },
    nope: {
        flex: 1,
        justifyContent: 'center'
    }
});

const mapStateToProps = state => ({
    code: state.code,
    startDate: state.startDate,
    endDate: state.endDate,
    DestinationImages: state.destinationImages,  
})

export default connect(mapStateToProps)(DestinationViewport);