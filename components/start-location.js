import React from 'react';
import { View, StyleSheet, TextInput, Image, Alert, Text, TouchableOpacity } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import Autocomplete from 'react-native-autocomplete-input';
import { connect } from 'react-redux';
import { submitDepartureAirport, searchAirportCode, selectAirportCodeOption, emptySearchQuery } from '../actions/flight';

export class StartLocation extends React.Component {

  submitDepartureAirport() {
    if (this.props.query !== null && this.props.query.length === 3) {
      this.props.dispatch(submitDepartureAirport())
    } else {
        Alert.alert(
            'Not so fast...',
            'We need to know the airport where you are starting this adventure.',
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            { cancelable: false }
        )
    }
  }

  searchAirportCode(query) {
    if (query !== '') {
      const capitalizedQuery = query.toUpperCase();
      this.props.dispatch(searchAirportCode(capitalizedQuery));
    } else {
      this.props.dispatch(emptySearchQuery());
    }
  }

  render() {

    const { airports } = this.props;

    return (
      <View style={styles.container}>
        <View>
          <Autocomplete
            style={styles.textInput}
            data={airports}
            defaultValue={this.props.query}
            onChangeText={query => this.searchAirportCode(query)}
            placeholder='Where From?'
            renderItem={({ name, country_name, code }) => (
              <TouchableOpacity onPress={() => this.props.dispatch(selectAirportCodeOption(code))}>
                <Text>
                  {name}, {country_name} ({code})
                </Text>
              </TouchableOpacity>
            )}
          />
          <Button
            onPress={() => this.submitDepartureAirport()}
            title='Continue'
            backgroundColor='#33CC99'
            fontWeight='bold'
            fontSize={20}
            style={styles.button}
          />
        </View>

        <Image source={require('../images/fullSplorinLogo.png')} alt='Splorin Logo with Dino and text' style={styles.logo}/>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    color: '#33CC99',
    fontWeight: 'bold',
    fontSize: 24,
    height: 50, 
    borderColor: '#ccc', 
    borderWidth: 1,
    borderRadius: 8,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: {
        width: 0,
        height: 1,
    },
    elevation: 1,
    width: 300, 
    padding: 10,
    margin: 15
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
  },
  logo: {
    width: 300, 
    height: 300,
    margin: 50,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: {
        width: 0,
        height: 1,
    }
  }
});

const mapStateToProps = state => ({
  query: state.query,
  airports: state.airports || []
})

export default connect(mapStateToProps)(StartLocation);