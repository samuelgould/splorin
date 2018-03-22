import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import StartLocation from './start-location';
import PickDates from './pick-dates';
import DestinationImages from './destination-images';

export class Dashboard extends React.Component {

  // visitLocation(destination) {
  //   let dividedDate = this.state.date.split('/');
  //   let day = dividedDate[1];
  //   let month = dividedDate[0];
  //   let year = dividedDate[2];
    
  //   

  render() {
    let startLocation;
    let pickDates;
    let destinationImages;
    
    if (this.props.startLocation) {
      startLocation = (
        <StartLocation />
      )
    }

    if (this.props.pickDates) {
      pickDates = (
        <PickDates />
      )
    }

    if (this.props.destinationImages) {
      destinationImages = (
        <DestinationImages />
      )
    }
      
    return (
      <View>
        {startLocation}
        {pickDates}
        {destinationImages}
      </View>
    )
  }
}

const mapStateToProps = state => ({
  startLocation: state.startLocationView,
  pickDates: state.pickDatesView,
  destinationImages: state.destinationImagesView
})

export default connect(mapStateToProps)(Dashboard);