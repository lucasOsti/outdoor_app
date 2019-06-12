import React, { Component } from 'react';
import { Image } from 'react-native';


export default class AltitudeIcon extends Component {
    render() {
        return (
            <Image style={this.props.styles} source={require('../../../assets/icons/altitude.png')} />
        );
    }
}
