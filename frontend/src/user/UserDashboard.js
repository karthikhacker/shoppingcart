import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProfile } from '../actions';
import Layout from '../core/Layout';

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
          <ul className="list-group">
            <li className="list-group-item">{profile.name}</li>
            <li className="list-group-item">{profile.email}</li>
            <li className="list-group-item">{profile.about ?  <span>About :  {profile.about}</span> : 'Not added'}</li>
            <li className="list-group-item">{profile.location ? <span>Location :  {profile.location}</span> : null}</li>
            <li className="list-group-item">{profile.role === 'Admin' ? 'Admin' : 'User'}</li>
          </ul>
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
          <ul className="list-group">
            <li className="list-group-item"><Link to="/cart">cart</Link></li>
            <li className="list-group-item"><Link to="/user/profile/update">update profile</Link></li>
            <li className="list-group-item"><Link to="/user/order">Orders</Link></li>
          </ul>
        </div>
      </div>
    )
  }
  render(){
    //console.log(this.state.orders)
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
              {this.profilePanel()}
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
