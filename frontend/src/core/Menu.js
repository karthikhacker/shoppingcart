import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../actions';

 class Menu extends React.Component {

     onLogout = () => {
       this.props.logoutUser();
     }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    //console.log(user)
    return (
      <nav className="navbar navbar-default">
         <div className="container">
           <div className="navbar-header">
             <Link to="/" className="navbar-brand">Shopify</Link>
           </div>

           {isAuthenticated && (
             <ul className="nav navbar-nav navbar-right">
               <li><a style={{cursor : 'pointer'}} onClick={this.onLogout}>Logout</a></li>
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
}

const mapStateToProps = (state) => {
  return{
    auth : state.auth
  }
}
export default connect(mapStateToProps,{ logoutUser })(Menu);
