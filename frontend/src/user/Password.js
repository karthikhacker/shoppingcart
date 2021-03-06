import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import Layout from '../core/Layout';
import axios from 'axios';
import Loading from '../core/Loading';

const Password = () => {
  const [error,setError] = useState("");
  const [loading,setLoading] = useState(false);
  const [success,setSuccess] = useState({})
  const [values,setValues] = useState({
     newPassword : '',
     password : '',
     confirmPassword : ''
  })

  //handleChange
  const handleChange = name => e => {
    setError("")
    setValues({ ...values, [name] : e.target.value })
  }

  //handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    if(values.password === "" || values.newPassword === "" || values.confirmPassword === ""){
       setError({ message : 'All fields are required'})
    }else if(values.newPassword !== values.confirmPassword){
      setError({ message  : 'Password didnt match.'})
    }else{
        const data = {
          password : values.password,
          newPassword : values.newPassword
        }
        setLoading(true)
        axios.put('/api/user/change/password',data)
         .then(res => {
            console.log(res.data)
            setSuccess(res.data)
            setLoading(false)
         })
         .catch(error => {
            setError(error.response.data)
            setLoading(false)
         })
    }

  }

  //form
  const form = () => {
    return(
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input type="password" onChange={handleChange('password')} className="form-control" placeholder="OLD PASSWORD" value={values.password}/>
        </div>
        <div className="form-group">
          <input type="password" onChange={handleChange('newPassword')} className="form-control" placeholder="NEW PASSWORD" value={values.newPassword}/>
        </div>
        <div className="form-group">
          <input type="password" onChange={handleChange('confirmPassword')} className="form-control" placeholder="CONFIRM PASSWORD" value={values.confirmPassword}/>
        </div>
        {loading ? <Loading /> : <button className="btn btn-primary btn-sm btn-block">SUBMIT</button>}
      </form>
    )
  }
  return(
    <div className="section">
      <Layout />
      <div className="page-header">
        <h3 className="text-center">Change password</h3>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-lg-offset-4">
             {error ? <p className='text-danger'>{error.message}</p> : null}
             {success.message &&  <p className="alert alert-success">{success.message} Login with your new password</p>  }
             {form()}
          </div>
        </div>
      </div>
    </div>
  )
}
export default Password;
