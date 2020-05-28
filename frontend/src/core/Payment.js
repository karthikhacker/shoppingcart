import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Layout from './Layout';
import {getCart} from './cartHelper';
import DropIn from "braintree-web-drop-in-react";


const Payment = ({match}) => {
  //state
  const [carts,setCarts] = useState(getCart());
  const [paymentData,setPaymentData] = useState({
     clientToken : null,
     instance : {},
     address : match.params.id
  })
  const [error,setError] = useState("")
  const [success,setSuccess] = useState("");

  //useEffect
  useEffect(() => {
     getToken()
  },[])
  //get token
  const getToken = () => {
    axios.get('http://localhost:4000/api/braintree/token')
     .then(res => {
        //console.log(res.data)
        setPaymentData({ clientToken : res.data.clientToken })
     })
     .catch(error => {
        setError(error)
     })
  }

  //cart total
  const cartTotal = () => {
    //console.log(carts)
     return carts.reduce((a,b) => {
        return a + (b.quantity*b.price)
     },0)
  }

  // processPayment
  const processPayment = (payload) => {
    axios.post('http://localhost:4000/api/braintree/payment',payload)
     .then(res => {
        console.log(res.data)
        setSuccess(res.data.success)
     })
     .catch(error => {
        setError(error)
     })
  }

  //buy
  const buy = () => {
    let nonce;
    let getNonce = paymentData.instance.requestPaymentMethod()
     .then(res => {
       //console.log(res)
       nonce = res.nonce
       //console.log(nonce)
       const payload = {
         paymentMethodNonce : nonce,
         amount : cartTotal()
       }
       //process payment
       processPayment(payload)
     })
     .catch(error => {
        setError(error)
     })
  }

  return(
     <div className="section">
       <Layout />
       {success ? <div className=" text-center alert alert-success"><p>Payment successfull <span className="pull-right">&#10004;</span></p></div> : null}
       <div className="container">
          <div className="row">
             <div className="col-lg-6">
             {paymentData.clientToken ? <div>
               <DropIn
                  options={{ authorization: paymentData.clientToken, paypal : { flow : "valut"} }}
                  onInstance={(instance) => (paymentData.instance = instance)}
                />
                <button onClick={buy} className="btn btn-primary btn-block">Pay</button>
               </div>  : null}
             </div>
             <div className="col-lg-4">
                 bag total : <span>$ {cartTotal()}</span>
             </div>
          </div>
       </div>
     </div>
  )
}
export default Payment;
