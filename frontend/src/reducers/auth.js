import { AUTH_ERROR, USER_LOADING, SET_CURRENT_USER } from '../actions/types';
import isEmpty from 'lodash/isEmpty';

const initialState = {
   user : {},
   isAuthenticated  : false,
   error : {}
}

export default (state = initialState,action) => {
  switch(action.type){
     case SET_CURRENT_USER:
      return{
        ...state,
        isAuthenticated : !isEmpty(action.payload),
        user : action.payload,
        error : {}
      }
     case AUTH_ERROR:
      return{
        ...state,
        error : action.payload,
        user : {}
      }
     default:
      return state;
  }
}
