import React, { Component } from 'react';
import { Image } from 'react-native';


export default class GpsIcon extends Component {
    render() {
        return (
            <Image style={this.props.styles} source={require('../../../assets/icons/gps.png')} />
        );
    }
}
