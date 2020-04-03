import { CATEGORY_SUCCESS, CATEGORY_ERROR, CATEGORY_LOADING } from '../actions/types';

const initialState = {
  category : {},
  loading : false,
  error : {}
}
export default (state = initialState, action) => {
  switch(action.type){
     case CATEGORY_LOADING:
      return{
        ...state,
        loading : true
      }
     case CATEGORY_SUCCESS:
       return{
         ...state,
         category : action.payload,
         loading : false,
         error : false
       }
     case CATEGORY_ERROR:
      return{
        ...state,
        error : action.payload,
        loading : false,
        category : []
      }
     default:
      return state;
  }
}
