import { GET_PROFILE, GET_PROFILE_ERROR, CLEAR_CURRENT_PROFILE } from '../actions/types';

const initialState = {
   profile : {},
   error : {}
}

export default (state = initialState,action) => {
  switch(action.type){
     case GET_PROFILE:
      return{
        ...state,
        profile : action.payload
      }
     case GET_PROFILE_ERROR:
      return{
        ...state,
        error : action.payload
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
