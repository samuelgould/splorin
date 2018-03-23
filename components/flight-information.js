import React from 'react';
import { View, StyleSheet, Text, Image, Linking } from 'react-native';
import { connect } from 'react-redux';
import { Button, Icon, PricingCard } from 'react-native-elements';
import { nextDestinationImage, displayCurrentDestinationImage } from '../actions/flight';

export class FlightInformation extends React.Component {  
    render() {
        
        const { flight, loading, destinationImages } = this.props;
        
        const { location, attraction, why } = destinationImages[0];

        let display = (
            <View style={styles.loadingContainer}>
                <Image source={require('../images/dinoSplorinLogo.png')} alt='Splorin Logo with Dino and Backpack only' style={{width: 300, height: 200}}/>
                <Text style={styles.loading}>Loading...</Text>
            </View>
        );

        if (!loading) {
            display = (
                <View>
                    <Image source={require('../images/textSplorinLogo.png')} alt='Splorin Logo with just text' style={styles.textLogo}/>
                    <PricingCard
                        color='#33CC99'
                        title={location}
                        price={`$${flight.conversion.USD}`}
                        info={[`${flight.flyFrom} <-> ${flight.flyTo}` , attraction, why]}
                        button={{ 
                            title: 'SEE FLIGHT DETAILS', 
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
    loadingContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    loading: {
        fontWeight: 'bold',
        fontSize: 48,
        color: '#8D4E85',
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowRadius: 10,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        elevation: 1
    },
    textLogo: {
        width: 300, 
        height: 50
    },
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
