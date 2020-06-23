import React,{useState,useEffect} from 'react';
import Layout from '../core/Layout';
import axios from 'axios';
import jwt from 'jsonwebtoken';

const Activate = ({match,history}) => {
  const [values,setValues] = useState({
     name:"",
     token : "",
     show : true
  })
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState("")
  //useEffect
  useEffect(() => {
    let token = match.params.token;
    let {name} = jwt.decode(token)
    if(token){
      setValues({ ...values, name,token})
    }
  },[])

  //handleClick
  const handleClick = (e) => {
    e.preventDefault();
    //
    let {token} = values;
    //console.log(token)
    setLoading(false);
    axios.post('http://localhost:4000/api/account/activation',{token})
    .then(res => {
        history.push("/signin")
    })
    .catch(error => {
       console.log(error.response.data)
       setError(error.response.data)
    })
  }

  //actiation link
  const activationLink = () => {
    return(
      <div className="activate">
        <h5>Hi, <b>{values.name}</b> activate your account</h5>
        <button onClick={handleClick} className="btn btn-success btn-sm">ACTIVATE ACCOUNT</button>
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
          <div className="col-lg-6 col-lg-offset-4">
            {showError()}
            {activationLink()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Activate;
