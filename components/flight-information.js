import React from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Button, Icon, PricingCard } from 'react-native-elements';
import { nextDestinationImage, displayNextDestinationImage } from '../actions/flight';

export class FlightInformation extends React.Component {  
    render() {
        
        const { flight, loading } = this.props;
        
        let display = (
            <Text>Loading...</Text>
        );

        if (!loading) {
            display = (
                <View>
                    <PricingCard
                        color='#33CC99'
                        title='Torres Del Paine'
                        price={`$${flight.conversion.USD}`}
                        info={['1 User', 'Basic Support', 'All Core Features']}
                        button={{ title: 'GET ADVENTURING', icon: 'flight-takeoff' }}
                    />
    
                    <Button
                        onPress={() => this.props.dispatch(displayNextDestinationImage())}
                        title='Keep Splorin'
                        backgroundColor='#8D4E85'
                        fontWeight='bold'
                    />
                </View>
            )    
        }
        
        return (
                <View>
                    <PricingCard
                        color='#33CC99'
                        title='Torres Del Paine'
                        price={`$${flight.conversion.USD}`}
                        info={['1 User', 'Basic Support', 'All Core Features']}
                        button={{ title: 'GET ADVENTURING', icon: 'flight-takeoff' }}
                    />
    
                    <Button
                        onPress={() => this.props.dispatch(displayNextDestinationImage())}
                        title='Keep Splorin'
                        backgroundColor='#8D4E85'
                        fontWeight='bold'
                    />
                </View>
        )
    }
}

const mapStateToProps = state => ({
    flight: state.flight,
    loading: state.loading
})

export default connect(mapStateToProps)(FlightInformation);
