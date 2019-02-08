import { Navigation } from "react-native-navigation";
import { Provider } from "react-redux";

import AuthScreen from "./src/screens/Auth/Auth";
import SharePlaceScreen from "./src/screens/SharePlace/SharePlace";
import FindPlaceScreen from "./src/screens/FindPlace/FindPlace";
import PlaceDetailsScreen from "./src/screens/PlaceDetail/PlaceDetail";
import SideDrawerScreen from "./src/screens/SideDrawer/SideDrawer";

import configureStore from "./src/store/configureStore";
const store = configureStore();

// Register Screens
Navigation.registerComponent(
  "react-native-place-finder-app.AuthScreen",
  () => AuthScreen,
  store,
  Provider
);
Navigation.registerComponent(
  "react-native-place-finder-app.SharePlaceScreen",
  () => SharePlaceScreen,
  store,
  Provider
);
Navigation.registerComponent(
  "react-native-place-finder-app.FindPlaceScreen",
  () => FindPlaceScreen,
  store,
  Provider
);
Navigation.registerComponent(
  "react-native-place-finder-app.PlaceDetailsScreen",
  () => PlaceDetailsScreen,
  store,
  Provider
);
Navigation.registerComponent(
  "react-native-place-finder-app.SideDrawerScreen",
  () => SideDrawerScreen,
  store,
  Provider
);

// Start a App
Navigation.startSingleScreenApp({
  screen: {
    screen: "react-native-place-finder-app.AuthScreen",
    title: "Login"
  }
});
