import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  // Button,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions,
  Linking,
  // WebView,
  Modal
} from "react-native";
import { connect } from "react-redux";
import MapView from "react-native-maps";

// import ImageViewer from "react-native-image-zoom-viewer";

import Icon from "react-native-vector-icons/Ionicons";
import { deletePlace } from "../../store/actions/index";
import DeletePlace from "../../components/DeletePlace/DeletePlace";

class PlaceDetail extends Component {
  state = {
    viewMode: "portrait",
    showModal: false,
    showDeleteModal: false
  };

  constructor(props) {
    super(props);
    Dimensions.addEventListener("change", this.updateStyles);
  }

  updateStyles = dims => {
    this.setState(prevState => {
      return {
        ...prevState,
        viewMode: dims.window.height > 500 ? "portrait" : "landscape"
      };
    });
  };

  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.updateStyles);
  }

  placeDeletedHandler = () => {
    this.props.onDeletePlace(this.props.selectedPlace.key);
    this.props.navigator.pop();
  };
  render() {
    return (
      <View
        style={[
          styles.container,
          this.state.viewMode === "portrait"
            ? styles.portraitContainer
            : styles.landscapeContainer
        ]}
      >
        <Modal
          visible={this.state.showModal}
          transparent={false}
          onRequestClose={() => {
            this.setState(prevState => {
              return { ...prevState, showModal: false };
            });
          }}
        >
          <Image
            source={this.props.selectedPlace.image}
            style={{
              position: "absolute",
              top: 115,
              left: -136,
              transform: [{ rotate: '90deg' }],
              // alignSelf: "center",
              width: Dimensions.get('window').height,
              height: Dimensions.get('window').width,
              }}
          />
        </Modal>
        <Modal
          visible={this.state.showDeleteModal}
          transparent={false}
          onRequestClose={() => {
            this.setState(prevState => {
              return { ...prevState, showDeleteModal: false };
            });
          }}
        >
        <DeletePlace 
          delete={this.placeDeletedHandler}
          removeModalOverlay={() => {
            this.setState((prevState) => { 
              return { 
                ...prevState, 
                showDeleteModal: false
                }
                })
            }}
        />
        </Modal>
        <View style={styles.placeDetailContainer}>
          <View style={styles.subContainer}>
          <Text style={styles.placeDetailText}>Click image to enlarge</Text>
            <TouchableOpacity
              onPress={() => {
                this.setState(prevState => {
                  return { ...prevState, showModal: true };
                });
              }}
              style={{ flex: 1 }}
            >
              <Image
                source={this.props.selectedPlace.image}
                style={styles.placeImage}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.subContainer}>
            <Text style={styles.placeDetailText}>Click map to open in maps</Text>
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => {
                Linking.openURL(
                  "https://www.google.com/maps/search/?api=1&query=" +
                    this.props.selectedPlace.location.latitude +
                    "," +
                    this.props.selectedPlace.location.longitude
                )
                  .then(() => {
                    console.log("linking fired");
                  })
                  .catch(err => {
                    console.log(err);
                  });
              }}
            >
              <MapView
                initialRegion={{
                  ...this.props.selectedPlace.location,
                  latitudeDelta: 0.0122,
                  longitudeDelta:
                    (Dimensions.get("window").width /
                      Dimensions.get("window").height) *
                    0.0122
                }}
                style={[
                  styles.map,
                  {
                    width: Dimensions.get("window").width - 45,
                    height: Dimensions.get("window").height / 3 - 25
                  }
                ]}
              >
                <MapView.Marker
                  coordinate={this.props.selectedPlace.location}
                />
              </MapView>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.subContainer}>
          {/* <View>
            <Text style={styles.placeName}>{this.props.selectedPlace.name}</Text>
          </View> */}

          <View style={styles.deleteContainer}>
            <Text style={styles.placeDetailDeleteText}>Delete {this.props.selectedPlace.name}</Text>
            <TouchableOpacity onPress={() => {this.setState((prevState) => { return { ...prevState, showDeleteModal: true} } ) } } >
              <View style={styles.deleteButton}>
                <Icon
                  name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
                  size={30}
                  color="red"
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 22
  },
  portraitContainer: {
    flexDirection: "column"
  },
  landscapeContainer: {
    flexDirection: "row"
  },
  placeDetailContainer: {
    flex: 3
  },
  placeImage: {
    height: "100%",
    width: "100%"
  },
  placeName: {
    fontWeight: "bold",
    fontSize: 26,
    textAlign: "center"
  },
  placeDetailText: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    color: 'orange',
    fontSize: 16
  },
  placeDetailDeleteText:{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    color: 'red',
    fontSize: 16
  },
  map: {
    flex: 1,
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: 100,
    height: 100
    // ...StyleSheet.absoluteFillObject
  },
  deleteButton: {
    alignItems: "center"
  },
  subContainer: {
    flex: 1
  },
  deleteContainer: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end"
  }
});

const mapDispatchToProps = dispatch => {
  return {
    onDeletePlace: key => dispatch(deletePlace(key))
  };
};

export default connect(null, mapDispatchToProps)(PlaceDetail);
