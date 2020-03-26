import React, {useState} from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import {API} from '../../config';
import {authenticate,isAuthenticated} from '../auth';
import setAuthToken from '../utils/setAuthToken';

const Signin = () => {
   const [values,setValues] = useState({
      email : '',
      password : '',
      error : '',
      redirectTo : false,
      loading : false
   })
   const { email, password, error , loading ,redirectTo } = values;
   const { user } = isAuthenticated();
   //handleChange
   const handleChange = name => event => {
     setValues({...values, error : false, [name] : event.target.value})
   }
   //Handle submit
   const handleSubmit = (e) => {
     e.preventDefault();
     setValues({ ...values, error : false, loading : true})
     const data = {email,password};
     axios.post(`${API}/signin`,data).then(res => {
        console.log(res.data.user.name)
        //set token to localStorage
         authenticate(res.data)
         //set auth token
         setAuthToken(res.data)
        setValues({
           ...values,
           loading : false,
           redirectTo : true
        })
     })
     .catch(err => {
        setValues({
           ...values,
           error : err.response.data,
           loading : false,
           redirectTo : false
        })
     })
   }
   //form
   const form = () => {
     return(
       <form onSubmit={handleSubmit}>
         <div className="form-group">
            <label>Email</label>
            <input onChange={handleChange('email')} type="text" className="form-control" placeholder="Email"/>
         </div>
         <div className="form-group">
            <label>Password</label>
            <input onChange={handleChange('password')} type="password" className="form-control" placeholder="Password"/>
         </div>
         <button className="btn btn-warning btn-sm">{loading ? '...loding' : 'Login'}</button>
       </form>
     )
   }
   //Show error
   const showError = () => {
     return(
        <div className="alert alert-danger" style={{display : error ? '' : 'none'}}>
          {error.error}
        </div>
     )
   }
   const redirectUser = () => {
     if(redirectTo){
       if(user && user.role === 'Admin'){
          return <Redirect to="/admin/dashboard"/>
       }else{
         return <Redirect to="/user/dashboard" />
       }
     }
     if(isAuthenticated()){
       return <Redirect to="/"/>
     }
   }
  return(
     <div className="section">
       <div className="jumbotron">
         <h2 className="text-center">Signin</h2>
       </div>
       <div className="container">
          <div className="row">
            <div className="col-sm-4 col-sm-offset-4">
              {showError()}
              {redirectUser()}
              {form()}
            </div>
          </div>
       </div>
     </div>
  )
}

export default Signin;
