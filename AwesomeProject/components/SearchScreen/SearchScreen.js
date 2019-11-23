import React, { Component } from 'react';
import { Button, Image, StyleSheet, View, TouchableOpacity, Text, ScrollView, FlatList } from 'react-native';

export default class SearchScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {

        return (
            <View >
                <Text> search</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        // flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
        overflow: 'scroll'
    },
});