import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Home from './core/Home';
import Menu from './core/Menu';
import Signin from './user/Signin';
import UserDashboard from './user/UserDashboard';
import AdminDashboard from './user/AdminDashboard';
import CreateCategory from './admin/CreateCategory';
import CreateProduct from './admin/CreateProduct';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import jwtDecode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser } from './actions';
import PrivateRoute from './private-route/PrivateRoute';
import AdminRoute from './private-route/AdminRoute';


const store = createStore(rootReducer,compose(applyMiddleware(thunk),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()))

//keep user loggedin
if(localStorage.jwt){
  //set token header
  setAuthToken(localStorage.jwt);
  const jwtDecoded = jwtDecode(localStorage.jwt);
  store.dispatch(setCurrentUser(jwtDecoded));
}
class  App extends React.Component {
  render(){
    return (
      <Provider store={store}>
        <Router>
           <div>
             <Menu />
             <Switch>
               <Route exact path="/" component={Home}/>
               <Route exact path="/signin" component={Signin}/>
               <PrivateRoute exact path="/user/dashboard" component={UserDashboard}/>
               <AdminRoute exact path="/admin/dashboard" component={AdminDashboard}/>
               <AdminRoute exact path="/create/category" component={CreateCategory}/>
               <AdminRoute exact path="/create/product" component={CreateProduct}/>
             </Switch>
           </div>
        </Router>
      </Provider>
    )
  }
}

export default App;
