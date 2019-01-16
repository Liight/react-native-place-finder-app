import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

import PlaceInput from "./src/components/PlaceInput/PlaceInput";
import PlaceList from "./src/components/PlaceList/PlaceList";
// import placeImage from './src/assets/image.jpg';
import PlaceDetail from './src/components/PlaceDetail/PlaceDetail';

export default class App extends Component {
  state = {
    places: [],
    selectedPlace: null
  };

  // Return an updated array to state.places with the current value of the placeName added as an object
  placeAddedHandler = placeName => {
    this.setState(prevState => {
      return {
        places: prevState.places.concat({
          key: Math.random().toString(), 
          name: placeName,
          image: {
            uri: "https://images.pexels.com/photos/1387037/pexels-photo-1387037.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
          }
        })
      };
    });
  };

  // Return an updated array to state.places without the object with the key of state.selectedPlace
  placeDeletedHandler = () => {
    this.setState(prevState => {
      return {
        places: prevState.places.filter((place) => {
          return place.key !== prevState.selectedPlace.key;
        }),
        selectedPlace: null
      };
    });
  };

  // Sets the state.selectedPlace to null forcing the modal to close
  modalClosedHandler = () => {
    this.setState({
      selectedPlace: null
    });
  };

  // Finds the object in state.places that has the matching key passed as args to this function
  placeSelectedHandler = (key) => {
    this.setState(prevState => {
      return {
        selectedPlace: prevState.places.find(place => {
          return place.key === key;
        })
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <PlaceDetail 
          selectedPlace={this.state.selectedPlace}
          onItemDeleted={this.placeDeletedHandler}
          onModalClosed={this.modalClosedHandler}
          />
        <PlaceInput onPlaceAdded={this.placeAddedHandler} />
        <PlaceList
          places={this.state.places}
          onItemSelected={this.placeSelectedHandler}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 26,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  }
});
