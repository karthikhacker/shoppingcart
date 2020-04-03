import React from 'react';
import { connect } from 'react-redux';
import { login } from '../actions';

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
         <div className="jumbotron">
           <h2>Signin</h2>
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
export default connect(mapStateToProps,{ login })(Signin);
