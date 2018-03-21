import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';

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
        return (
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={destinationImages[0].source} alt={destinationImages[0].description} />
            </View>
            )
    }
}

const styles = StyleSheet.create({
    imageContainer: {
      flex: 1,
      alignItems: 'stretch',
    },
    image: {
        flex: 1,
        width: 400
    }
  });
  

const mapStateToProps = state => ({
    code: state.code,
    startDate: state.startDate,
    endDate: state.endDate    
})

export default connect(mapStateToProps)(DestinationImages);