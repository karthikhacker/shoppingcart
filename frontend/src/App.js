import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Home from './core/Home';
import Footer from './core/Footer';
import Shop from './core/Shop';
import Cart from './core/Cart';
import Checkout from './core/Checkout';
import Payment from './core/Payment';
import AddAddress from './core/AddAddress';
import UpdateAddress from './core/UpdateAddress';
import Signin from './user/Signin';
import Signup from './user/Signup';
import UserDashboard from './user/UserDashboard';
import Password from './user/Password';
import Forgot from './user/Forgot';
import Reset from './user/Reset';
import UpdateProfile from './user/UpdateProfile';
import AdminDashboard from './user/AdminDashboard';
import Activate from './user/Activate';
import CreateCategory from './admin/CreateCategory';
import CreateProduct from './admin/CreateProduct';
import ManageProducts from './admin/ManageProducts';
import UpdateProduct from './admin/UpdateProduct';
import Order from './admin/Order';
import UserOrder from './user/UserOrder';
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
               <Route exact path="/signup" component={Signup}/>
               <Route exact path="/auth/activate/:token" component={Activate}/>
               <Route exact path="/auth/password/reset/:token" component={Reset}/>
               <Route exact path="/forgot/password" component={Forgot}/>
               <Route exact path="/shop" component={Shop}/>
               <Route exact path="/cart" component={Cart}/>
               <Route exact path="/product/:productId" component={Product}/>
               <PrivateRoute exact path="/user/dashboard" component={UserDashboard}/>
               <PrivateRoute exact path="/user/profile/update" component={UpdateProfile}/>
               <PrivateRoute exact path="/user/change/password" component={Password}/>
               <PrivateRoute exact path="/checkout" component={Checkout}/>
               <PrivateRoute exact path="/checkout/payment/:id" component={Payment}/>
               <PrivateRoute exact path="/user/order" component={UserOrder}/>
               <PrivateRoute exact path="/add/address" component={AddAddress}/>
               <PrivateRoute exact path="/address/edit/:id" component={UpdateAddress}/>
               <AdminRoute exact path="/admin/dashboard" component={AdminDashboard}/>
               <AdminRoute exact path="/create/category" component={CreateCategory}/>
               <AdminRoute exact path="/create/product" component={CreateProduct}/>
               <AdminRoute exact path="/admin/orders" component={Order}/>
               <AdminRoute exact path="/admin/manage/products" component={ManageProducts}/>
               <AdminRoute exact path="/admin/product/update/:id" component={UpdateProduct}/>
             </Switch>
             <Footer />
           </div>
        </Router>
      </Provider>
    )
  }
}

export default App;
