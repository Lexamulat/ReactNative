import React, { Component } from 'react';
import {
    Button, Image, StyleSheet, View, TouchableOpacity,
    Text, ScrollView, FlatList, TextInput, Keyboard
} from 'react-native';
import { Actions } from 'react-native-router-flux'
import _ from 'lodash';

import SingleItem from '../SingleItem/SingleItem';


import requestHelper from '../helpers/requestHelper'
import { PLUS, MINUS } from '../consts';


const SEND_REQUEST_TIMEOUT = 500;

export default class SearchScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchValue: '',
            foundedElements: undefined,
            choosenElements: [],
        };
    }

    componentWillUnmount() {
        clearTimeout(this.timeout)
    }

    addToChoosenElements = (newElement) => () => {
        Keyboard.dismiss();
        const { choosenElements } = this.state;

        this.setState({
            choosenElements: this.tryToStackValue(newElement, choosenElements)
        });
    }

    delFromChoosenElements = (delElement) => () => {

        const newMasWithoutDeletedElement = []
        const { choosenElements } = this.state;
        for (let i = 0; i < choosenElements.length; i++) {
            if (choosenElements[i].id != delElement.id) {
                newMasWithoutDeletedElement.push(choosenElements[i]);
            }
        }
        this.setState({
            choosenElements: newMasWithoutDeletedElement
        })
    }

    tryToStackValue(pushedElement, mas) {
        if (!mas || mas.length == 0) {
            return [pushedElement]
        }

        for (let i = 0; i < mas.length; i++) {
            if (mas[i].id == pushedElement.id) {
                mas[i].measurementVal = mas[i].measurementVal + pushedElement.measurementVal;
                return mas
            }
        }
        mas.push(pushedElement);
        return mas
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
    handleChangeChoosenItemProduct = (item) => (newVal) => {
        const { choosenElements } = this.state;
        for (let i = 0; i < choosenElements.length; i++) {
            if (choosenElements[i].id == item.id) {
                choosenElements[i].measurementVal = newVal;
            }
        }
        this.setState({
            choosenElements: _.cloneDeep(choosenElements)
        })
    }

    handleSave = () => {
        const { choosenElements } = this.state;

        console.log('save', choosenElements);
        console.log('clone', _.cloneDeep(choosenElements));
        window.fakeRedux.currentMas = _.cloneDeep(choosenElements);
        Actions.jump('day')

    }

    renderFoundedElements = () => {
        const { foundedElements, choosenElements } = this.state;

        if (!foundedElements || foundedElements.length == 0) return
        return (
            <View
                style={styles.listsWrapper}
            >
                {choosenElements.length != 0 &&
                    <View
                        style={styles.choosenBoxWrapper}
                    >
                        <ScrollView
                            style={styles.choosenEatsList}
                        >
                            {choosenElements.map(item => {
                                return (
                                    <View
                                        key={'search' + item.id}
                                    >
                                        <SingleItem
                                            canBeEdited
                                            btnMod={MINUS}
                                            incomeItem={item}
                                            clickAction={this.delFromChoosenElements(item)}
                                            changeNumOfProductAcion={this.handleChangeChoosenItemProduct(item)}

                                        />
                                    </View>
                                )
                            })}
                        </ScrollView>
                        <View
                            style={styles.saveBtnWrapper}
                        >
                            <TouchableOpacity
                                onPress={this.handleSave}
                            >
                                <Text
                                    style={styles.saveText}
                                >
                                    Save
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }

                <ScrollView
                    style={styles.eatList}
                    keyboardShouldPersistTaps='handled'
                >
                    {foundedElements.map(item => {
                        return (
                            <View
                                key={'search' + item.id}
                            >
                                <SingleItem
                                    btnMod={PLUS}
                                    incomeItem={item}
                                    clickAction={this.addToChoosenElements(item)}
                                />
                            </View>
                        )
                    })}
                </ScrollView>

            </View>
        )
    }

    render() {
        const { searchValue } = this.state;
        return (
            <View
                style={styles.container}
            >
                <View
                    style={styles.searchFieldWrapper}>
                    <TextInput
                        placeholder="Search"
                        style={styles.searchField}
                        onChangeText={this.handleChangeSearchField}
                        value={searchValue}
                        keyboardShouldPersistTaps='handled'
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
        height: '100%',
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
    listsWrapper: {
        width: '95%',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    eatList: {
        marginTop: 10,
        width: '100%',
        backgroundColor: '#f9f9f9',
    },
    choosenBoxWrapper: {
        width: '100%',
        height: 250,
        display: 'flex',
        flexDirection: 'column'
    },
    choosenEatsList: {
        height: 200,
        width: '100%',
        backgroundColor: '#f9f9f9'
    },
    saveBtnWrapper: {
        height: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    eatListItem: {
        flex: 1,
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
        borderRadius: 4,

    },
    textWrap: {
        height: 20,
        width: 50,
    },
    saveText: {
        height: 25,
        width: 60,
        textAlign: 'center',
        textAlignVertical: 'center',
        color: '#ffffff9c',
        backgroundColor: '#37B198',
        borderRadius: 10,
    }
});