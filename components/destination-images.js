import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

export class DestinationImages extends React.Component {

  render() {
    return (
      <View>

        <Text>Pretty Picture</Text>

      </View>
    )
  }
}

const mapStateToProps = state => ({
    code: state.code,
    startDate: state.startDate,
    endDate: state.endDate    
})

export default connect(mapStateToProps)(DestinationImages);