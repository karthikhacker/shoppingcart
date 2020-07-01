import React,{useState} from 'react';
import axios from 'axios';
import Layout from '../core/Layout';

const Forgot = () => {
  const[values,setValues] = useState({
     email : ""
  })
  const[error,setError] = useState("");
  const[success,setSuccess] = useState("");
  const [loading,setLoading] = useState(false);

  //handleChange
  const handleChange = name => e => {
    setValues({ ...values, [name] : e.target.value})
  }

  //handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const {email} = values;
    if(email === ""){
       setError({ message : "Enter your email"})
       setLoading(false)
    }else{
      axios.put('http://localhost:4000/api/forgot/password',{email})
       .then(res => {
          console.log(res.data)
          setSuccess(res.data)
          setLoading(false)
          setError(false)
          setValues("")
       })
       .catch(error => {
          console.log(error.response.data)
          setError(error.response.data)
          setLoading(false)
          setValues("")
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
          <div className="page-header">
            <h3>Forgot password</h3>
          </div>
          <div className="col-lg-6 col-lg-offset-4">
           {showSuccess()}
          </div>
          <div className="col-lg-4 col-lg-offset-4">
             {showError()}
             <form onSubmit={handleSubmit}>
               <div className="form-group">
                 <label>Email</label>
                 <input type="email" className="form-control" value={values.email || ""} onChange={handleChange('email')} placeholder="Enter your email"/>
               </div>
               <button className="btn btn-primary btn-sm">{loading ? "LOADING..." : "SUBMIT"}</button>
             </form>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Forgot;
