import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import { searchFlight, displayNextDestinationImage } from '../actions/flight';

export class DestinationImages extends React.Component {
    render() {
        let { code, startDate, endDate, destinationImages } = this.props;

        const { source, description, airport } = destinationImages[0];
        
        startDate = new Date(startDate);
        startDay = startDate.getDate();
        startMonth = startDate.getMonth() + 1;
        startYear = startDate.getFullYear();

        endDate = new Date(endDate);
        endDay = endDate.getDate();
        endMonth = endDate.getMonth() + 1;
        endYear = endDate.getFullYear();

        return (
            <ImageBackground style={styles.image} source={source} alt={description}>   
                <View style={styles.iconContainer}>
                    <Icon 
                        reverse
                        name='flight-takeoff'
                        color='#33CC99'
                        onPress={() => this.props.dispatch(searchFlight(code, airport, startDay, startMonth, startYear, endDay, endMonth, endYear))}
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
    endDate: state.endDate,
    destinationImages: state.destinationImages    
})

export default connect(mapStateToProps)(DestinationImages);