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

        <Image source={require('../images/fullSplorinLogo.png')} alt='Splorin Logo with Dino and text' style={styles.logo}/>

        <View>
          <Autocomplete
            style={styles.textInput}
            inputContainerStyle={styles.inputContainer}
            listStyle={styles.optionsContainer}
            data={airports}
            defaultValue={this.props.query}
            onChangeText={query => this.searchAirportCode(query)}
            placeholder='Where From?'
            renderItem={({ name, country_name, code }) => (
              <TouchableOpacity 
                onPress={() => this.props.dispatch(selectAirportCodeOption(code))}
              >
                <Text style={styles.optionsText}>
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
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column-reverse',
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputContainer: {
    borderWidth: 0
  },
  textInput: {
    color: '#33CC99',
    fontWeight: 'bold',
    fontSize: 24,
    height: 50,
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
  optionsText: {
    color: '#33CC99',
    fontWeight: 'bold',
    fontSize: 16,
    padding: 10
  },
  optionsContainer: {
    backgroundColor: '#fefbf7',
    width: 302,
    marginLeft: 14,
    marginTop: -26,
    paddingTop: 20,
    borderWidth: 1
  },
  button: {
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: {
        width: 0,
        height: 1,
    },
    elevation: 1
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