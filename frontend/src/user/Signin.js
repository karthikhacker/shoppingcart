import React from 'react';
import Layout from '../core/Layout';
import setToken from '../utils/loginHelper';
import setAuthToken from '../utils/setAuthToken';
import { connect } from 'react-redux';
import { login,googleLogin } from '../actions';
import GoogleLogin from 'react-google-login';
import axios from 'axios';

class Signin extends React.Component{
  state = {
    email : '',
    password : '',
    redirectTo : false
  }
  //handleEmail
  handleEmail = (e) => {
    this.setState({ email : e.target.value })
  }
  //handlepassword
  handlePassword = (e) => {
    this.setState({ password : e.target.value })
  }
  // handle submit
  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const userData = {
       email,
       password
    }
    this.props.login(userData)
  }

  componentDidMount(){
    if(this.props.auth.isAuthenticated){
      return this.props.history.push('/')
    }
  }
  //props
  componentWillReceiveProps(nextProps){
    if(nextProps.auth.isAuthenticated){
      if(nextProps.auth.user.role === 'Admin'){
        return this.props.history.push("/admin/dashboard")
      }else{
         return this.props.history.push("/user/dashboard")
      }
    }
  }

  responseGoogle = (response) => {
     console.log(response.tokenId)
     const data = {idToken : response.tokenId}
     this.props.googleLogin(data)
     // axios.post('http://localhost:4000/api/google-login',data)
     //  .then(res => {
     //     console.log(res.data)
     //      //set token to localStorage
     //      const token = res.data.token;
     //      setToken(token)
     //      //set token to auth header
     //      setAuthToken(token)
     //  })
     //  .catch(error => {
     //     console.log(error)
     //  })
  }

  //form
  form = () => {
    const { loading } = this.props.auth;
    return(
      <form onSubmit={this.handleSubmit}>
         <div className="form-group">
            <label>Email</label>
            <input onChange={this.handleEmail} value={this.state.email} type="email" className="form-control" placeholder="Email"/>
         </div>
         <div className="form-group">
            <label>Password</label>
            <input onChange={this.handlePassword} value={this.state.password} type="password" className="form-control" placeholder="Password"/>
         </div>
         <button className="btn btn-success btn-sm">{loading ? '...Loading' : 'Login'}</button>
         <hr />
         <GoogleLogin
            clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
            render={renderProps => (
              <button onClick={renderProps.onClick} disabled={renderProps.disabled} className="btn btn-primary"> <i className="fa fa-google" aria-hidden="true"></i>
 LOGIN WITH GOOGLE</button>
            )}
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
      </form>
    )
  }
  // showErrors
  showErrors = () => {
    const { error } = this.props.auth;
    return(
       <div className="col-sm-4 col-sm-offset-4">
         {error.error ? <p className="alert alert-danger text-center">{error.error}</p> : ''}
       </div>
    )
  }
  render(){

    return(
       <div className="section">
         <Layout />
         <div className="jumbotron">
           <h2 className="text-center">Signin</h2>
         </div>
         <div className="container">
            <div className="row">
               {this.showErrors()}
               <div className="col-sm-4 col-sm-offset-4">
                 {this.form()}
               </div>
            </div>
         </div>
       </div>
    )
  }
}
const mapStateToProps = (state) => {
  return{
    auth : state.auth
  }
}
export default connect(mapStateToProps,{ login,googleLogin })(Signin);
