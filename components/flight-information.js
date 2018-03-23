import React from 'react';
import { View, StyleSheet, Text, Linking } from 'react-native';
import { connect } from 'react-redux';
import { Button, Icon, PricingCard } from 'react-native-elements';
import { nextDestinationImage, displayCurrentDestinationImage } from '../actions/flight';

export class FlightInformation extends React.Component {  
    render() {
        
        const { flight, loading, destinationImages } = this.props;
        
        const { location, attraction, why } = destinationImages[0];

        let display = (
            <Text>Loading...</Text>
        );

        if (!loading) {
            display = (
                <View>
                    <PricingCard
                        color='#33CC99'
                        title={location}
                        price={`$${flight.conversion.USD}`}
                        info={[`${flight.flyFrom} <-> ${flight.flyTo}` , attraction, why]}
                        button={{ 
                            title: 'GET ADVENTURING', 
                            icon: 'flight-takeoff'
                        }}
                        onButtonPress={() => Linking.openURL(flight.deep_link)}
                    />
    
                    <Button
                        onPress={() => this.props.dispatch(displayCurrentDestinationImage())}
                        title='Keep Splorin'
                        backgroundColor='#8D4E85'
                        fontWeight='bold'
                        fontSize={20}
                        style={styles.button}
                    />
                </View>
            )    
        }
        
        return (
            <View>
                {display}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowRadius: 10,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        elevation: 1
    }
});

const mapStateToProps = state => ({
    flight: state.flight,
    loading: state.loading,
    destinationImages: state.destinationImages
})

export default connect(mapStateToProps)(FlightInformation);
