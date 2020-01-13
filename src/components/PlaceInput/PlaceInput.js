import React, { Component } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

import DefaultInput from "../UI/DefaultInput/DefaultInput";

const placeInput = props => (
  <DefaultInput
    placeholder="Name Vista ..."
    value={props.placeData.value}
    valid={props.placeData.valid}
    touched={props.placeData.touched}
    onChangeText={props.onChangeText}
    style={{
      width: "90%",
      paddingLeft: 10,
      height: 50,
      fontSize: 16,
    }}
  />
);

export default placeInput;
