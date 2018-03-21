import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import CalendarPicker from 'react-native-calendar-picker';
import { submitTravelDates } from '../actions/flight';

export class PickDates extends React.Component {
    onDateChange(date, type) {
        if (type === 'END_DATE') {
            console.log('End date is ', date);
            console.log({
            selectedEndDate: date,
          });
        } else {
          console.log({
            selectedStartDate: date,
            selectedEndDate: null,
          });
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
          <View>
            <CalendarPicker
              allowRangeSelection={true}
              minDate={minDate}
              maxDate={maxDate}
              todayBackgroundColor="#f2e6ff"
              selectedDayColor="#7300e6"
              onDateChange={this.onDateChange}
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

export default connect(mapStateToProps)(StartLocation);