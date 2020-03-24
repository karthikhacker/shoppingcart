import  React from 'react';
import  {Route,Redirect} from 'react-router-dom';
import  {isAuthenticated} from './index';

const AdminRoute = ({ component : Component, ...rest }) => (
   <Route {...rest} render={props => isAuthenticated() && isAuthenticated().user.role === 'Admin' ? (
     <Component {...props}/>
   ) : (
     <Redirect to={{pathname : '/signin', state : {from : props.location}}}/>
   )}/>
)

export default AdminRoute;
