import {combineReducers} from 'redux';
import auth from './auth';
import profile from './profile';
import category from './category';

export default combineReducers({
   auth,
   profile,
   category
})
