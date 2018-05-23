import React from 'react';
import { View, StyleSheet, TextInput, Image, Alert, Text, TouchableOpacity } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import Autocomplete from 'react-native-autocomplete-input';
import { connect } from 'react-redux';
import { submitDepartureAirport, searchAirportCode } from '../actions/flight';

export class StartLocation extends React.Component {

  submitDepartureAirport() {
    if (this.props.code !== null && this.props.code.length === 3) {
      this.props.dispatch(submitDepartureAirport())
    } else {
        Alert.alert(
            'Not so fast...',
            'We need to know where you are starting this adventure. That means entering a 3 letter airport code of your home airport.',
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            { cancelable: false }
        )
    }
  }

  queryAirportCode(query) {
    if (/^[a-zA-Z]+$/.test(query) || query === '') {
      this.props.dispatch(searchAirportCode(query));
    } else {
      Alert.alert(
        'Whoops...',
        'Let\'s try with only letters.',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
    )
    }
  }


  render() {

    const { airports } = this.props;

    return (
      <View style={styles.container}>
        <View>
          <Autocomplete
            data={airports}
            defaultValue={this.props.query}
            onChangeText={query => this.queryAirportCode(query)}
            placeholder='Where From?'
            renderItem={({ name, country_name, code }) => (
              <TouchableOpacity onPress={() => this.props.dispatch(selectAirportCodeOption(code))}>
                <Text>
                  {name}, {country_name} ({code})
                </Text>
              </TouchableOpacity>
            )}
          />
          {/* <TextInput
            style={styles.textInput}
            onChangeText={code => this.updateAirportCode(code)}
            placeholder='Where From?'
            value={this.props.search}
          />      */}
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