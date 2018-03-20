import React from 'react';
import { View, StyleSheet, Text, TextInput, Picker, Button } from 'react-native';
import { Slider } from 'react-native-elements';

export default class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      code: '',
      date: '',
      days: 1,
      priceValue: 1,
      priceLimit: 3000,
      adults: 1,
      destination: ''
    };
  }

  storeValues(priceValue) {
    let priceLimit = Math.floor(priceValue.toFixed(2) * 3000);
    this.setState({priceValue, priceLimit});
  }

  visitLocation(destination) {
    let dividedDate = this.state.date.split('/');
    let day = dividedDate[1];
    let month = dividedDate[0];
    let year = dividedDate[2];
    
    fetch(`https://api.skypicker.com/flights?flyFrom=${this.state.code}&to=${destination}&dateFrom=${day}%2F${month}%2F${year}&dateTo=${day}%2F${month}%2F${year}&daysInDestinationFrom=${this.state.days}&daysInDestinationTo=${this.state.days}&typeFlight=round&passengers=${this.state.adults}&partner=picky&partner_market=us&curr=USD&locale=en-US&stopoverto=00%3A00&maxstopovers=0&limit=1&sort=price&asc=1`, 
		{
  		method: 'GET',
  		headers: {
				'Accept': 'application/json'
		  }
	  })
		.then(res => {
			if (!res.ok) {
				return Promise.reject('Something has gone wrong');
			}
			return res.json()
		})
		.then(results => {
      console.log(results);
		})
  }

  render() {
    return (
      <View>

        <TextInput
          style={styles.textInput}
          onChangeText={code => this.setState({code})}
          placeholder='Home Airport Code (e.g. SFO)'
          value={this.state.code}
        />

        <TextInput
          style={styles.textInput}
          onChangeText={date => this.setState({date})}
          placeholder='Departure Date (MM/DD/YYYY)'
          value={this.state.date}
        />

        <View style={styles.picker}>  
          <Text>Length of Trip: </Text>
          <Picker
            selectedValue={this.state.days}
            onValueChange={(itemValue, itemIndex) => this.setState({days: itemValue})}>
            <Picker.Item label="1" value={1} />
            <Picker.Item label="2" value={2} />
            <Picker.Item label="3" value={3} />
            <Picker.Item label="4" value={4} />
            <Picker.Item label="5" value={5} />
            <Picker.Item label="6" value={6} />
          </Picker>
        </View>

        <View style={styles.picker}>  
          <Text>Adults: </Text>
          <Picker
            selectedValue={this.state.adults}
            onValueChange={(itemValue, itemIndex) => this.setState({adults: itemValue})}>
            <Picker.Item label="1" value={1} />
            <Picker.Item label="2" value={2} />
            <Picker.Item label="3" value={3} />
            <Picker.Item label="4" value={4} />
            <Picker.Item label="5" value={5} />
            <Picker.Item label="6" value={6} />
          </Picker>
        </View>

        <View style={styles.slider}>
          <Slider
            value={this.state.priceValue}
            onValueChange={priceValue => this.storeValues(priceValue)} />
          <Text>Price Limit: {this.state.priceLimit}</Text>
        </View>

        <Button
          onPress={() => this.visitLocation('HNL')}
          title="Visit Hawaii"
          color="#841584"
        />

      </View>
    )
  }
}

const styles = StyleSheet.create({
  textInput: {
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1, 
    width: 200, 
    padding: 10
  },
  picker: {
    height: 75
  },
  slider: {
    flex: 1, 
    alignItems: 'stretch', 
    justifyContent: 'center',
    width: 150
  }
});