import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import StartLocation from './start-location';
import PickDates from './pick-dates';
import DestinationImages from './destination-images';
import FlightInformation from './flight-information';

export class Dashboard extends React.Component {

  render() {
    let startLocation;
    let pickDates;
    let destinationImages;
    let flightInformation;
    
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

    if (this.props.flightInformation) {
      flightInformation = (
        <FlightInformation />
      )
    }
      
    return (
      <View>
        {startLocation}
        {pickDates}
        {destinationImages}
        {flightInformation}
      </View>
    )
  }
}

const mapStateToProps = state => ({
  startLocation: state.startLocationView,
  pickDates: state.pickDatesView,
  destinationImages: state.destinationImagesView,
  flightInformation: state.flightInformationView
})

export default connect(mapStateToProps)(Dashboard);