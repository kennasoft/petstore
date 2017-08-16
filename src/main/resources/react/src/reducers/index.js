import { combineReducers } from 'redux';
import pets from './petReducers';

export default combineReducers({ 
    menus: (state={}) => state,
    pets 
});