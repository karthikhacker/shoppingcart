import React from 'react';
import {isAuthenticated} from '../auth';
import {Link} from 'react-router-dom';

const UserDashboard = () => {
  const { user } = isAuthenticated();
  //user links
  const userLinks = () => {
    return(
      <div className="panel panel-default">
        <div className="panel-heading">
          <h4>User links</h4>
        </div>
        <div className="panel-body">
          <ul className="list-group">
            <li className="list-group-item"><Link to="/cart">My Cart</Link></li>
            <li className="list-group-item"><Link to="/profile/update">Profile update</Link></li>
          </ul>
        </div>
      </div>
    )
  }
  //user info
  const userInfo = () => {
    return(
      <div className="panel panel-default">
         <div className="panel-heading">
            <h4>User Info</h4>
         </div>
         <div className="panel-body">
           <ul className="list-group">
             <li className="list-group-item">{user.name}</li>
             <li className="list-group-item">{user.email}</li>
             <li className="list-group-item">{user.role === 'User' ? 'User' : 'Admin'}</li>
           </ul>
         </div>
      </div>
    )
  }
  return(
    <div className="section">
      <div className="jumbotron">
         <h3 className="text-center">{user.name}'s,  Dashboard</h3>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-sm-3 col-md-3 col-lg-3">
            {userLinks()}
          </div>
          <div className="col-sm-9 col-md-9 col-lg-9">
           {userInfo()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDashboard;
