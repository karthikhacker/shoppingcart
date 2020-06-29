import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProfile } from '../actions';
import Layout from '../core/Layout';
import Loading from '../core/Loading';

class UserDashboard extends React.Component{
  componentDidMount(){
     this.props.getProfile();
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.auth.user.role === 'Admin'){
      return this.props.history.push("/admin/dashboard")
    }
  }
  profilePanel = () => {
    const { profile } = this.props.profile;
    return(
      <div className="panel panel-default">
        <div className="panel-heading">
          <h4 className="text-center">User info</h4>
        </div>
        <div className="panel-body">
            <p>{profile.name}</p>
            <p>{profile.email}</p>
            <p>{profile.about ?  <span>About :  {profile.about}</span> : 'Not added'}</p>
            <p>{profile.location ? <span>Location :  {profile.location}</span> : null}</p>
            <p>{profile.role === 'Admin' ? 'Admin' : 'User'}</p>
        </div>
      </div>
    )
  }

  //Links
  linkPanel = () => {
    return(
      <div className="panel panel-default">
        <div className="panel-heading">
          <h4 className="text-center">User Links</h4>
        </div>
        <div className="panel-body">
            <p><Link className="link" to="/cart">cart</Link></p>
            <p><Link className="link" to="/user/profile/update">update profile</Link></p>
            <p><Link className="link" to="/user/order">Orders</Link></p>
        </div>
      </div>
    )
  }
  render(){
    //console.log(this.state.orders)
    const {loading} = this.props.profile;
    return(
      <div className="section">
         <Layout />
         <div className="jumbotron">
           <h2 className="text-center">User Dashboard</h2>
         </div>
         <div className="container">
           <div className="row">
             <div className="col-sm-3">
               {this.linkPanel()}
             </div>
             <div className="col-sm-9">
              {loading ? <Loading /> : this.profilePanel()}
             </div>
           </div>
         </div>
      </div>
    )
  }
}
const mapStatetoProps = (state) => {
  return{
    auth : state.auth,
    profile : state.profile
  }
}
export default connect(mapStatetoProps,{getProfile})(UserDashboard);
