import React,{useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import ImageCarousel from './ImageCarousel';
import {addItem} from './cartHelper';

const Card = ({product,history,carts}) => {
  const [redirect,setRedirect] = useState(false);

  return(
      <div className="thumbnail">
        <ImageCarousel product={product}/>
        <div className="caption">
          <h3>{product.name}</h3>
          <p>{product.price ? <span>$ {product.price}</span> : ''}</p>
          <hr />
          <p>
           <span><Link className="btn btn-warning btn-sm" to={`/product/${product._id}`}>View product</Link></span>
          </p>
        </div>
      </div>

  )
}
export default Card;
