import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import { searchFlight, displayNextDestinationImage } from '../actions/flight';

export class DestinationImages extends React.Component {
    render() {
        const destinationImages = [
            {
                source: {uri: 'https://i.imgur.com/VvTCt8m.png'},
                airport: 'PUQ',
                description: 'Duel mountain peaks in the background with a winding road next to a lake',
                location: 'Torres Del Paine National Park, Patagonia, Chile'
            }
        ]

        const destination = destinationImages[0].airport;

        let { code, startDate, endDate } = this.props;
        
        startDate = new Date(startDate);
        startDay = startDate.getDate();
        startMonth = startDate.getMonth() + 1;
        startYear = startDate.getFullYear();

        endDate = new Date(endDate);
        endDay = endDate.getDate();
        endMonth = endDate.getMonth() + 1;
        endYear = endDate.getFullYear();

        return (
            <ImageBackground style={styles.image} source={destinationImages[0].source} alt={destinationImages[0].description}>   
                <View style={styles.iconContainer}>
                    <Icon 
                        reverse
                        name='flight-takeoff'
                        color='#33CC99'
                        onPress={() => this.props.dispatch(searchFlight(code, destination, startDay, startMonth, startYear, endDay, endMonth, endYear))}
                    />
                    <Icon 
                        reverse
                        name='delete'
                        color='#8D4E85'
                        onPress={() => this.props.dispatch(displayNextDestinationImage())}
                    />
                </View>
            </ImageBackground>
            )
    }
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: 400
    },
    iconContainer: {
        flex: 1,
        flexDirection: 'row-reverse',
        justifyContent: 'space-around',
        width: '100%',
        paddingTop: 450
    }
  });
  

const mapStateToProps = state => ({
    code: state.code,
    startDate: state.startDate,
    endDate: state.endDate    
})

export default connect(mapStateToProps)(DestinationImages);