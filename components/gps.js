import React, { Component } from 'react';
import {
    Alert, 
    PermissionsAndroid, 
    StyleSheet,
    Text, 
    View 
} from 'react-native';
import { connect } from 'react-redux';

import Icon from './common/icon';
import { gpsChange } from '../actions/sensors';


class Gps extends Component {

    async componentDidMount() {
        const { dispatch } = this.props;

        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: 'Allow gps permission!',
                message: 'Allow gps permission!'
            }
        )

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            if (navigator.geolocation) {
                navigator.geolocation.watchPosition(
                    (position) => {
                        dispatch(gpsChange(position.coords));
                    }, 
                    (error) => {
                        Alert.alert('Geolocation failed')
                    }, 
                { maximumAge: 60000, timeout: 1000 });
            } else {
                Alert.alert('No navigator.geolocation')
            }
        } else {
            Alert.alert('No permission granted');
        }
    }

    render() {
        return (
            <View style={styles.sensorGpsBox}>
                <View style={styles.insideTopContainer}>
                    <View style={styles.iconContainer}>
                        <Icon icon="gps" bgColor="AED581"/>
                    </View>
                    <View style={styles.dataContainer}>
                        <Text style={styles.sensorBoxTitle}>GPS</Text>
                        <Text style={styles.sensorBoxValue}>{this.props.shortLatitude} {this.props.shortLongitude}</Text>
                        <Text>Latitude: {this.props.latitude}</Text>
                        <Text>Longitude: {this.props.longitude}</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return { 
        latitude:       state.sensors.latitude,
        longitude:      state.sensors.longitude,
        shortLatitude:  state.sensors.shortLatitude,
        shortLongitude: state.sensors.shortLongitude
    };
};
export default connect(mapStateToProps)(Gps);


const styles = StyleSheet.create({
    sensorGpsBox: {
        flex: 2,
        marginTop: 1.5,
        marginRight: 4,
        marginBottom: 1.5,
        marginLeft: 4,
    
        padding: 10,
    
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        backgroundColor: '#FFF',
    },
    insideTopContainer: {
        flex: 3,
        flexDirection: 'row',
    },
    iconContainer: {
        flex: 2,
    },
    dataContainer: {
        flex: 6,
    },
    insideBottomContainer: {
        flex: 2
    },
    sensorBoxTitle: {
        color: '#37474F',
        fontSize: 40
    },
    sensorBoxValueUnit: {
        color: '#37474F',
        fontSize: 20,
        fontWeight: 'bold'
    },
    sensorBoxValue: {
        color: '#37474F',
        fontSize: 60,
        fontWeight: 'bold'
    }
});