import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import {BrowserRouter as Router,Route,Switch } from 'react-router-dom';
import Menu from './components/core/Menu';
import Home from './components/core/Home';
import Signup from './components/user/Signup';
import Signin from './components/user/Signin';
import UserDashboard from './components/user/UserDashboard';
import AdminDashboard from './components/user/AdminDashboard';
import PrivateRoute from './components/auth/PrivateRoute';
import AdminRoute from './components/auth/AdminRoute';


function App() {
  return (
    <Router>
      <div>
        <Menu />
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/signup" component={Signup}/>
          <Route exact path="/signin" component={Signin}/>
          <PrivateRoute exact path="/user/dashboard" component={UserDashboard}/>
          <AdminRoute exact path="/admin/dashboard" component={AdminDashboard}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
