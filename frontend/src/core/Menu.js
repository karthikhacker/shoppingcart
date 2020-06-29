import React from 'react';
import shopify from '../assests/shopify.png';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../actions';
import {totalItem} from './cartHelper';
import {BsPower} from 'react-icons/bs'
import {FaUser,FaShoppingBag,FaPowerOff,FaUsers,FaCog,FaSignInAlt} from 'react-icons/fa'

 const Menu = ({auth,user,products,logoutUser}) =>  {
     const onLogout = () => {
        logoutUser()
        //console.log("logout")
     }
    return (
      <nav className="navbar navbar-default">
         <div className="container">
           <div className="navbar-header">
             <Link to="/" className="navbar-brand">SHOPIFY</Link>
           </div>
           {auth.isAuthenticated && auth.user.role === 'User' && (
              <ul className="nav navbar-nav navbar-right">
                <li><Link to="/user/dashboard"><FaCog value={{className : 'react-icons'}}/> Dashboard </Link></li>
                <li><a style={{cursor : 'pointer'}} onClick={onLogout}> <FaPowerOff value={{className : 'react-icons'}}/> Logout</a></li>
              </ul>
           )}
           {auth.isAuthenticated && auth.user.role === 'Admin' && (
             <ul className="nav navbar-nav navbar-right">
               <li><Link to="/admin/dashboard"><FaCog value={{className : 'react-icons'}}/> Admin Dashboard</Link></li>
               <li><a style={{cursor : 'pointer'}} onClick={onLogout}><FaPowerOff value={{className : 'react-icons'}}/> Logout</a></li>
             </ul>
           )}

           {!auth.isAuthenticated && (
             <ul className="nav navbar-nav navbar-right">
              <li><Link to="/signup"><FaUsers value={{className : 'react-icons'}}/> Signup</Link></li>
              <li><Link to="/signin"><FaSignInAlt value={{className : 'react-icons'}}/> Signin</Link></li>
             </ul>
           )}
           <ul className="nav navbar-nav navbar-right">
             <li><Link to="/shop">Shop</Link></li>
             <li><Link to="/cart"><FaShoppingBag value={{className : 'react-icons'}}/> Bag<sup><small className="badge">{totalItem(products)}</small></sup></Link></li>
           </ul>
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
