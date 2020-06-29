import React,{useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import ImageCarousel from './ImageCarousel';
import {addItem} from './cartHelper';
import { FaDollarSign } from "react-icons/fa";

const Card = ({product,history,carts}) => {
  const [redirect,setRedirect] = useState(false);

  return(
      <Link to={`/product/${product._id}`} className="link">
        <div className="thumbnail">
          <ImageCarousel product={product}/>
          <div className="caption">
            <h4>{product.name}</h4>
            {product.price ?  <p>
                               <span className="dollar">&#36;</span> <span className="price">{product.price}</span>
                             </p>  : ''}
          </div>
        </div>
      </Link>
  )
}
export default Card;
