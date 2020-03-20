import React, {useState} from 'react';
import {API} from '../../config';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [values, setValues] = useState({
     name : '',
     email : '',
     password : '',
     error : '',
     success : false
  })
  //handleChange
  const handleChange  = name => event => {
     setValues({...values,error : false, [name] : event.target.value})
  }
  const { name, email, password, error, success } = values;
  //signupApi
  const signupApi = (data) => {
    axios.post(`${API}/signup`,data).then(res => {
        setValues({
          ...values,
          name : '',
          email : '',
          password : '',
          success : true,
          error  : ''
        })
    })
    .catch(err => {
       setValues({...values, error : err.response.data, success : false })
    })
  }
  //handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
     const data = {name,email,password};
     signupApi(data)
  }
  const form = () => {
     return(
       <form onSubmit={handleSubmit}>
         <div className="form-group">
           <label>Name</label>
           <input onChange={handleChange('name')} value={name} type="text" className="form-control" placeholder="Name"/>
         </div>
         <div className="form-group">
           <label>Email</label>
           <input onChange={handleChange('email')} value={email} type="text" className="form-control" placeholder="Email"/>
         </div>
         <div className="form-group">
           <label>Password</label>
           <input onChange={handleChange('password')} value={password} type="password" className="form-control" placeholder="Password"/>
         </div>
         <button className="btn btn-info btn-sm">Submit</button>
       </form>
     )
  }
  //Show Error
  const showError = () => {
    return(
      <div className="alert alert-danger" style={{ display : error ? '' : 'none'}}>
        {error.error}
      </div>
    )
   }
  // //show success message
  const showSuccess = () => {
    return(
      <div className="alert alert-info" style={{display : success ? '' : 'none'}}>
        Account created <span><Link to="/signin">Signin</Link></span>
      </div>
    )
  }
  console.log(error)
  return(
     <div className="section">
       <div className="jumbotron">
         <h1 className="text-center">Signup</h1>
       </div>
       <div className="container">
         <div className="row">
           <div className="col-sm-4 col-sm-offset-4">
            {showError()}
            {showSuccess()}
             {form()}
           </div>
         </div>
       </div>
     </div>
  )
}

export default Signup;
