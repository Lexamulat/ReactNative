import React, { Component } from 'react';
import {
    Button, Image, StyleSheet, View, TouchableOpacity,
    Text, ScrollView, FlatList, TextInput
} from 'react-native';

import SingleItem from '../SingleItem/SingleItem';


import requestHelper from '../helpers/requestHelper'

const SEND_REQUEST_TIMEOUT = 500;

export default class SearchScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchValue: '',
            foundedElements: undefined
        };
    }

    componentWillUnmount() {
        clearTimeout(this.timeout)

    }

    handleChangeSearchField = (searchValue) => {
        this.setState({ searchValue });
        this.refreshRequestTimeout()
    }

    refreshRequestTimeout = () => {
        clearTimeout(this.timeout)
        this.timeout = setTimeout(this.makeRequest, SEND_REQUEST_TIMEOUT)
    }
    makeRequest = () => {
        const { searchValue } = this.state;
        requestHelper('/', this.setResult, [{ key: 'name', value: 'курица' }])
    }
    setResult = (result) => {
        if (result) {
            this.setState({ foundedElements: result })
        }
    }

    renderFoundedElements = () => {
        const { foundedElements } = this.state;
        if (!foundedElements || foundedElements.length == 0) return
        return (
            <FlatList
                style={styles.eatList}
                data={foundedElements}
                keyExtractor={item => String(item.id)}
                renderItem={({ item }) => {
                    return (
                        <SingleItem
                            incomeItem={item}
                        />
                    )

                }}
            />
        )
    }

    render() {
        const { searchValue } = this.state;
        return (
            <View
                style={styles.container}
            >
                <View
                    style={styles.searchFieldWrapper}
                >

                    <TextInput
                        placeholder="Search"
                        style={styles.searchField}
                        onChangeText={this.handleChangeSearchField}
                        value={searchValue}
                    />
                </View >
                {this.renderFoundedElements()}

            </View>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

    },
    searchFieldWrapper: {
        paddingLeft: 3,
        marginTop: 10,
        width: '95%',
        height: 50,
        backgroundColor: 'white',

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

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

    },
    searchField: {
        width: '95%',
        height: '100%',
        backgroundColor: 'white'
    },
    eatList: {
        marginTop: 10,
        width: '95%',
        backgroundColor: '#f9f9f9'

    },
    eatListItem: {
        width: '100%',
        padding: 5,
        height: 60,
        display: 'flex',
        flexDirection: 'column',
        borderBottomColor: '#d5d5d5',
        borderBottomWidth: 2,
    },
    name: {
        fontSize: 17,
    },
    mesurement: {
        color: '#339f79',
    },
    kkalBlock: {
        marginLeft: 10,
        marginRight: 10,
        display: 'flex',
        flexDirection: 'row'
    },
    kkal: {

    },
    text: {
        color: '#b6b6b6',
    },
    num: {
        color: '#9a9a9a',

    },
    itemMeasurements: {
        marginTop: 5,
        display: 'flex',
        flexDirection: 'row',

    }
});