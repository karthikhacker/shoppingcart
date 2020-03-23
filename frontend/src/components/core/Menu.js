import React from 'react';
import {withRouter} from 'react-router-dom';
import {isAuthenticated} from '../auth';
import axios from 'axios';
import {API} from '../../config';
import { Link } from 'react-router-dom';

const Menu = ({history}) => {
  //logout
  const logout = () => {
    if(typeof window !== 'undefined'){
      localStorage.removeItem("jwt")
    }
    axios.get(`${API}/signout`).then(res => {
       if(res.data){
         history.push('/')
       }
    })
  }
  return(
     <nav className="navbar navbar-default">
       <div className="container">
         <div className="navbar-header">
           <Link to="/" className="navbar-brand">Shopify</Link>
         </div>
         {!isAuthenticated() && (
           <ul className="nav navbar-nav navbar-right">
              <li><Link to="/signup">Signup</Link></li>
              <li><Link to="/signin">Signin</Link></li>
           </ul>
         )}
         {isAuthenticated() && (
           <ul className="nav navbar-nav navbar-right">
              <li><Link to="/userdashboard">Dashboard</Link></li>
              <li><a style={{cursor : 'pointer'}} onClick={logout}>Logout</a></li>
           </ul>
         )}
       </div>
     </nav>
  )
}

export default withRouter(Menu);
