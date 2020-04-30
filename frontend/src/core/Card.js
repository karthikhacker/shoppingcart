import React from 'react';
import {Link} from 'react-router-dom';
import ImageCarousel from './ImageCarousel';

const Card = ({product}) => {
  return(
    <div className="col-sm-3">
      <div className="thumbnail">
        <ImageCarousel product={product}/>
        <div className="caption">
          <h3>{product.name}</h3>
          <p>{product.price ? <span>$ {product.price}</span> : ''}</p>
          <p>
           <span><Link className="btn btn-warning btn-sm" to={`/product/${product._id}`}>View product</Link></span>
           <span><button className="btn btn-info btn-sm">Add to cart</button></span>
          </p>
        </div>
      </div>
    </div>
  )
}
export default Card;
