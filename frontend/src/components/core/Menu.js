import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
  return(
     <nav className="navbar navbar-default">
       <div className="container">
         <div className="navbar-header">
           <Link to="/" className="navbar-brand">Shopify</Link>
         </div>
         <ul className="nav navbar-nav navbar-right">
            <li><Link to="/signup">Signup</Link></li>
            <li><Link to="/signin">Signin</Link></li>
         </ul>
       </div>
     </nav>
  )
}

export default Menu;
