import { ADD_PRODUCT, PRODUCT_LOADING, PRODUCT_ERROR, CATEGORY_SUCCESS,CATEGORY_ERROR,CATEGORY_LOADING, AUTH_ERROR, USER_LOADING, SET_CURRENT_USER, GET_PROFILE, CLEAR_CURRENT_PROFILE, GET_PROFILE_ERROR } from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import setToken from '../utils/loginHelper';
import jwtDecode from 'jwt-decode';

// user Signin
export const login = (userData) => {
  return dispatch => {
     dispatch(userLoading())
     axios.post('http://localhost:4000/api/signin',userData)
      .then(res => {
        const { token } = res.data
        // set token to localStorage
        setToken(token)
       //set token to auth header
       setAuthToken(token)
       //decode token to get user data
       const decoded = jwtDecode(token);
       //set current user
       dispatch(setCurrentUser(decoded))
      })
      .catch(error => dispatch({
         type : AUTH_ERROR,
         payload : error.response.data
      }))
  }
}

// google login
export const googleLogin = (data) => {
  return dispatch => {
    dispatch(userLoading())
    axios.post('http://localhost:4000/api/google-login',data)
    .then(res => {
      console.log(res.data)
      const { token } = res.data
      // set token to localStorage
      setToken(token)
     //set token to auth header
     setAuthToken(token)
     //decode token to get user data
     const decoded = jwtDecode(token);
     //set current user
     dispatch(setCurrentUser(decoded))
    })
  }
}

// set current user or loggedin user
export const setCurrentUser = (decoded) => {
  return{
    type : SET_CURRENT_USER,
    payload : decoded
  }
}
// get profile
export const getProfile = () => {
  return dispatch => {
    dispatch(userLoading())
    axios.get('http://localhost:4000/api/user/profile')
     .then(res =>
       dispatch({
        type : GET_PROFILE,
        payload : res.data
     }))
     .catch(error =>
       dispatch({
        type : GET_PROFILE_ERROR,
        payload : error.response.data
     }))
  }
}
// clear current profile
export const clearCurrentProfile = () => {
  return{
     type : CLEAR_CURRENT_PROFILE
  }
}
//Logout user
export const logoutUser = () => {
  return dispatch => {
    localStorage.removeItem('jwt');
    //set auth token to false
    setAuthToken(false)
    dispatch(setCurrentUser({}))
  }
}
//user loading
export const userLoading = () => {
  return{
    type : USER_LOADING
  }
}
// add category
export const addCategory = (data) => {
  return dispatch => {
    dispatch(categoryLoading())
    axios.post('http://localhost:4000/api/create/category',data)
     .then(res => dispatch({
        type : CATEGORY_SUCCESS,
        payload : res.data
     }))
     .catch(error => dispatch({
        type : CATEGORY_ERROR,
        payload : error.response.data
     }))
  }
}
//category loading
export const categoryLoading = () => {
  return{
    type : CATEGORY_LOADING
  }
}
// add product
export const createProduct = (data) => {
  return dispatch => {
    dispatch(productLoading())
    axios.post('http://localhost:4000/api/create/product',data)
     .then(res => dispatch({
       type : ADD_PRODUCT,
       payload : res.data
     }))
     .catch(error => dispatch({
       type : PRODUCT_ERROR,
       payload : error.response.data
     }))
  }
}
// product loading
export const productLoading = () => {
  return{
    type : PRODUCT_LOADING
  }
}
