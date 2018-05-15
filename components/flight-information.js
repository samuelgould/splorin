import React from 'react';
import { View, StyleSheet, Text, Image, Linking } from 'react-native';
import { connect } from 'react-redux';
import { Button, Icon, PricingCard } from 'react-native-elements';
import { Spinner } from 'native-base';
import { nextDestinationImage, displayCurrentDestinationImage, searchFlightWithNoRestrictions } from '../actions/flight';

export class FlightInformation extends React.Component {  
    render() {
        
        let { code, startDate, endDate, flight, loading, destinationImages, noRestrictionsFail } = this.props;
        
        const { destination, location, attraction, why } = this.props;

        let display = (
            <View style={styles.loadingContainer}>
                <Image source={require('../images/dinoSplorinLogo.png')} alt='Splorin Logo with Dino and Backpack only' style={styles.logoDino}/>
                <Text style={styles.loading}>Loading...</Text>
                <Spinner color='#33CC99'/>
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
                            title="Keep Splorin'"
                            backgroundColor='#8D4E85'
                            fontWeight='bold'
                            fontSize={20}
                            style={styles.button}
                        />
                    </View>
                )    
            } else if (noRestrictionsFail) {
                display = (
                    <View style={styles.whoopsContainer}>
                        <Text style={styles.whoops}>Sorry...we can't find anything. Seems like planes don't fly between these two places. Try another destination.</Text>
                        <Image source={require('../images/dinoSplorinLogo.png')} alt='Splorin Logo with Dino and Backpack only' style={styles.logoDino}/>
                        <Button
                            onPress={() => this.props.dispatch(displayCurrentDestinationImage())}
                            title="Keep Splorin'"
                            backgroundColor='#8D4E85'
                            fontWeight='bold'
                            fontSize={20}
                            style={styles.button}
                        />
                    </View>
                )
            } else {
                startDate = new Date(startDate);
                startDay = startDate.getDate();
                startMonth = startDate.getMonth() + 1;
                startYear = startDate.getFullYear();

                endDate = new Date(endDate);
                endDay = endDate.getDate();
                endMonth = endDate.getMonth() + 1;
                endYear = endDate.getFullYear();
                
                display = (
                    <View style={styles.whoopsContainer}>
                        <Text style={styles.whoops}>Whoops...looks like we can't find a reasonable flight for you. We restrict ourselves to only showing itineraries with 2 stops or fewer, because any more than that feels excessive to us. Would you like us to see if there are any possible flight options?</Text>
                        <Button
                            onPress={() => this.props.dispatch(searchFlightWithNoRestrictions(code, destination, startDay, startMonth, startYear, endDay, endMonth, endYear))}
                            title="Show Me ANYTHING"
                            backgroundColor='#33CC99'
                            fontWeight='bold'
                            fontSize={20}
                            style={styles.button}
                        />
                        <Image source={require('../images/dinoSplorinLogo.png')} alt='Splorin Logo with Dino and Backpack only' style={styles.logoDino}/>
                        <Button
                            onPress={() => this.props.dispatch(displayCurrentDestinationImage())}
                            title="Keep Splorin'"
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
        fontSize: 16,
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
        margin: 15,
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
        minWidth: 250,
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
    destinationImages: state.destinationImages,
    startDate: state.startDate,
    endDate: state.endDate,
    code: state.code,
    noRestrictionsFail: state.noRestrictionsFail,
    destination: state.destination,
    location: state.location,
    attraction: state.attraction,
    why: state.why
})

export default connect(mapStateToProps)(FlightInformation);
