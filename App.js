import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import Constants from 'expo-constants';
import Services from './services/services';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      TextHolder: 'Helo',
      res_id: ''
    };
  }

  handleClick1 = () => {
    var restaurants = [];
    Services.getNearbyRestaurants().then(data => {
      restaurants = data;
      console.log(restaurants);
    });
  };
  
  handleClick = () => {

    let longitude = 103.8198;
    let latitude = 1.3521;
    fetch(
      'https://developers.zomato.com/api/v2.1/geocode?lat=1.3521&lon=103.8198',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'user-key': '5889a1e617da464e2d2d6cd14e133409',
        },
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ res_id: responseJson.popularity.nearby_res[Math.floor(Math.random() * responseJson.popularity.nearby_res.length)] });
      });

  fetch(
      'https://developers.zomato.com/api/v2.1/restaurant?res_id='+this.state.res_id,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'user-key': '5889a1e617da464e2d2d6cd14e133409',
        },
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Press me" onPress={this.handleClick} />

        <Text>Finding what to eat?</Text>
        <Text>{this.state.TextHolder}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
