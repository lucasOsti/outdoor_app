import { combineReducers } from 'redux';
import sensors from './sensorsReducer';

export default combineReducers({
    sensors: sensors
});