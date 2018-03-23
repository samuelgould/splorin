import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Button, Icon } from 'react-native-elements';
import CalendarPicker from 'react-native-calendar-picker';
import { submitTravelDates, storeStartDate, storeEndDate } from '../actions/flight';

export class PickDates extends React.Component {
    onDateChange(date) {
        if (this.props.startDate !== null && this.props.endDate === null && this.props.startDate <= date) {
            this.props.dispatch(storeEndDate(date));
        } else {
            this.props.dispatch(storeStartDate(date));
        }
    }

    submitTravelDates() {
        if (this.props.startDate !== null && this.props.endDate !== null) {
            this.props.dispatch(submitTravelDates())
        } else {
            Alert.alert(
                'Not so fast...',
                'We need to know the start and end dates for your adventure.',
                [
                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
            )
        }
    }
    
    render() {
        const minDate = new Date(); // Today
        const maxDate = new Date(2019, 12, 31);
    
        return (
          <View style={styles.container}>
            <View>
                <CalendarPicker
                    allowRangeSelection={true}
                    minDate={minDate}
                    maxDate={maxDate}
                    todayBackgroundColor="#C8C8CD"
                    selectedDayColor="#8D4E85"
                    onDateChange={date => this.onDateChange(date)}
                />

                <Button
                    onPress={() => this.submitTravelDates()}
                    title='Start Splorin'
                    backgroundColor='#33CC99'
                    fontWeight='bold'
                    fontSize={20}
                    style={styles.button}
                />
            </View>
            <Image source={require('../images/dinoSplorinLogo.png')} alt='Splorin Logo with Dino and Backpack only' style={{width: 300, height: 200}}/>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        marginTop: 15
    },
    button: {
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowRadius: 10,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        elevation: 1,
        margin: 15
    }
  });

const mapStateToProps = state => ({
    startDate: state.startDate,
    endDate: state.endDate
})

export default connect(mapStateToProps)(PickDates);