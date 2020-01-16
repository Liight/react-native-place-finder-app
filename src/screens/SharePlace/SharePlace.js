import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";

import { addPlace } from "../../store/actions/index";
// import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import PlaceInput from "../../components/PlaceInput/PlaceInput";
import MainText from "../../components/UI/MainText/MainText";
import HeadingText from "../../components/UI/HeadingText/HeadingText";
import imagePlaceholder from "../../assets/image.jpg";
import PickLocation from "../../components/PickLocation/PickLocation";
import PickImage from "../../components/PickImage/PickImage";
import validate from "../../utility/validation";
import { startAddPlace } from "../../store/actions/index";
// Geos
import Geocoder from "react-native-geocoding";
import * as secrets from "../../secret/secret";
Geocoder.init(secrets.API_KEY_GEO);

class SharePlaceScreen extends Component {
  static navigatorStyle = {
    navBarButtonColor: "orange"
  };

  state = {};

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  componentWillMount() {
    this.reset();
  }

  reset = () => {
    this.setState({
      country: "",
      controls: {
        placeName: {
          value: "",
          valid: false,
          touched: false,
          validationRules: {
            notEmpty: true
          }
        },
        location: {
          value: null,
          valid: false
        },
        image: {
          value: null,
          valid: false
        }
      }
    });
  };

  componentDidUpdate() {
    if (this.props.placeAdded) {
      this.props.navigator.switchToTab({ tabIndex: 0 });
    }
  }

  onNavigatorEvent = event => {
    console.log(event);
    if (event.type === "ScreenChangedEvent") {
      if (event.id === "willAppear") {
        this.props.onStartAddPlace();
      }
    }
    if (event.type === "NavBarButtonPress") {
      if (event.id === "sideDrawerToggle") {
        this.props.navigator.toggleDrawer({
          side: "left"
        });
      }
    }
  };

  placeNameChangedHandler = val => {
    this.setState(prevState => {
      return {
        ...prevState,
        controls: {
          ...prevState.controls,
          placeName: {
            ...prevState.controls.placeName,
            value: val,
            valid: validate(val, prevState.controls.placeName.validationRules),
            touched: true
          }
        }
      };
    });
  };

  locationPickedHandler = location => {
    console.log("locationPickedHandler Fired");
    this.geoDecodeHandler(location).then(res => {
      this.setState(prevState => {
        return {
          ...prevState,
          controls: {
            ...prevState.controls,
            location: {
              value: location,
              valid: true
            }
          }
        };
      })
    }).catch(err => {
      console.log(err);
    });;
  };

  imagePickedHandler = image => {
    this.setState(prevState => {
      return {
        ...prevState,
        controls: {
          ...prevState.controls,
          image: {
            value: image,
            valid: true
          }
        }
      };
    });
  };

  placeAddedHandler = () => {

    // Validation Check
    const checkStateForValidation =
      !this.state.controls.placeName.valid ||
      !this.state.controls.location.valid ||
      !this.state.controls.image.valid;
    if (checkStateForValidation) {
      // alert("True"+checkStateForValidation)
    } else {
      // alert("False"+checkStateForValidation)m
    }

    this.props.onAddPlace(
      this.state.controls.placeName.value,
      this.state.controls.location.value,
      this.state.controls.image.value,
      this.state.country

    );
    this.reset();
    this.imagePicker.reset();
    this.locationPicker.reset();
  };

  geoDecodeHandler = async coords => {
    let country = "";
    Geocoder.from(coords)
      .then(res => {
        console.log("response: " + Object.keys(res));
        if (res.results) {
          console.log(res.results);
          if (Array.isArray(res.results)) {
            console.log("Found array");
            console.log(res.results[res.results.length - 1].formatted_address);
            country = res.results[
              res.results.length - 1
            ].formatted_address.toString();
            console.log(country);

            // Update State
            this.setState(prevState => {
              return {
                ...prevState,
                country: country
              };
            });
          }
        } else {
          console.log("no results");
        }
      })
      .catch(err => {
        console.log(err);
      });
    // Update State
    this.setState(prevState => {
      return {
        ...prevState,
        country: country
      };
    },(()=>{console.log('setstate callback: ' + this.state)}));
  };

  render() {
    let checkValidity = !this.state.controls.placeName.valid ||
      !this.state.controls.location.valid ||
      !this.state.controls.image.valid;
    let checkViewStyles = checkValidity ? styles.disabledView : styles.buttonView
    let checkTOStyles = checkValidity ? styles.disabledTO : styles.buttonTO
    let checkTextStyles = checkValidity ? styles.disabledText : styles.buttonText
    let submitButton = (
      <TouchableOpacity
        style={checkTOStyles}
        onPress={
          this.placeAddedHandler
          }>
        <Text style={[styles.buttonText, checkTextStyles]}>Share the Vista!</Text>
      </TouchableOpacity>
    );
    if (this.props.isLoading) {
      submitButton = <ActivityIndicator />;
    }
    return (
      <KeyboardAvoidingView>
        <View>
          <ScrollView>
            <View style={styles.container}>
              <MainText>
                <HeadingText>Share a Vista with us!</HeadingText>
              </MainText>
              <PickImage
                onImagePicked={this.imagePickedHandler}
                ref={ref => (this.imagePicker = ref)}
              />
              <PickLocation
                onLocationPick={this.locationPickedHandler}
                ref={ref => (this.locationPicker = ref)}
              />
              <PlaceInput
                placeData={this.state.controls.placeName}
                onChangeText={this.placeNameChangedHandler}
              />
              <View style={[styles.buttonView, checkViewStyles]}>{submitButton}</View>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  placeholder: {
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#eee",
    width: "80%",
    height: 150
  },
  buttonView: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: 'center',
    margin: 0,
    padding: 10,
    width: "90%",
    height: "auto",
    borderRadius: 25,
    borderWidth: 0.5,
    borderColor: "orange",
    color: "orange",
  },
  buttonTO: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: 0,
    width: "90%",
    height: 30,
    padding: 0,
  },
  buttonText: {
    fontSize: 20,
    color: "orange"
  },
  disabledView: {
    backgroundColor: "#EEEEEE",
    color: "#A1A1A1",
    borderColor: "#A1A1A1",
  },
  disabledTO: {
    backgroundColor: "#EEEEEE",
  },
  disabledText: {
    color: "#A1A1A1",
  },
  previewImage: {
    width: "100%",
    height: "100%"
  }
});

const mapStateToProps = state => {
  return {
    isLoading: state.ui.isLoading,
    placeAdded: state.places.placeAdded
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddPlace: (placeName, location, image, country) =>
      dispatch(addPlace(placeName, location, image, country)),
    onStartAddPlace: () => dispatch(startAddPlace())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SharePlaceScreen);
