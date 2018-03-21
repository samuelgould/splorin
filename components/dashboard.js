import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import StartLocation from './start-location';
import { PickDates } from './pick-dates';

export class Dashboard extends React.Component {

  // visitLocation(destination) {
  //   let dividedDate = this.state.date.split('/');
  //   let day = dividedDate[1];
  //   let month = dividedDate[0];
  //   let year = dividedDate[2];
    
  //   fetch(`https://api.skypicker.com/flights?flyFrom=${this.state.code}&to=${destination}&dateFrom=${day}%2F${month}%2F${year}&dateTo=${day}%2F${month}%2F${year}&daysInDestinationFrom=${this.state.days}&daysInDestinationTo=${this.state.days}&typeFlight=round&partner=picky&partner_market=us&curr=USD&locale=en-US&stopoverto=00%3A00&maxstopovers=0&limit=1&sort=price&asc=1`, 
	// 	{
  // 		method: 'GET',
  // 		headers: {
	// 			'Accept': 'application/json'
	// 	  }
	//   })
	// 	.then(res => {
	// 		if (!res.ok) {
	// 			return Promise.reject('Something has gone wrong');
	// 		}
	// 		return res.json()
	// 	})
	// 	.then(results => {
  //     console.log(results);
	// 	})
  // }

  render() {
    let startLocation;
    let pickDates;
    
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
      
    return (
      <View>
        {startLocation}
        {pickDates}
      </View>
    )
  }
}

const mapStateToProps = state => ({
  startLocation: state.startLocationView,
  pickDates: state.pickDatesView
})

export default connect(mapStateToProps)(Dashboard);