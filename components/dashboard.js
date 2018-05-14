import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import StartLocation from './start-location';
import PickDates from './pick-dates';
import DestinationViewport from './destination-viewport';
import FlightInformation from './flight-information';

export class Dashboard extends React.Component {

  render() {
    let startLocation;
    let pickDates;
    let destinationViewport;
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

    if (this.props.destinationViewport) {
      destinationViewport = (
        <DestinationViewport />
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
        {destinationViewport}
        {flightInformation}
      </View>
    )
  }
}

const mapStateToProps = state => ({
  startLocation: state.startLocationView,
  pickDates: state.pickDatesView,
  destinationViewport: state.destinationImagesView,
  flightInformation: state.flightInformationView
})

export default connect(mapStateToProps)(Dashboard);