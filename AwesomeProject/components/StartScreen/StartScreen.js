import React, { Component } from 'react';
import { Button, StyleSheet, View, Image, ImageBackground } from 'react-native';

import { Actions } from 'react-native-router-flux'

export default class StartScreen extends Component {
    _onPressButton() {
        Actions.jump('day')
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground
                    style={styles.images}
                    source={require('../../assets/fon2.jpg')}
                />
                <View
                    style={styles.calcBtn}

                >

                    <Button
                        onPress={this._onPressButton}
                        title="Calculate calories"

                    />
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
    },

    images: {
        flex: 1,
        resizeMode: 'cover'

    },
    calcBtn: {
        position: 'absolute',
        bottom: '7%',
        left: '30%',
    }

});