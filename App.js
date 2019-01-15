import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, Button} from 'react-native';

import ListItem from './src/components/ListItem/ListItem';

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

  palceSubmitHandler = () => {
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

    const placesOutput = this.state.places.map((place, i) => (
      <ListItem key={i} placeName={place} />
    ));

    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput 
              style={{width: 300}}
              placeholder="An awesome example string"
              value={this.state.placeName} 
              onChangeText={this.placeNameChangedHandler} 
              style={styles.placeInput}
            />
          <Button 
            title="Add"
            onPress={this.palceSubmitHandler}
            style={styles.placeButton}
          ></Button>
        </View> 
        <View style={styles.listContainer}>
          {placesOutput}
        </View>
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
  inputContainer: {
    // flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  placeInput: {
    width: "70%"
  },
  placeButton: {
     width: "30%"
  },
  listContainer: {
    width: "100%"
  }
});
