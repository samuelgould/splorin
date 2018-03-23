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
                <Image source={require('../images/dinoSplorinLogo.png')} alt='Splorin Logo with Dino and Backpack only' style={styles.logoDino}/>
                <Text style={styles.loading}>Loading...</Text>
            </View>
        );

        if (!loading) {
            if (flight) {
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
            } else {
                display = (
                    <View style={styles.whoopsContainer}>
                        <Text style={styles.whoops}>Whoops...looks like we can't find a reasonable flight for you. Sorry!</Text>
                        <Image source={require('../images/dinoSplorinLogo.png')} alt='Splorin Logo with Dino and Backpack only' style={styles.logoDino}/>
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
        justifyContent: 'center',
        alignItems: 'center'
    },
    loading: {
        fontWeight: 'bold',
        fontSize: 48,
        color: '#8D4E85',
        margin: 20,
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowRadius: 10,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        elevation: 1
    },
    whoopsContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    whoops: {
        fontWeight: 'bold',
        width: 300,
        fontSize: 24,
        color: '#8D4E85',
        margin: 20,
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowRadius: 10,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        elevation: 1
    },
    logoDino: {
        width: 300, 
        height: 200,
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowRadius: 10,
        shadowOffset: {
            width: 0,
            height: 1,
        }
    },
    textLogo: {
        width: 300, 
        height: 100,
        alignSelf: 'center',
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowRadius: 10,
        shadowOffset: {
            width: 0,
            height: 1,
        }
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
