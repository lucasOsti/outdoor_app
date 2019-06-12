import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import GpsIcon from './icons/gps';
import PressureIcon from './icons/pressure';
import AltitudeIcon from './icons/altitude';

export default class Icon extends Component {

    selectIcon = (icon, styles) => {
        switch(icon) {
          case 'gps':
            return <GpsIcon styles={styles.image} />
          case 'pressure':
            return <PressureIcon styles={styles.image} />
          case 'altitude':
            return <AltitudeIcon styles={styles.image} />
          default:
            return <Text>deafult</Text>;
        }
    }


    render() {
        return (
            <View style={styles.container}>
                {this.selectIcon(this.props.icon, styles)}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: 60,
        height: 60,
        borderRadius: 60,
        backgroundColor: (this.props.bgColor ? '#' + this.props.bgColor : '#FFFFFF'),
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation:5,
    },
    image: {
        width: 35,
        height: 35
    }
});
