import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

const Checkout = ({products,auth}) => {
  //cart total
  const cartTotal = () => {
     return products.reduce((a,b) => {
        return a + (b.quantity*b.price)
     },0)
  }
  return(
       <div className="total">
         <p>Bag total : <span className="pull-right"> $ {cartTotal()}</span></p>
         <p>{auth.isAuthenticated ? (
           <button className="btn btn-success">Place order</button>
         ) : (
           <Link className="btn btn-danger" to="/signin">Login to place order</Link>
         )}</p>
       </div>
  )
}
const mapStateToProps = (state) => {
  return{
    auth : state.auth
  }
}
export default connect(mapStateToProps)(Checkout);
