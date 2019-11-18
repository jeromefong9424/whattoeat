import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import Constants from 'expo-constants';

export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
      TextHolder: 'Helo',
    };
  }

  handleClick = async () => {
    try {
      let response = await fetch(
        'https://facebook.github.io/react-native/movies.json'
      );
      let responseJson = await response.json();

      this.setState({ TextHolder: 'hey bitchg' });
      // this.state.TextHolder = this.state.TextHolder.toString().replace(responseJson);
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <View style={styles.container}>

        <Button
          title="Press me"
          onPress={this.handleClick} />

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
