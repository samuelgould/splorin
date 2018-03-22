import React from 'react';
import { View, StyleSheet, TextInput, Text, Alert } from 'react-native';
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
  }
});

const mapStateToProps = state => ({
	code: state.code
})

export default connect(mapStateToProps)(StartLocation);