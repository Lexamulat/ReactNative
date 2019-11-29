import React, { Component } from 'react';
import {
    Button, Image, StyleSheet, View, TouchableOpacity,
    Text, ScrollView, FlatList, TextInput
} from 'react-native';

import classNames from 'react-native-classnames';

import PlusMinusBtn from '../controls/PlusMinusBtn/PlusMinusBtn';


export default class SingleItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchValue: '',
            foundedElements: undefined,
            val: 200
        };
    }

    handleChangeSearchField = (searchValue) => {
        this.setState({ val: searchValue });
    }

    renderNumWithValue = (title, measurement, kkalBlock) => {

        const titleBlockClassName = classNames(styles, 'titleBlock', {
            kkalBlock: Boolean(kkalBlock)
        });


        return (
            <View
                style={titleBlockClassName}>
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


    calcNutritions(nutritionPerUnit, weight) {
        return nutritionPerUnit * weight / 100
    }

    render() {
        const { incomeItem, btnMod, canBeEdited } = this.props;
        const { val } = this.state;

        return (
            <View
                style={styles.eatListItem}
            >
                <View
                    style={styles.leftPart}
                >
                    <Text
                        style={styles.name}
                    >
                        {incomeItem.name}
                    </Text>
                    <View style={styles.itemMeasurements}>
                        {canBeEdited ?
                            <TextInput
                                placeholder="Search"
                                style={styles.mesurement}
                                onChangeText={this.handleChangeSearchField}
                                value={String(val)}
                                keyboardShouldPersistTaps='handled'
                                keyboardType={'numeric'}

                            />
                            :

                            <Text
                                style={styles.mesurement}
                            >
                                {incomeItem.measurementVal}
                            </Text>
                        }
                        <Text
                            style={styles.mesurement}
                        >
                            {incomeItem.measurementTitle}
                        </Text>
                        {this.renderNumWithValue('kkal',
                            this.calcNutritions(incomeItem.kkal, incomeItem.measurementVal), true)}
                        {this.renderNumWithValue('(p)',
                            this.calcNutritions(incomeItem.protein, incomeItem.measurementVal))}
                        {this.renderNumWithValue('(f)',
                            this.calcNutritions(incomeItem.fat, incomeItem.measurementVal))}
                        {this.renderNumWithValue('(c)',
                            this.calcNutritions(incomeItem.carbohydrates, incomeItem.measurementVal), undefined, true)}
                    </View>
                </View>
                <View
                    style={styles.rightPart}

                >
                    <TouchableOpacity
                        onPress={this.props.clickAction}
                    >
                        <PlusMinusBtn
                            incomeMod={btnMod}
                        />

                    </TouchableOpacity>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    eatListItem: {
        width: '100%',
        padding: 5,
        height: 60,
        display: 'flex',
        flexDirection: 'row',
        borderBottomColor: '#d5d5d5',
        borderBottomWidth: 2,
    },
    leftPart: {
        display: 'flex',
        flexDirection: 'column',
        width: '90%',
        height: '100%'
    },
    rightPart: {
        width: '10%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    name: {
        fontSize: 17,
    },
    mesurement: {
        color: '#339f79',
    },
    titleBlock: {
        display: 'flex',
        flexDirection: 'row'
    },
    kkalBlock: {
        marginLeft: 20,
        marginRight: 20,

    },
    kkal: {

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
    dividerLine: {
        color: '#575757',
    },
    itemMeasurements: {
        marginTop: 5,
        display: 'flex',
        flexDirection: 'row',

    },
});