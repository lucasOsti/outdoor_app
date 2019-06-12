import React  from 'react';
import { StyleSheet, View } from 'react-native';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';

import Pressure from './components/pressure';
import Altitude from './components/altitude';
import Gps from './components/gps';
import Accelerometer from './components/accelerometer';


const initialState = { 
  sensors: {
    pressure:    0,
    pressures:   [],
    minPressure: 0,
    maxPressure: 0,
    altitude:    0,
    altitudes:   [],
    minAltitude: 0,
    maxAltitude: 0,
    seeLevelPressure: 1013.25,
    seeLevelTemp: 15
  }
},
store = createStore(
  rootReducer,
  initialState
);


export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Pressure />
          <Altitude />
          <Gps />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 2.5,
    backgroundColor: '#EDF0F2'
  }
});
