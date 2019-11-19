import * as React from 'react';
import { Text, View, Image, StyleSheet, Button } from 'react-native';
import Constants from 'expo-constants';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      TextHolder: 'Helo',
      res_id: '',
      res_details: [],
      displayImage: false,
    };
  }

  randomNum = inputLength => {
    return Math.floor(Math.random() * inputLength);
  };

  getRestaurantDetails = () => {
    fetch(
      'https://developers.zomato.com/api/v2.1/restaurant?res_id=' +
        this.state.res_id,
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
        this.setState({ res_details: responseJson });
        this.setState({ displayImage: true });
        console.log(responseJson);
      });
  };

  handleClick = () => {
    let longitude = 103.8198;
    let latitude = 1.3521;
    this.setState({ displayImage: false });
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
        this.setState({
          res_id:
            responseJson.popularity.nearby_res[
              this.randomNum(responseJson.popularity.nearby_res.length)
            ],
        });
        console.log(this.state.res_id);
        this.getRestaurantDetails();
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Image style={{ height: 100, width: 200 }}
          source=
          {
            'https://cmkt-image-prd.freetls.fastly.net/0.1.0/ps/6713006/600/400/m2/fpnw/wm0/logo-file-08-.jpg?1563672877&s=ee3f04f3fc00151aaeac4c1694a18f1d'
          }
          >
        </Image>
        <Button title="What to eat?" onPress={this.handleClick} />
        <View style={styles.space}>
          <Text>Restaurant Name: {this.state.res_details.name}</Text>
        </View>

        <View style={styles.space}>
          <Text>Category: {this.state.res_details.cuisines}</Text>
        </View>

        {this.state.displayImage === true &&
        this.state.res_details.photos.length !== undefined ? (
          <View sty>
            <Image
              style={styles.photos}
              source={
                this.state.res_details.photos[
                  this.randomNum(this.state.res_details.photos.length)
                ].photo.url
              }
            />
          </View>
        ) : (
          ''
        )}
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
  photos: {
    width: 150,
    height: 150,
    borderRadius: 40,
  },
  space: {
    height: 30,
    flexDirection: 'row',
  },
});
