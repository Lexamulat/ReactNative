import React, { Component } from 'react';
import {
    Image, StyleSheet, TouchableOpacity,

} from 'react-native';

import classNames from 'react-native-classnames';

import { PLUS, MINUS } from '../../consts';


export default class PlusMinusBtn extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }


    render() {
        const { incomeMod } = this.props;

        if (incomeMod == MINUS) {
            return (
                <Image
                    style={styles.icon}
                    source={require('../../../assets/minus.png')}
                />
            )
        }

        return (
            <Image

                style={styles.icon}
                source={require('../../../assets/plus.png')}
            />
        )

        // return (
        //     <TouchableOpacity
        //         style={styles.plus}

        //     >
        //         {incomeMod == PLUS ? <Image

        //             style={styles.icon}
        //             source={require('../../../assets/plus.png')}
        //         />
        //             :
        //             <Image
        //                 style={styles.icon}
        //                 source={require('../../../assets/minus.png')}
        //             />
        //         }
        //     </TouchableOpacity>
        // );
    }
}

const styles = StyleSheet.create({
    icon: {
        width: 50,
        height: 50,
    }
});