import React, { Component } from 'react';
import { Button, StyleSheet, View } from 'react-native';

export default class ButtonBasics extends Component {
    _onPressButton() {
        return fetch('http://192.168.0.107:3000')
            .then((response) => {
                console.log('response', response)
            })
            .then((responseJson) => {
                // console.log('responseJson', responseJson)
                // alert(responseJson.movies[0].title)
                // return responseJson.movies;
                alert(responseJson)
            })
            .catch((error) => {
                console.error(error);
            });

    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.buttonContainer}>
                    <Button
                        onPress={this._onPressButton}
                        title="Press Me"
                    />
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    buttonContainer: {
        margin: 20
    },
    alternativeLayoutButtonContainer: {
        margin: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});