import React, { Component } from 'react';
import { View, Image, Button, StyleSheet, TouchableOpacity, Text} from 'react-native';
import ImagePicker from 'react-native-image-picker';

class PickImage extends Component {
    state = {
        pickedImage: null
    }

    reset = () => {
        this.setState({
            pickedImage: null
        });
    }

    pickImageHandler = () => {
        console.log("in pickImageHandler")
        ImagePicker.showImagePicker({
            title: "Pick an Image",
            maxWidth: 800,
            maxHeight: 600
        },
        // ImagePicker.launchCamera({
        //     title: "",
        // },
        res => {
            if(res.didCancel){
                console.log("User cancelled")
            } else if (res.error){
            } else {
                this.setState({
                    pickedImage: { uri: res.uri }
                });
                this.props.onImagePicked({ uri: res.uri, base64: res.data })
            }
        });
    }

    render() {
        return (
            <View style={styles.container}>
            <View style={styles.placeholder}>
                <Image source={this.state.pickedImage} style={styles.previewImage}/>
            </View>
            <View style={styles.buttonView}>
                {/* <Button title="Take a photo" onPress={this.pickImageHandler}/> */}
                    <TouchableOpacity
                        style={styles.buttonTO}
                        onPress={
                            this.pickImageHandler
                        }>
                        <Text style={styles.buttonText}>Take a photo</Text>
                    </TouchableOpacity>
            </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: "center"
    },
    placeholder: {
        borderWidth: 1,
        borderColor: "black",
        backgroundColor: "#eee",
        width: "90%",
        height: 150
    },
    buttonView: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: 'center',
        margin: 10,
        padding: 10,
        width: "90%",
        height: "auto",
        borderRadius: 25,
        borderWidth: 1,
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
    previewImage: {
        width: "100%",
        height: "100%"
    }
});

export default PickImage;