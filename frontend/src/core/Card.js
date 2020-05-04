import React,{useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import ImageCarousel from './ImageCarousel';
import {addItem} from './cartHelper';

const Card = ({product}) => {
  const [redirect,setRedirect] = useState(false);

  //Add to cart
  const addToCart = () => {
     addItem(product, () => {
        setRedirect(true)
     })
  }
  //redirect user
  const shouldRedirect = (redirect) => {
    if(redirect){
      return <Redirect to="/cart" />
    }
  }
  return(
      <div className="thumbnail">
        {shouldRedirect(redirect)}
        <ImageCarousel product={product}/>
        <div className="caption">
          <h3>{product.name}</h3>
          <p>{product.price ? <span>$ {product.price}</span> : ''}</p>
          <p>
           <span><Link className="btn btn-warning btn-sm" to={`/product/${product._id}`}>View product</Link></span>
           <span><button onClick={addToCart} className="btn btn-info btn-sm">Add to cart</button></span>
          </p>
        </div>
      </div>

  )
}
export default Card;
