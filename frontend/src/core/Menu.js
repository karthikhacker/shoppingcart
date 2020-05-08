import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../actions';
import {totalItem} from './cartHelper';

 const Menu = ({isAuthenticated,user}) =>  {
     const onLogout = () => {
        logoutUser()
     }
    return (
      <nav className="navbar navbar-default">
         <div className="container">
           <div className="navbar-header">
             <Link to="/" className="navbar-brand">Shopify</Link>
           </div>
           <ul className="nav navbar-nav navbar-left">
            <li><Link to="/shop">Shop</Link></li>
            <li><Link to="/cart">Cart <sup><small className="badge">{totalItem()}</small></sup></Link></li>
           </ul>
           {isAuthenticated && (
             <ul className="nav navbar-nav navbar-right">
               <li><a style={{cursor : 'pointer'}} onClick={onLogout}>Logout</a></li>
             </ul>
           )}
           {isAuthenticated && user.role === 'User' && (
              <ul className="nav navbar-nav navbar-right">
                <li><Link to="/user/dashboard">Dashboard</Link></li>
              </ul>
           )}
           {isAuthenticated && user.role === 'Admin' && (
             <ul className="nav navbar-nav navbar-right">
               <li><Link to="/admin/dashboard">Admin Dashboard</Link></li>
             </ul>
           )}
           {!isAuthenticated && (
             <ul className="nav navbar-nav navbar-right">
              <li><Link to="/signup">Signup</Link></li>
              <li><Link to="/signin">Signin</Link></li>
             </ul>
           )}
         </div>
      </nav>
    );

}

const mapStateToProps = (state) => {
  return{
    auth : state.auth
  }
}
export default connect(mapStateToProps,{ logoutUser })(Menu);
