import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../actions';
import {totalItem} from './cartHelper';

 const Menu = ({auth,user,products}) =>  {
     const onLogout = () => {
        logoutUser()
     }
    return (
      <nav className="navbar navbar-default">
         <div className="container">
           <div className="navbar-header">
             <Link to="/" className="navbar-brand">Shopify</Link>
           </div>
           <ul className="nav navbar-nav navbar-right">
            <li><Link to="/shop">Shop</Link></li>
            <li><Link to="/cart">Cart <sup><small className="badge">{totalItem(products)}</small></sup></Link></li>
           </ul>
           {auth.isAuthenticated && (
             <ul className="nav navbar-nav navbar-right">
               <li><a style={{cursor : 'pointer'}} onClick={onLogout}>Logout</a></li>
             </ul>
           )}
           {auth.isAuthenticated && auth.user.role === 'User' && (
              <ul className="nav navbar-nav navbar-right">
                <li><Link to="/user/dashboard">Dashboard</Link></li>
              </ul>
           )}
           {auth.isAuthenticated && auth.user.role === 'Admin' && (
             <ul className="nav navbar-nav navbar-right">
               <li><Link to="/admin/dashboard">Admin Dashboard</Link></li>
             </ul>
           )}
           {!auth.isAuthenticated && (
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
