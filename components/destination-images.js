import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import { searchFlight, displayNextDestinationImage, restartSearch, toggleMoreInfo } from '../actions/flight';

export class DestinationImages extends React.Component {
    onSwipe(gestureName, code, airport, startDay, startMonth, startYear, endDay, endMonth, endYear) {
        const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
        switch (gestureName) {
            case SWIPE_UP:
                this.props.dispatch(toggleMoreInfo());
                break;
            case SWIPE_DOWN:
                this.props.dispatch(toggleMoreInfo());
                break;
            case SWIPE_LEFT:
                this.props.dispatch(displayNextDestinationImage());
                break;
            case SWIPE_RIGHT:
                this.searchFlight(code, airport, startDay, startMonth, startYear, endDay, endMonth, endYear);
                break;
        }
    }

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
    }

    render() {
        let { code, startDate, endDate, destinationImages, moreInfo } = this.props;

        const { source, description, airport, attraction, location, why } = destinationImages[0];
        
        startDate = new Date(startDate);
        startDay = startDate.getDate();
        startMonth = startDate.getMonth() + 1;
        startYear = startDate.getFullYear();

        endDate = new Date(endDate);
        endDay = endDate.getDate();
        endMonth = endDate.getMonth() + 1;
        endYear = endDate.getFullYear();

        const config = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80
        };

        let info;

        if (moreInfo) {
            info = (
                <View style={styles.textBox}>
                    <Text style={styles.header}>{attraction}</Text>
                    <Text style={styles.subHeader}>in {location}</Text>
                    <Text style={styles.text}>{why}</Text>
                </View>
            )
        };

        return (
            <GestureRecognizer
                onSwipe={direction => this.onSwipe(direction, code, airport, startDay, startMonth, startYear, endDay, endMonth, endYear)}
                config={config}
                style={{
                    flex: 1,
                }}
            >
                <ImageBackground style={styles.image} source={source} alt={description}>   
                    <View style={styles.contentContainer}>
                        <View style={styles.iconContainer}>
                            <Icon
                                reverse
                                name='info'
                                type='entypo'
                                color='#33CC99'
                                onPress={() => this.props.dispatch(toggleMoreInfo())}
                                style={styles.shadow}
                            />
                            <Icon
                                reverse
                                name='home'
                                color='#8D4E85'
                                onPress={() => this.props.dispatch(restartSearch())}
                                style={styles.shadow}
                            />
                        </View>
                        {info}
                        <View style={styles.iconContainer}>
                            <Icon 
                                reverse
                                name='flight-takeoff'
                                color='#33CC99'
                                onPress={() => this.searchFlight(code, airport, startDay, startMonth, startYear, endDay, endMonth, endYear)}
                                style={styles.shadow}
                            />
                            <Icon 
                                reverse
                                name='delete'
                                color='#8D4E85'
                                onPress={() => this.props.dispatch(displayNextDestinationImage())}
                                style={styles.shadow}
                            />
                        </View>
                    </View>
                </ImageBackground>
            </GestureRecognizer>
        )
    }
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        alignItems: 'center',
        width: 400
    },
    contentContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: 325
    },
    iconContainer: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between'
    },
    header: {
        color: '#33CC99',
        fontWeight: 'bold',
        fontSize: 24,
        textAlign: 'center'
    },
    subHeader: {
        color: '#33CC99',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center'
    },
    text: {
        color: '#8D4E85',
        fontWeight: 'bold',
        fontSize: 18,
        margin: 10
    },
    textBox: {
        width: 300,
        backgroundColor: 'white',
        margin: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1
    },
    shadow: {
        textShadowColor: 'black',
        shadowOpacity: 0.5,
        shadowRadius: 10,
        // iOS
        textShadowOffset: {
            width: 0,
            height: 1,
        },
        // Android
        textShadowOffset: {
            width: 0,
            height: 1,
        }
    }
  });
  

const mapStateToProps = state => ({
    code: state.code,
    startDate: state.startDate,
    endDate: state.endDate,
    destinationImages: state.destinationImages,
    moreInfo: state.moreInfo    
})

export default connect(mapStateToProps)(DestinationImages);