import { PRODUCT_ERROR, ADD_PRODUCT, PRODUCT_LOADING } from '../actions/types';

const initialState = {
  product : {},
  error : {},
  loading : false
}
export default (state = initialState,action) => {
  switch(action.type){
    case PRODUCT_LOADING:
     return{
       ...state,
       loading : true
     }
    case ADD_PRODUCT:
     return{
       ...state,
       product : action.payload,
       loading : false,
       error : {}
     }
    case PRODUCT_ERROR:
     return{
       ...state,
       error : action.payload,
       loading : false,
       product : {}
     }
    default:
     return state;
  }
}
