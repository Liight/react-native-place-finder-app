// import { Navigation } from 'react-native-navigation';

// import AuthScreen from './src/screens/Auth';

// // Register Screens
// Navigation.registerComponent("react-native-place-finder-app.AuthScreen", () => AuthScreen);

// // Start a App
// Navigation.startSingleScreenApp({
//   screen: {
//     screen: "react-native-place-finder-app.AuthScreen",
//     title: "Login"
//   }
// })

import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { connect } from 'react-redux';

import PlaceInput from "./src/components/PlaceInput/PlaceInput";
import PlaceList from "./src/components/PlaceList/PlaceList";
// import placeImage from './src/assets/image.jpg';
import PlaceDetail from './src/components/PlaceDetail/PlaceDetail';
import { addPlace, deletePlace, selectPlace, deselectPlace } from './src/store/actions/index';

export class App extends Component {

  // Return an updated array to state.places with the current value of the placeName added as an object
  placeAddedHandler = placeName => {
    this.props.onAddPlace(placeName);
  };

  // Return an updated array to state.places without the object with the key of state.selectedPlace
  placeDeletedHandler = () => {
    this.props.onDeletePlace();
  };

  // Sets the state.selectedPlace to null forcing the modal to close
  modalClosedHandler = () => {
    this.props.onDeselectPlace();
  };

  // Finds the object in state.places that has the matching key passed as args to this function
  placeSelectedHandler = (key) => {
    this.props.onSelectPlace(key)
  };

  render() {
    return (
      <View style={styles.container}>
        <PlaceDetail 
          selectedPlace={this.props.selectedPlace}
          onItemDeleted={this.placeDeletedHandler}
          onModalClosed={this.modalClosedHandler}
          />
        <PlaceInput onPlaceAdded={this.placeAddedHandler} />
        <PlaceList
          places={this.props.places}
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

mapStateToProps = state => {
  return {
    places: state.places.places,
    selectedPlace: state.places.selectedPlace
  };
};

mapDispatchToProps = dispatch => {
  return {
    onAddPlace: (name) => dispatch(addPlace(name)),
    onDeletePlace: () => dispatch(deletePlace()),
    onSelectPlace: (key) => dispatch(selectPlace(key)),
    onDeselectPlace: () => dispatch(deselectPlace()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App); 