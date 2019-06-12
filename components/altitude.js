import React, { Component } from 'react';
import { 
    Text,
    View,
    StyleSheet 
} from 'react-native';
import { 
    barometer, 
    SensorTypes, 
    setUpdateIntervalForType 
} from "react-native-sensors";
import { connect } from 'react-redux';

import { altitudeChange } from '../actions/sensors';
import Icon from './common/icon';
import LineChart from './common/lineChart';


setUpdateIntervalForType(SensorTypes.barometer, 1000);

class Altitude extends Component {
    pressureToAltitude(pressure) {
        const Rd = 287,     //air const
              G = 9.80665;
        let altitude = 0;

        if (!isNaN(pressure)) {
            altitude = (Math.log(this.props.seeLevelPressure/pressure) * Rd * (this.props.seeLevelTemp + 273.15)) / G;
        }

        return Number.parseFloat(altitude).toFixed(2);
    }


    componentDidMount() {
        const { dispatch } = this.props,
            subscription = barometer.subscribe(({ pressure }) => {
                let { altitudes } = this.props;
                altitude = this.pressureToAltitude(pressure);

                if (altitudes.length <= 19) {
                    altitudes.push(altitude);
                } else {
                    altitudes.shift();
                    altitudes.push(altitude);
                }
            
                dispatch(altitudeChange(altitude, altitudes));
            });
    }


    render() {
        return (
            <View style={styles.sensorBox}>
                <View style={styles.insideTopContainer}>
                    <View style={styles.iconContainer}>
                        <Icon icon="altitude" bgColor="F9AA33"/>
                    </View>
                    <View style={styles.dataContainer}>
                        <Text style={styles.sensorBoxTitle}>Altitude (m.n.p.m)</Text>
                        <Text style={styles.sensorBoxValue}>{this.props.altitude}</Text>
                        <Text style={styles.sensorBoxMinMaxValue}>Min: {this.props.min} Max: {this.props.max}</Text>
                    </View>
                </View>
                <View style={styles.insideBottomContainer}>
                    <LineChart data={this.props.altitudes} 
                               min={this.props.min} 
                               max={this.props.max} 
                               color='#F9AA33'/>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return { 
        seeLevelPressure: state.sensors.seeLevelPressure,
        seeLevelTemp:     state.sensors.seeLevelTemp,
        altitude:         state.sensors.altitude,
        altitudes:        state.sensors.altitudes,
        min:              state.sensors.minAltitude,
        max:              state.sensors.maxAltitude
    };
};
export default connect(mapStateToProps)(Altitude);


const styles = StyleSheet.create({
    chart: {
        width: 200,
        height: 200,
    },
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
      flex: 6
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
