import React from 'react';
import { View, StyleSheet, TextInput, Image, Alert } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { storeDepartureAirport, submitDepartureAirport } from '../actions/flight';

export class StartLocation extends React.Component {

  submitDepartureAirport() {
    if (this.props.code !== null) {
        this.props.dispatch(submitDepartureAirport())
    } else {
        Alert.alert(
            'Not so fast...',
            'We need to know where you are starting this adventure.',
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
            onChangeText={code => this.props.dispatch(storeDepartureAirport(code))}
            placeholder='Home Airport Code (e.g. SFO)'
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
    height: 40, 
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