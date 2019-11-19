import React, { Component } from 'react';

class Services extends React.Component {
  // declare private variables for usages in this current class
  constructor() {
    super();
    this.baseURL = 'https://developers.zomato.com/api/v2.1/';
    this.userKey = '5889a1e617da464e2d2d6cd14e133409';
    this.contentType = 'application/x-www-form-urlencoded';
  }

state = {
    location: null
  };

  // function to retrieve list of nearby restaurants based on currrent user location
  getNearbyRestaurants() {
    var lat = '1.290270';
    var lon = '103.851959';

    return fetch(this.baseURL + 'geocode?lat=' + lat + '&lon=' + lon, {
      method: 'POST',
      headers: {
        'Content-Type': this.contentType,
        'user-key': this.userKey,
      },
      // body: JSON.stringify({
      //   lat: '1.290270',
      //   lon: '103.851959'
      // }),
    }).then(response => response.json());
  }
}

const services = new Services();
export default services;
