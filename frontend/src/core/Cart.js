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
   //handleChange
   const handleChange = index => event => {
      //console.log(productId)
      let updateCartItem = carts;
      if(event.target.value >=1){
        if(event.target.value === 0){
          updateCartItem[index].quantity = 1
        }else{
          updateCartItem[index].quantity = event.target.value
        }
        setCarts([...updateCartItem])
        updateItem(index,event.target.value)
      }else{
        return 0;
      }

   }
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
        <div className="row">
           <div className="col-xs-6 col-lg-8">
            { carts.map((cart,index) => (
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
                        <p>
                           <label>Qty</label>
                           <input type="number" className="form-control" value={cart.quantity} onChange={handleChange(index)}/>
                        </p>
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
           }
           </div>
           <div className="col-xs-2 col-lg-4">
              {carts.length > 0 ? <Checkout products={carts}/> : null}
           </div>
        </div>


      )
   }
   return(
      <div className="section">
        <Layout products={carts}/>
        <div className="container">
         {carts.length > 0 ? <p>Your bag has {carts.length} items</p> : <p className="text-center">Your bag is empty</p>}
         {renderCartItem(carts)}
        </div>
      </div>
   )
}
export default Cart;
