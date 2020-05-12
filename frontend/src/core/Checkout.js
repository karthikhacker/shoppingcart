import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {Link,Redirect} from 'react-router-dom';
import DropIn from "braintree-web-drop-in-react";
import {emptyCart} from './cartHelper';

const Checkout = ({products,auth}) => {
  //state
  const [data,setData] = useState({
    success : false,
    clientToken : null,
    error : '',
    instance : {},
    address : ''
  })
  //getBrainteeetoken
  const getBraintreeToken = () => {
    axios.get('http://localhost:4000/api/braintree/getToken')
     .then(res => {
         console.log(res.data)
         setData({clientToken : res.data.clientToken})
     })
     .catch(error => {
        console.log(error)
     })
  }
  //useEffect
  useEffect(() => {
     getBraintreeToken()
  },[])
  //Buy
  const buy = () => {
    let nonce;
    let getNonce = data.instance.requestPaymentMethod()
     .then(data => {
        //console.log(data)
        nonce = data.nonce;
        //console.log(nonce,cartTotal(products))
        const paymentData = {
          paymentMethodNonce : nonce,
          amount : cartTotal(products)
        }
        //processPayment
        axios.post('http://localhost:4000/api/braintree/payment',paymentData)
         .then(res => {
            //console.log(res.data)
            setData({...res.data,success : res.data.success})
            //empty cart
            
         })
         .catch(error => {
            console.log(error)
         })
     })
     .catch(error => {
        console.log(error)
     })
  }
  //showSuccess
   const showSuccess = (success) => {
      return(
        <div className="alert alert-success" style={{ display : success ? "" : "none" }}>
          Thanks your payment received
        </div>
      )
   }
  //showDropIn
  const showDropIn = () => (
    <div>
     {data.clientToken !== null && products.length > 0 ? (
         <div>
           <DropIn
             options={{ authorization : data.clientToken }}
             onInstance={(instance) => data.instance = instance }
           />
           <button onClick={buy} className="btn btn-success btn-block">Pay</button>
         </div>
     ) : null
   }
    </div>
  )
  //cart total
  const cartTotal = () => {
     return products.reduce((a,b) => {
        return a + (b.quantity*b.price)
     },0)
  }
  return(
       <div className="total">
         {showSuccess(data.success)}
         <p>Bag total : <span className="pull-right"> $ {cartTotal()}</span></p>
         {auth.isAuthenticated ? (
           <span>{showDropIn()}</span>
         ) : (
           <Link className="btn btn-danger" to="/signin">Login to place order</Link>
         )}
       </div>
  )
}
const mapStateToProps = (state) => {
  return{
    auth : state.auth
  }
}
export default connect(mapStateToProps)(Checkout);
