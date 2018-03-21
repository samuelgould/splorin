import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import CalendarPicker from 'react-native-calendar-picker';

export class PickDates extends React.Component {
    onDateChange(date, type) {
        if (type === 'END_DATE') {
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
                onPress={() => console.log('Start')}
                title='Start Splorin'
            />

        </View>
        )
    }
}