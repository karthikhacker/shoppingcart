import { AUTH_ERROR, USER_LOADING, SET_CURRENT_USER } from '../actions/types';
import isEmpty from 'lodash/isEmpty';

const initialState = {
   user : {},
   isAuthenticated  : false,
   loading : false,
   error : {}
}

export default (state = initialState,action) => {
  switch(action.type){
     case USER_LOADING:
      return{
        ...state,
        loading : true
      }
     case SET_CURRENT_USER:
      return{
        ...state,
        isAuthenticated : !isEmpty(action.payload),
        user : action.payload,
        loading : false,
        error : {}
      }
     case AUTH_ERROR:
      return{
        ...state,
        error : action.payload,
        loading : false,
        user : {}
      }
     default:
      return state;
  }
}
