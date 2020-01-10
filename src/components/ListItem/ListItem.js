import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions
} from "react-native";

import MapView from "react-native-maps";

const listItem = (props) => {
    return (
      <TouchableOpacity onPress={props.onItemPressed}>
        <View style={styles.listItem}>
          <View style={styles.topRow}>
            <Text style={styles.topRowText}>{props.placeName}</Text>
            <Text>{props.placeCountry}</Text>
          </View>
          <View style={styles.bottomRow}>
            <Image
              source={props.placeImage}
              style={[
                styles.placeImage,
                { height: Dimensions.get("window").width / 2.1 }
              ]}
            />
            <View style={styles.mapContainer} pointerEvents="none">
              <MapView
                initialRegion={{
                  ...props.placeLocation,
                  latitudeDelta: 0.0922,
                  longitudeDelta:
                    (Dimensions.get("window").width /
                      Dimensions.get("window").height) *
                    0.0122
                }}
                style={styles.map}
              >
                <MapView.Marker coordinate={props.placeLocation} />
              </MapView>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
  listItem: {
    width: "100%",
    height: "auto",
    padding: 10,
    backgroundColor: "#eee",
    marginBottom: 5,
    flexDirection: "column",
    alignItems: "center"
  },
  topRow: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  topRowText: {
    display: "flex",
    width: "50%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  bottomRow: {
    display: "flex",
    flex: 1,
    flexDirection: "row"
  },
  placeImage: {
    flex: 1,
    marginRight: 8,
    height: "auto",
    width: 30
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  mapContainer: {
    flex: 1,
    height: "100%",
    
  }
});

export default listItem;
