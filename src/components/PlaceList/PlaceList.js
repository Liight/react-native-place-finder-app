import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

import ListItem from "../ListItem/ListItem";

const placeList = props => {
    console.log(props)
  return (
    <FlatList
        style={styles.listContainer}
        data={props.places}
        renderItem={(info) => (
            <ListItem
                placeName={info.item.name}
                placeImage={info.item.image}
                placeLocation={info.item.location}
                placeCountry={info.item.country}
                onItemPressed={() => props.onItemSelected(info.item.key)}
            />
        )}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    width: "100%"
  }
});

export default placeList;
