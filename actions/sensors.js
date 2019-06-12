import { 
    PRESSURE_CHANGE, 
    ALTITUDE_CHANGE,
    GPS_CHANGE,
    CLEAR_VALUES
} from './types';

export function pressureChange(pressure, pressures) {
    return {
        type: PRESSURE_CHANGE,
        pressure: pressure,
        pressures: pressures
    }
};
  
export function altitudeChange(altitude, altitudes) {
    return {
        type: ALTITUDE_CHANGE,
        altitude: altitude,
        altitudes: altitudes
    }
};

export function gpsChange(cords) {
    return {
        type: GPS_CHANGE,
        cords: cords
    }
};

export function clearValues() {
    return {
        type: CLEAR_VALUES
    }
};