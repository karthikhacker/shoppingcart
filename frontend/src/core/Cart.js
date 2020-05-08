import React,{useState,useEffect} from 'react';
import Layout from './Layout';
import {Link} from 'react-router-dom';
import {getCart,updateItem} from './cartHelper';
import Checkout from './Checkout';

const Cart = () => {
   //useState
   const [carts,setCarts] = useState([])
   //useEffect
   useEffect(() => {
      setCarts(getCart())
   },[])
   //RemoveItem
   const removeItem = (cartId) => {
      //console.log(carts)
     let cart = carts.filter(cart => cart._id !== cartId)
     localStorage.setItem('cart',JSON.stringify(cart))
     setCarts(cart)
   }
   //render cart item
   const renderCartItem = (carts) => {
      return(
        carts.map((cart,index) => (
          <div className="panel panel-default" key={cart._id}>
            <div className="panel-heading">
              <h3>{cart.name}</h3>
            </div>
            <div className="panel-body">
              <div className="row">
                 <div className="col-xs-4 col-lg-3">
                    <Link to={`/product/${cart._id}`}>
                      <img src={`http://localhost:4000/${cart.productImage[0]}`} alt="Product image" style={{width : "100%"}}/>
                    </Link>
                 </div>
                 <div className="col-xs-4">
                   <p>{cart.description}</p>
                 </div>
                 <div className="col-xs-4">
                   <span className="text-center">$ {cart.price}</span>
                 </div>
              </div>
            </div>
            <div className="panel-footer">
              <button href="#" onClick={() => {removeItem(cart._id)}}  className="btn btn-danger btn-sm">REMOVE</button>
            </div>
          </div>
        ))
      )
   }
   return(
      <div className="section">
        <Layout />
        <div className="container">
          <div className="row">
            <div className="col-xs-6 col-md-6 col-lg-8">
              {carts.length > 0 ? <h4>Your bag has {carts.length} items</h4> : <h4>Your bag is empty</h4>}
              {renderCartItem(carts)}
            </div>
          </div>
        </div>
      </div>
   )
}
export default Cart;
