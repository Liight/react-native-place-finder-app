import React from 'react';
import { View, TextInput, Button, StyleSheet} from 'react-native';

const userInput = (props) => {
    return (
        <View style={styles.inputContainer}>
          <TextInput 
              style={{width: 300}}
              placeholder="Enter a place name"
              value={props.placeName} 
              onChangeText={props.textChanged} 
              style={styles.placeInput}
            />
          <Button 
            title="Add"
            onPress={props.buttonClicked}
            style={styles.placeButton}
          ></Button>
        </View> 
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        // flex: 1,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    placeInput: {
        width: "70%"
    },
    placeButton: {
        width: "30%"
    }
})

export default userInput;