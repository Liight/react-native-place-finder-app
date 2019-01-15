import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, Button} from 'react-native';

import ListItem from './src/components/ListItem/ListItem';
import UserInput from './src/components/UserInput/UserInput';
import List from './src/components/List/List';

export default class App extends Component {
  state = {
    placeName: '',
    places: []
  }

  placeNameChangedHandler = val => {
    this.setState({
      placeName: val
    })
  }

  placeSubmitHandler = () => {
    if (this.state.placeName.trim() === ""){
      return;
    }

    this.setState(prevState => {
      return {
        places: prevState.places.concat(prevState.placeName)
      }
    });
  }

  render() {

    return (
      <View style={styles.container}>

        <UserInput 
          placeName={this.state.place}
          textChanged={this.placeNameChangedHandler}
          buttonClicked={this.placeSubmitHandler}
        />

        <List 
          style={styles.listContainer}
          places={this.state.places}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 26,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  listContainer: {
    width: "100%"
  }
});
