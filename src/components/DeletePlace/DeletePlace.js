import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text
} from "react-native";

const DeletePlace = props => {

    deletePlaceHandler = () => {
        props.removeModalOverlay();
        props.delete();
    }

    cancelHandler = () => {
        props.removeModalOverlay();
    }

  return (
    <View style={styles.container}>
      <Text style={styles.containerInstructions}>
        You are about to delete this place
      </Text>
      <Text style={styles.containerInstructions}>
        Are you sure you want to proceed?
      </Text>
      <View style={styles.buttonRow}>
        <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.buttonContainerTO} onPress={this.deletePlaceHandler}>
                      <Text style={styles.buttonContainerTextYes} >Yes</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.buttonContainerTO} onPress={this.cancelHandler}>
            <Text style={styles.buttonContainerTextNo}>No</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  containerInstructions: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      fontSize: 20,
  },
  buttonRow: {
      flex: 0.5,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center"
  },
  buttonContainer: {
      flex: 1,
      height: 100,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
  },
  buttonContainerTO: {
      flex: 1
  },
  buttonContainerTextYes: {
    textAlign: "center",
    fontSize: 30,
    color: "red"
  },
  buttonContainerTextNo: {
      textAlign: "center",
      fontSize: 30,
      color: "green"
  }
});

export default DeletePlace;
