import React from 'react';
import { View, StyleSheet, TextInput, Button } from 'react-native';
import { connect } from 'react-redux';
import { storeDepartureAirport, submitDepartureAirport } from '../actions/flight';

export class StartLocation extends React.Component {

  render() {
    return (
      <View>

        <TextInput
          style={styles.textInput}
          onChangeText={code => this.props.dispatch(storeDepartureAirport(code))}
          placeholder='Home Airport Code (e.g. SFO)'
          value={this.state.code}
        />

        <Button
          onPress={() => this.props.dispatch(submitDepartureAirport())}
          title="Next"
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
  }
});

export default connect()(StartLocation);