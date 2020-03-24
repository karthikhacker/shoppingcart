import React from 'react';
import {Link} from 'react-router-dom';
import {isAuthenticated} from '../auth';

const AdminDashboard = () => {
  const {user} = isAuthenticated();
  //Admin links
  const adminLinks = () =>  (
    <div className="panel panel-default">
       <div className="panel-heading">
          <h4>Admin Links</h4>
       </div>
       <div className="panel-body">
         <ul className="list-group">
           <li className="list-group-item"><Link to="/create/category">Create category</Link></li>
           <li className="list-group-item"><Link to="/create/product">Create product</Link></li>
         </ul>
       </div>
    </div>
  );
  //admin info
  const adminInfo = () =>  (
    <div className="panel panel-default">
       <div className="panel-heading">
          <h4>Admin info</h4>
       </div>
       <div className="panel-body">
         <ul className="list-group">
           <li className="list-group-item">{user.name}</li>
           <li className="list-group-item">{user.email}</li>
           <li className="list-group-item">{user.role  === 'Admin' ?  'Admin' : 'User'}</li>
         </ul>
       </div>
    </div>
  )
  return(
     <div className="section">
       <div className="jumbotron">
          <h2 className="text-center">Admin Area</h2>
          <p className="lead text-center">{user.name} - {user.role}</p>
       </div>
       <div className="container">
         <div className="row">
           <div className="col-sm-3">
              {adminLinks()}
           </div>
           <div className="col-sm-9 col-md-9 col-lg-9">
              {adminInfo()}
           </div>
         </div>
       </div>
     </div>
  )
}
export default AdminDashboard;
