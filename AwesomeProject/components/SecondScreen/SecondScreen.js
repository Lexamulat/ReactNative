import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux'

import {
    Button, Image, StyleSheet, View,
    TouchableOpacity, Text, ScrollView, FlatList
} from 'react-native';

export default class ButtonBasics extends Component {

    constructor(props) {
        super(props);
        this.state = {
            eatParts: ['Breakfast', 'Lunch', 'Dinner']
        };
    }


    handleAddEatPoint() {
        console.log('click')
        Actions.jump('search')
    }

    renderEatPart(eatPartName) {
        return (
            <View
                style={styles.eatWrapper}
                key={eatPartName}
            >
                <View
                    style={styles.btnClass}
                >
                    <Text
                        style={styles.eatName}
                    >
                        {eatPartName}
                    </Text>

                    <TouchableOpacity
                        onPress={this.handleAddEatPoint}

                    >
                        <Image

                            style={styles.plus}
                            source={require('../../assets/plus.png')}
                        />
                    </TouchableOpacity>
                </View>

                <FlatList
                    style={styles.eatList}
                    data={[
                        { key: 'Devin' },
                        { key: 'Dan' },
                        { key: 'Dominic' },
                        { key: 'Jackson' },
                    ]}
                    renderItem={({ item }) => <View
                        style={styles.eatListItem}
                    >
                        <Text>{item.key}</Text>
                    </View>}
                />
            </View>
        )
    }

    render() {
        const eatParts = this.state.eatParts;

        return (
            <ScrollView>
                <View style={styles.container}>
                    {eatParts.map(eatPartName => {
                        return this.renderEatPart(eatPartName)
                    })}
                </View>
            </ScrollView>
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

    eatWrapper: {
        overflow: 'scroll',

        marginTop: 20,
        marginBottom: 10,
        // height: 100,
        // flex:1,
        width: '85%',
        display: 'flex',
        flexDirection: 'column',
        display: 'flex',
        alignItems: 'center',

        borderRadius: 4,
        borderWidth: 0.1,
        borderColor: '#d6d7da',
        padding: 0.1,

        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 0.1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 1,

        elevation: 2.5,
        padding: 2.5,
    },

    btnClass: {
        height: 50,
        width: '100%',
        color: 'black',
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },

    eatName: {
        fontWeight: '900',
        paddingLeft: 10,
        fontSize: 20,
    },
    eatList: {
        overflow: 'scroll',
    },
    eatListItem: {
        height: 50
    },
    plus: {
        width: 50,
        height: 50,
    }
});