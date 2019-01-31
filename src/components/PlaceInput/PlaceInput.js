import React from 'react';
// import { View, TextInput, Button, StyleSheet} from 'react-native';

import DefaultInput from "../UI/DefaultInput/DefaultInput.js";

placeInput = props => (
  <DefaultInput 
    placeholder="Place Name" 
    value={props.placeName} 
    onChangeText={props.onChangeText}

    />
);

export default placeInput;