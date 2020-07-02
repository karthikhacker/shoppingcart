import React,{useState} from 'react';
import {connect} from 'react-redux';
import Layout from './Layout';
import {Link} from 'react-router-dom';
import {getCart,updateItem} from './cartHelper';

const Cart = ({ auth }) => {
   //useState
   const [carts,setCarts] = useState(getCart())
   //useEffect

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
   //cart total
   const cartTotal = () => {
     console.log(carts)
      return carts.reduce((a,b) => {
         return a + (b.quantity*b.price)
      },0)
   }
   //render cart item
   const renderCartItem = (carts) => {
      return(
        <div className="row">
          <div className="col-xs-8 col-lg-6">
            { carts.length !== 0 ?  carts.map((cart,index) => (
               <div className="panel panel-default" key={cart._id}>
                 <div className="panel-body">
                   <div className="row">
                      <div className="col-xs-3 col-lg-3">
                         <Link to={`/product/${cart._id}`} className="link">
                           <img src={`${cart.productImage[0]}`} alt="Product image" style={{width : "100%"}}/>
                         </Link>
                      </div>
                      <div className="col-xs-6">
                        <h5>{cart.name}</h5>
                        <p>
                           <label>Qty</label>
                           <input type="number" className="form-control" value={cart.quantity} onChange={handleChange(index)}/>
                        </p>
                      </div>
                      <div className="col-xs-3">
                        <span className="pull-right">$ {cart.price}</span>
                      </div>
                   </div>
                 </div>
                 <div className="panel-footer">
                   <button href="#" onClick={() => {removeItem(cart._id)}}  className="btn btn-danger btn-sm">REMOVE</button>
                 </div>
               </div>
             )) : null
           }
          </div>
          <div className="col-xs-4 col-lg-6">
            {carts.length > 0 && (
              <div className="details">
                <p>
                  <span>Bag total</span> <span className="pull-right dollar">&#36; {cartTotal()}</span>
                </p>
                 <hr />
                <p>{auth.isAuthenticated  ? <Link className="btn btn-success" to="/checkout">Checkout</Link> : <Link className="btn btn-success" to="/signin">Login to checkout</Link>}</p>
             </div>
            )}
          </div>
        </div>
      )
   }
   return(
      <div className="section">
        <Layout products={carts}/>
        <div className="container">
         {carts.length > 0 ? <div className="page-header"><p>Your bag has ({carts.length}) items</p></div> : <p className="text-center">Your bag is empty</p>}
          {renderCartItem(carts)}
        </div>
      </div>
   )
}
const mapStateToProps = (state) => {
  return{
    auth : state.auth
  }
}
export default connect(mapStateToProps)(Cart);
