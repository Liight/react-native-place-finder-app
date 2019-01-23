import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";

import Icon from "react-native-vector-icons/Ionicons";
import { deletePlace } from "../../store/actions/index";

class PlaceDetail extends Component {

  placeDeletedHandler = () => {
    this.props.onDeletePlace(this.props.selectedPlace.key)
    this.props.navigator.pop();
  }
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Image source={this.props.selectedPlace.image} style={styles.placeImage} />
          <Text style={styles.placeName}>{this.props.selectedPlace.name}</Text>
        </View>
        <View>
          <TouchableOpacity onPress={this.placeDeletedHandler}>
            <View style={styles.deleteButton}>
              <Icon name="ios-trash" size={30} color="red" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 22
  },
  placeImage: {
    height: 200,
    width: "100%"
  },
  placeName: {
    fontWeight: "bold",
    fontSize: 26,
    textAlign: "center"
  },
  deleteButton: {
    alignItems: "center"
  }
});

const mapDispatchToProps = dispatch => {
  return {
    onDeletePlace: (key) => dispatch(deletePlace(key))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(PlaceDetail);
