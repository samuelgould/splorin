import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Alert, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import { searchFlight, displayNextDestinationImage, restartSearch, toggleMoreInfo } from '../actions/flight';

export class DestinationCard extends React.Component {

    render() {
        let { code, startDate, endDate, moreInfo } = this.props;

        const { source, description, airport, attraction, location, why } = this.props;
        
        startDate = new Date(startDate);
        startDay = startDate.getDate();
        startMonth = startDate.getMonth() + 1;
        startYear = startDate.getFullYear();

        endDate = new Date(endDate);
        endDay = endDate.getDate();
        endMonth = endDate.getMonth() + 1;
        endYear = endDate.getFullYear();

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
            <View>    
                <ImageBackground style={styles.image} source={source} alt={description}>   
                    <View style={styles.contentContainer}>
                        <View style={styles.iconContainer}>
                            <TouchableHighlight 
                                onPress={() => this.props.dispatch(toggleMoreInfo())}
                                style={[styles.iconButton, styles.greenButton]}
                                underlayColor='#C8C8CD'
                            >
                                <Icon
                                    name='info'
                                    type='entypo'
                                    color='#fefbf7'
                                    size={25}
                                />
                            </TouchableHighlight>
                            <TouchableHighlight 
                                onPress={() => this.props.dispatch(restartSearch())}
                                style={[styles.iconButton, styles.purpleButton]}
                                underlayColor='#C8C8CD'
                            >
                                <Icon
                                    name='home'
                                    color='#fefbf7'
                                    size={25}
                                />
                            </TouchableHighlight>
                        </View>
                        {info}
                        <View style={styles.iconContainer}>
                            <TouchableHighlight 
                                onPress={() => this.props.dispatch(toggleMoreInfo())}
                                style={[styles.iconButton, styles.greenButton]}
                                underlayColor='#C8C8CD'
                            >
                                <Icon
                                    name='flight-takeoff'
                                    color='#fefbf7'
                                    size={25}
                                        onPress={() => this.searchFlight(code, airport, startDay, startMonth, startYear, endDay, endMonth, endYear)}
                                />
                            </TouchableHighlight>
                            <TouchableHighlight 
                                onPress={() => this.props.dispatch(displayNextDestinationImage())}
                                style={[styles.iconButton, styles.purpleButton]}
                                underlayColor='#C8C8CD'
                            >
                                <Icon
                                    name='delete'
                                    color='#fefbf7'
                                    size={25}
                                />
                            </TouchableHighlight>
                        </View>
                    </View>
                </ImageBackground>
            </View>
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
    iconButton: {
        height: 50,
        width: 50,
        marginTop: 30,
        marginBottom: 30,
        borderRadius: '50%',
        shadowColor: 'black',
        shadowOpacity: 0.7,
        shadowRadius: 10,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        elevation: 1,
        justifyContent: 'center',
    },
    greenButton: {
        backgroundColor: '#33CC99'
    },
    purpleButton: {
        backgroundColor: '#8D4E85'
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
    }
});
  

const mapStateToProps = state => ({
    code: state.code,
    startDate: state.startDate,
    endDate: state.endDate,
    moreInfo: state.moreInfo    
})

export default connect(mapStateToProps)(DestinationCard);