import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { barometer, setUpdateIntervalForType, SensorTypes } from "react-native-sensors";

import { connect } from 'react-redux';
import { pressureChange } from '../actions/sensors';
import Icon from './common/icon';
import LineChart from './common/lineChart';

setUpdateIntervalForType(SensorTypes.barometer, 1000);

class Pressure extends Component {
    componentDidMount() {
        const { dispatch } = this.props,
              subscription = barometer.subscribe(({ pressure }) => {
                    let { pressures } = this.props;
                    pressure = Number.parseFloat(pressure).toFixed(2);

                    if (pressures.length <= 19) {
                        pressures.push(pressure);
                    } else {
                        pressures.shift();
                        pressures.push(pressure);
                    }
                
                    dispatch(pressureChange(pressure, pressures));
            });
    }


    render() {
        return (
            <View style={styles.sensorBox}>
                <View style={styles.insideTopContainer}>
                    <View style={styles.iconContainer}>
                        <Icon icon="pressure" bgColor="4FC3F7"/>
                    </View>
                    <View style={styles.dataContainer}>
                        <Text style={styles.sensorBoxTitle}>Pressure (hPa)</Text>
                        <Text style={styles.sensorBoxValue}>{this.props.pressure}</Text>
                        <Text style={styles.sensorBoxMinMaxValue}>Min: {this.props.min} Max: {this.props.max}</Text>
                    </View>
                </View>
                <View style={styles.insideBottomContainer}>
                    <LineChart data={this.props.pressures} 
                                min={this.props.min} 
                                max={this.props.max} 
                                color='#4FC3F7'/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    sensorBox: {
        flex: 3,
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
    sensorBoxValue: {
        color: '#37474F',
        fontSize: 60,
        fontWeight: 'bold'
    }
});

// start of code change
const mapStateToProps = (state) => {
    return { 
        pressure: state.sensors.pressure,
        pressures: state.sensors.pressures,
        min: state.sensors.minPressure,
        max: state.sensors.maxPressure
    };
};
  
export default connect(mapStateToProps)(Pressure);
