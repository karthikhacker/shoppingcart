import React,{useState} from 'react';
import Layout from '../core/Layout';
import axios from 'axios';
import { MdError } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import Loading from '../core/Loading';

class Signup extends React.Component{
  //state
   state = {
      name : "",
      email : "",
      password : "",
      nameError : "",
      emailError : "",
      passwordError : "",
      error : "",
      success : "",
      loading : false
   }

  //handleName
 handleName = (e) => {
    this.setState({ name : e.target.value},() => {this.validateName()})
  }
 handleEmail = (e) => {
   this.setState({ email : e.target.value},() => {this.validateEmail()})
 }
 handlePassword = (e) => {
  this.setState({ password : e.target.value },() => {this.validatePassword()})
}

//validate name
validateName = () => {
  const {name} = this.state;
  let nameError;
  if(name === ""){
    nameError = "Name is required"
  }
  this.setState({ nameError})
  return !nameError
}

//validate name
validatePassword = () => {
  const {password} = this.state;
  let passwordError;
  if(password === ""){
    passwordError = "Password is required"
  }else if(password.length < 6){
    passwordError = "Password should be minumum 6 characters"
  }
  this.setState({ passwordError})
  return !passwordError
}

//validate email
validateEmail = () => {
  const {email} = this.state;
  let emailError;
  if(email === ""){
    emailError = "Email is required"
  }else if(!/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(email)){
    emailError = "Enter an proper email"
  }
  this.setState({ emailError})
  return !emailError
}

 //handleSubmit
 handleSubmit = (e) => {
   e.preventDefault();
   const {name,email,password} = this.state;
   const validName = this.validateName();
   const validEmail = this.validateEmail();
   const validPassword = this.validatePassword();
   if(validName || validEmail || validPassword){
     const data = {
        name,email,password
     }
     this.setState({ loading : true})
     axios.post('http://localhost:4000/api/signup',data)
     .then(res => {
        this.setState({ success : res.data,loading : false, name : '',email : '',password : '',error : false})
     })
     .catch(error => {
        this.setState({error : error.response.data, loading : false})
     })
   }
 }

 // showSuccess
  showSuccess = () => {
    const{success} = this.state;
    return(
      <div className="success">
        {success ? <p className="alert alert-success"><FaCheck value={{className : 'react-icons'}}/> {success.message}</p> : ""}
      </div>
    )
  }

  //showError
  showError = () => {
    const{error} = this.state;
    return(
      <div className="error">
        {error ? <p className="alert alert-danger"> <MdError value={{className : 'react-icons'}}/> {error.message}</p> : ""}
      </div>
    )
  }

  //form
  form = () => {
     const {nameError,emailError,passwordError,loading} = this.state;
     return(
       <form onSubmit={this.handleSubmit}>
          <div className={nameError ? "has-error" : "form-group"}>
             <label>Name</label>
             <input type="text" className="form-control" placeholder="Name" onChange={this.handleName} value={this.state.name}/>
             {nameError && (<span className="help-block">{nameError}</span>)}
          </div>
          <div className={emailError ? "has-error" : "form-group"}>
             <label>Email</label>
             <input type="email" className="form-control" placeholder="Email" onChange={this.handleEmail} value={this.state.email}/>
             {emailError && (<span className="help-block">{emailError}</span>)}
          </div>
          <div className={passwordError ? "has-error" : "form-group"}>
             <label>Password</label>
             <input type="password" className="form-control" placeholder="Password" onChange={this.handlePassword} value={this.state.pasword}/>
             {passwordError && (<span className="help-block">{passwordError}</span>)}
          </div>
          {loading ? <Loading /> : <button className="btn btn-success btn-block btn-sm">SUBMIT</button> }
       </form>
     )
  }
  render(){
    return(
      <div className="section">
        <Layout />
        <div className="container">
          <div className="row">
           <div className="col-lg-12">
              <div className="page-header">
                <h2 className="text-center">Signup</h2>
              </div>
           </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-lg-offset-4">
              {this.showSuccess()}
              {this.showError()}
              {this.form()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Signup;
