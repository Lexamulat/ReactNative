import React, { Component } from 'react';
import {
    Button, Image, StyleSheet, View, TouchableOpacity,
    Text, ScrollView, FlatList, TextInput
} from 'react-native';

import classNames from 'react-native-classnames';

export default class SingleItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchValue: '',
            foundedElements: undefined
        };
    }

    renderNumWithValue = (title, measurement, kkalBlock, lastItem) => {
        const titleBlockClassName = classNames(styles, 'titleBlock', {
            kkalBlock: Boolean(kkalBlock)
        }
        );
        return (
            <View
                style={titleBlockClassName}>
                <Text
                    style={styles.text}
                >
                    {title}
                </Text>
                <Text
                    style={styles.num}
                >
                    {measurement}
                </Text>
                {!(lastItem || kkalBlock) && <Text
                    style={styles.dividerLine}
                >
                    /
                </Text>
                }
            </View>
        )
    }

    render() {
        const { incomeItem } = this.props;

        return (
            <View
                style={styles.eatListItem}
            >
                <Text
                    style={styles.name}

                >{incomeItem.name}</Text>
                <View style={styles.itemMeasurements}>
                    <Text
                        style={styles.mesurement}
                    >{incomeItem.measurement}</Text>
                    {this.renderNumWithValue('kkal', incomeItem.kkal, true)}
                    {this.renderNumWithValue('pr.', incomeItem.protein)}
                    {this.renderNumWithValue('fat', incomeItem.fat)}
                    {this.renderNumWithValue('carb.', incomeItem.carbohydrates, undefined, true)}
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
        marginRight: 3
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

    }
});