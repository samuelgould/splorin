import React from 'react';
import { View, StyleSheet, TextInput, Image, Alert } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { storeDepartureAirport, submitDepartureAirport } from '../actions/flight';

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

  updateAirportCode(code) {
    if (/^[a-zA-Z]+$/.test(code) || code === '') {
      this.props.dispatch(storeDepartureAirport(code.toUpperCase()))
    } else {
      Alert.alert(
        'Whoops...',
        'Airport codes only contain letters. Let\'s try that again.',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
    )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <TextInput
            style={styles.textInput}
            onChangeText={code => this.updateAirportCode(code)}
            placeholder='Where From?'
            value={this.props.code}
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
	code: state.code
})

export default connect(mapStateToProps)(StartLocation);