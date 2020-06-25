import { GET_PROFILE, GET_PROFILE_ERROR, CLEAR_CURRENT_PROFILE,USER_LOADING } from '../actions/types';

const initialState = {
   profile : {},
   error : {},
   loading : false
}

export default (state = initialState,action) => {
  switch(action.type){
     case USER_LOADING:
      return{
        ...state,
        loading : true
      }
     case GET_PROFILE:
      return{
        ...state,
        profile : action.payload,
        loading : false
      }
     case GET_PROFILE_ERROR:
      return{
        ...state,
        error : action.payload,
        loading : false
      }
     case CLEAR_CURRENT_PROFILE:
      return{
        ...state,
        profile : {}
      }
     default:
      return state;
  }
}
