import React from 'react';
import { StyleSheet, Alert } from 'react-native';
import { connect } from 'react-redux';
import SwipeCards from 'react-native-swipe-cards';
import DestinationCard from './destination-card';
import { searchFlight, storeCurrentIndex, hideMoreInfo } from '../actions/flight';

export class DestinationViewport extends React.Component {
    searchFlight(departure, destination, startDay, startMonth, startYear, endDay, endMonth, endYear, location, attraction, why, currentIndex) {
        if (departure !== destination) {
            this.props.dispatch(searchFlight(departure, destination, startDay, startMonth, startYear, endDay, endMonth, endYear, location, attraction, why, currentIndex))
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

    cardRemoved(index) {
        this.props.dispatch(storeCurrentIndex(index));
    }

    render() {
        let { code, startDate, endDate, destinationImages, currentIndex } = this.props;

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

                loop={true}

                handleYup={destination => this.searchFlight(code, destination.airport, startDay, startMonth, startYear, endDay, endMonth, endYear, destination.location, destination.attraction, destination.why, currentIndex)}
                handleNope={() => this.props.dispatch(hideMoreInfo())}

                cardRemoved={this.cardRemoved.bind(this)}

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
    currentIndex: state.currentIndex
})

export default connect(mapStateToProps)(DestinationViewport);