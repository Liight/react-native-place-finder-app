import React from "react";
import {  View, Image, Text, Button, StyleSheet , TouchableOpacity} from "react-native";

import Icon from 'react-native-vector-icons/Ionicons';

const placeDetail = props => {

  return (
      <View style={styles.container}>
              <View>
        <Image source={props.selectedPlace.image} style={styles.placeImage} />
        <Text style={styles.placeName}>{props.selectedPlace.name}</Text>
      </View>
        <View>
          <TouchableOpacity onPress={props.onItemDeleted}>
            <View style={styles.deleteButton}>
              <Icon name="ios-trash" size={30} color="red" />
            </View>
          </TouchableOpacity>
          <Button title="Close" onPress={props.onModalClosed}/>
        </View>
      </View>
  );
};

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

export default placeDetail;
