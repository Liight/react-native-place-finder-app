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
            <Text style={styles.topRowText}>{props.placeCountry}</Text>
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
    paddingBottom: 20,
    backgroundColor: "#F9F9F9",
    marginBottom: 0,
    flexDirection: "column",
    alignItems: "center",
    borderRadius: 0,
    borderWidth: 0.5,
    borderColor: "orange"
  },
  topRow: {
    display: "flex",
    width: "100%",
    height: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  topRowText: {
    display: "flex",
    width: "50%",
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    color: 'orange',
    fontSize: 16
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
