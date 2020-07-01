import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Layout from './Layout';
import {getCart} from './cartHelper';
import DropIn from "braintree-web-drop-in-react";


const Payment = ({match}) => {
  //state
  const [carts,setCarts] = useState([]);
  const [paymentData,setPaymentData] = useState({
     clientToken : null,
     instance : {}
  })
  const [address,setAddress] = useState("")
  const [error,setError] = useState("")
  const [success,setSuccess] = useState("");

  //useEffect
  useEffect(() => {
     setAddress( match.params.id)
     setCarts(getCart())
     getToken()
  },[])
  //get token
  const getToken = () => {
    axios.get('/api/braintree/token')
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

  //create order
  const createOrder = (orderData) => {
    //console.log(orderData)
     axios.post('/api/order/create',orderData)
     .then(res => {
        console.log(res.data)
         if(res.data){
           //empty cart
            if(typeof window !== "undefined"){
              localStorage.removeItem("cart")
            }
         }
     })
     .catch(error => {
        setError(error)
     })
  }

  // processPayment
  const processPayment = (payload) => {
    axios.post('/api/braintree/payment',payload)
     .then(res => {
        //console.log(res.data)
        setSuccess(res.data.success)
        //create order
        const orderData = {
           products : carts,
           transaction_id : res.data.transaction.id,
           amount : res.data.transaction.amount,
           address : address
        }
        createOrder(orderData)
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

  const showError = () => {
    return(
      <div>
        {error ? <p className="text-danger text-center">{error.message}</p> : ""}
      </div>
    )
  }


  return(
     <div className="section">
       <Layout products={carts}/>
       <div className="jumbotron">
         <h2 className="text-center">Payment</h2>
       </div>
       {showError()}
       {success ? <div className=" text-center alert alert-success"><p>Payment successfull <span className="pull-right">&#10004;</span></p></div> : null}
       <div className="container">
          <div className="row">
             <div className="col-xs-8 col-lg-6">
             {paymentData.clientToken ? <div>
               <DropIn
                  options={{ authorization: paymentData.clientToken, paypal : { flow : "valut"} }}
                  onInstance={(instance) => (paymentData.instance = instance)}
                />
                <button onClick={buy} className="btn btn-primary btn-block">Pay</button>
               </div>  : null}
             </div>
             <div className=" col-xs-4 col-lg-4">
                 <div className="cartTotal">
                   <span className="text-bold">bag total</span> : <span className="price pull-right">&#36; {cartTotal()}</span>
                 </div>
             </div>
          </div>
       </div>
     </div>
  )
}
export default Payment;
