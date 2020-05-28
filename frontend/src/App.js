import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Home from './core/Home';
import Shop from './core/Shop';
import Cart from './core/Cart';
import Checkout from './core/Checkout';
import Payment from './core/Payment';
import Signin from './user/Signin';
import UserDashboard from './user/UserDashboard';
import AdminDashboard from './user/AdminDashboard';
import CreateCategory from './admin/CreateCategory';
import CreateProduct from './admin/CreateProduct';
import Product from './core/Product';
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
             <Switch>
               <Route exact path="/" component={Home}/>
               <Route exact path="/signin" component={Signin}/>
               <Route exact path="/shop" component={Shop}/>
               <Route exact path="/cart" component={Cart}/>
               <Route exact path="/product/:productId" component={Product}/>
               <PrivateRoute exact path="/user/dashboard" component={UserDashboard}/>
               <PrivateRoute exact path="/checkout" component={Checkout}/>
               <PrivateRoute exact path="/checkout/payment/:id" component={Payment}/>
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
