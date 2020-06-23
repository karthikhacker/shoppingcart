import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Layout from '../core/Layout';
import jwt from 'jsonwebtoken';

const Reset = ({match}) => {
  const [values,setValues] = useState({
     name : "",
     newPassword : "",
     confirmPassword : "",
     token : ""
  })
  const[error,setError] = useState("");
  const[success,setSuccess] = useState("");
  const [loading,setLoading] = useState(false);

  const {newPassword,confirmPassword,name,token} = values;

  //useEffect
  useEffect(() => {
    let token = match.params.token;
    let {name} = jwt.decode(token);
    if(token){
      setValues({...values, name,token})
    }
  },[])

  //handleChange
  const handleChange = name => e => {
    setValues({...values, [name] : e.target.value, error : "" })
  }

  //handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault()
    if(newPassword === ""){
      setError({ message : "New password is required"})
    }else if(confirmPassword === ""){
      setError({ message : "Confirm password is required."})
    } else if(newPassword !== confirmPassword){
       setError({ message : "Password didnt match"})
    }else{
      setLoading(true);
      const data = {
        newPassword,
        resetPasswordLink : token
      }
      axios.put('http://localhost:4000/api/reset/password',data)
       .then(res => {
          console.log(res.data)
          setSuccess(res.data)
          setLoading(false)
          setError(false)
       })
       .catch(error => {
          console.log(error.response.data)
          setError(error.response.data)
          setLoading(false)
          setSuccess(false)
       })
    }
  }

  //showSuccess
  const showSuccess = () => {
    return(
      <div className="success">
       {success ? <p className="text-success">{success.message}</p> : ""}
      </div>
    )
  }

  //showError
  const showError = () => {
    return(
      <div className="error">
        {error ? <p className="text-danger">{error.message}</p> : ""}
      </div>
    )
  }

  return(
    <div className="section">
      <Layout />
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="page-header">
               <h3>HI, {name} reset your  password</h3>
            </div>
          </div>
          <div className="col-lg-4 col-lg-offset-4">
             {showError()}
             {showSuccess()}
             <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>New password</label>
                  <input type="password" value={newPassword} onChange={handleChange('newPassword')} className="form-control" placeholder="New password"/>
                </div>
                <div className="form-group">
                  <label>Confirm password</label>
                  <input type="password" value={confirmPassword} onChange={handleChange('confirmPassword')} className="form-control" placeholder="Confirm password"/>
                </div>
                <button className="btn btn-success btn-sm">{loading ? "LOADING..." : "SUBMIT"}</button>
             </form>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Reset;
