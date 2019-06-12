import React, { Component } from 'react';
import { Image } from 'react-native';


export default class PressureIcon extends Component {
    render() {
        return (
            <Image style={this.props.styles} source={require('../../../assets/icons/pressure.png')} />
        );
    }
}
