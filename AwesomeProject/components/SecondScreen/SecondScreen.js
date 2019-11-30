import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux'

import {
    Button, Image, StyleSheet, View,
    TouchableOpacity, Text, ScrollView, FlatList
} from 'react-native';
import _ from 'lodash';
import { PLUS, MINUS } from '../consts';



import SingleItem from '../SingleItem/SingleItem';

const BREAKFAST = 'Breakfast';
const LUNCH = 'Lunch';
const DINNER = 'Dinner';


export default class ButtonBasics extends Component {

    constructor(props) {
        super(props);
        this.state = {
            eatParts: [BREAKFAST, LUNCH, DINNER],
            breakfastMas: [],
            lunchMas: [],
            dinnerMas: []
        };
    }


    componentWillReceiveProps(nextProps) {
        if (window && window.fakeRedux && window.fakeRedux.currentMas) {
            this.setcurrentMas(window.fakeRedux.currentPage, window.fakeRedux.currentMas)
        }
    }

    handleAddEatPoint = (eatPartName) => () => {
        window.fakeRedux = {};
        window.fakeRedux.currentPage = eatPartName
        Actions.jump('search')
    }

    getCurrentMas(eatPartName) {
        const { breakfastMas, lunchMas, dinnerMas } = this.state;
        if (eatPartName == BREAKFAST) {
            return breakfastMas
        }
        if (eatPartName == LUNCH) {
            return lunchMas
        }
        if (eatPartName == DINNER) {
            return dinnerMas
        }
    }

    setcurrentMas(currentPage, currentMas) {
        if (currentPage == BREAKFAST) {
            this.setState({
                breakfastMas: _.cloneDeep(currentMas)
            })
            return
        }
        if (currentPage == LUNCH) {
            this.setState({
                lunchMas: _.cloneDeep(currentMas)
            })
            return

        }
        if (currentPage == DINNER) {
            this.setState({
                dinnerMas: _.cloneDeep(currentMas)
            });
            return

        }
    }

    delFromChoosenElements = (delElement, eatPartName) => () => {

        const choosenElements = this.getCurrentMas(eatPartName);
        const newMasWithoutDeletedElement = []
        for (let i = 0; i < choosenElements.length; i++) {
            if (choosenElements[i].id != delElement.id) {
                newMasWithoutDeletedElement.push(choosenElements[i]);
            }
        }
        this.setcurrentMas(eatPartName, newMasWithoutDeletedElement);
    }

    handleChangeChoosenItemProduct = (item, eatPartName) => (newVal) => {
        const choosenElements = this.getCurrentMas(eatPartName);

        for (let i = 0; i < choosenElements.length; i++) {
            if (choosenElements[i].id == item.id) {
                choosenElements[i].measurementVal = newVal;
            }
        }
        this.setcurrentMas(eatPartName, choosenElements);
    }

    renderNumWithValue = (measurement, title) => {
        return (
            <View
                style={styles.titleBlock}
            >
                <Text
                    style={styles.num}
                >
                    {measurement}
                </Text>

                <Text
                    style={styles.text}
                >
                    {title}
                </Text>
            </View>
        )
    }

    renderSumm(currentMas) {
        if (!currentMas || currentMas.length == 0) return;

        return (
            <View
                style={styles.resultLine}
            >
                <Text
                    style={styles.resultLineBlock}
                >
                    Summ:
                </Text>
                {this.renderNumWithValue(this.calcSummOfFiledls(currentMas, 'kkal'), 'kkal')}
                {this.renderNumWithValue(this.calcSummOfFiledls(currentMas, 'protein'), '(p)')}
                {this.renderNumWithValue(this.calcSummOfFiledls(currentMas, 'fat'), '(f)')}
                {this.renderNumWithValue(this.calcSummOfFiledls(currentMas, 'carbohydrates'), '(c)')}
            </View>

        )
    }

    calcSummOfFiledls(mas, fieldKey) {
        let summ = 0;
        for (let i = 0; i < mas.length; i++) {
            summ = summ + (mas[i][fieldKey] * mas[i].measurementVal / 100)
        }
        return summ
    }


    renderEatPart(eatPartName) {
        const currentMas = this.getCurrentMas(eatPartName)

        console.log('currentMas', currentMas)

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
                        onPress={this.handleAddEatPoint(eatPartName)}
                    >
                        <Image
                            style={styles.plus}
                            source={require('../../assets/plus.png')}
                        />
                    </TouchableOpacity>
                </View>

                <ScrollView
                    style={styles.eatList}
                >
                    {
                        currentMas.map(item => {
                            return (
                                <View
                                    style={styles.eatListItem}
                                    key={'search' + eatPartName + item.id}
                                >
                                    <SingleItem
                                        canBeEdited
                                        btnMod={MINUS}
                                        incomeItem={item}
                                        clickAction={this.delFromChoosenElements(item, eatPartName)}
                                        changeNumOfProductAcion={this.handleChangeChoosenItemProduct(item, eatPartName)}
                                    />
                                </View>
                            )
                        })
                    }
                    {this.renderSumm(currentMas)}
                </ScrollView>
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
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
        overflow: 'scroll'
    },

    eatWrapper: {
        overflow: 'scroll',

        marginTop: 20,
        marginBottom: 10,
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
        width: '100%',
    },
    eatListItem: {
        height: 60,
        display: 'flex',
        alignItems: 'center'
    },
    plus: {
        width: 50,
        height: 50,
    },
    resultLine: {
        height: 50,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10
    },
    text: {
        color: '#b6b6b6',
        marginRight: 3,
        textAlignVertical: 'bottom',
        fontSize: 10,

    },
    num: {
        color: '#747474',
        fontSize: 15,
    },
    titleBlock: {
        display: 'flex',
        flexDirection: 'row'
    },
});