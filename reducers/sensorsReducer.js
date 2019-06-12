import { 
  PRESSURE_CHANGE, 
  ALTITUDE_CHANGE,
  GPS_CHANGE,
  CLEAR_VALUES
} from '../actions/types';

export default function sensorReducer(state = {}, action) {
    switch (action.type) {
      case PRESSURE_CHANGE:
          return {
            ...state, 
            ...{ pressure: action.pressure,
                 pressures: action.pressures,
                 maxPressure: Math.max(...action.pressures),
                 minPressure: Math.min(...action.pressures)
            }
          }
      case ALTITUDE_CHANGE:
        return {
          ...state, 
          ...{ altitude: action.altitude,
               altitudes: action.altitudes,
               maxAltitude: Math.max(...action.altitudes),
               minAltitude: Math.min(...action.altitudes)
          }
        };
      case GPS_CHANGE:
        return {
          ...state, 
          ...{ latitude: action.cords.latitude,
               longitude: action.cords.longitude,
               shortLatitude: Number.parseFloat(action.cords.latitude).toFixed(2),
               shortLongitude: Number.parseFloat(action.cords.longitude).toFixed(2)
          }
      };
      case CLEAR_VALUES:
          return {
            ...state,
            ...{ altitudes: [],
                 maxAltitude: 0,
                 minAltitude: 0
            },
            ...{ pressures: [],
                 maxPressure: 0,
                 minPressure: 0
            }
      }
      default:
        return state;
  }
}