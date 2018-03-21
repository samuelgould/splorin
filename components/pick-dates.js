import React from 'react';
import { View, StyleSheet, TextInput, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
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
    
    // onDateChange(date, type) {
    //     if (type === 'END_DATE') {
    //         return this.props.dispatch(storeEndDate(date));
    //         console.log({
    //         selectedEndDate: date,
    //       });
    //     } else {
    //         this.props.dispatch(storeStartDate(date));
    //         console.log({
    //             selectedStartDate: date,
    //             selectedEndDate: null,
    //         });
    //     }
    // }

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
          <View>
            <CalendarPicker
              allowRangeSelection={true}
              minDate={minDate}
              maxDate={maxDate}
              todayBackgroundColor="#f2e6ff"
              selectedDayColor="#7300e6"
              onDateChange={date => this.onDateChange(date)}
            />

            <Button
                icon={
                    <Icon
                    name='arrow-right'
                    size={15}
                    color='white'
                    />
                }
                onPress={() => this.submitTravelDates()}
                title='Start Splorin'
            />

        </View>
        )
    }
}

const mapStateToProps = state => ({
    startDate: state.startDate,
    endDate: state.endDate
})

export default connect(mapStateToProps)(PickDates);