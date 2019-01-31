import React from 'react';
import { TouchableHighlight, Text, View, StyleSheet } from 'react-native';

const buttonWithBackground = props => (
    <TouchableHighlight onPress={props.onPress}>
        <View style={[styles.button, {backgroundColor: props.color}]}>
            <Text>{props.children}</Text>
        </View>
    </TouchableHighlight>
);

const styles = StyleSheet.create({
    button: {
        padding: 10,
        margin: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "black"
    }
});

export default buttonWithBackground;