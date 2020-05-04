import React,{useState,useEffect} from 'react';
import axios from 'axios';
import ImageCarousel from './ImageCarousel';
import Card from './Card';

const Product = (props) => {
  const [product,setProduct] = useState({});
  const [error, setError] = useState(false);
  const [similarProduct,setSimilarProduct] = useState([]);

  //loadProduct
  const loadProduct = (productId) => {
    axios.get(`http://localhost:4000/api/product/${props.match.params.productId}`)
      .then(res => {
        //console.log(res.data)
        if(res.data){
          setProduct(res.data)
          //similar product
          axios.get(`http://localhost:4000/api/products/related/${res.data._id}`)
            .then(res => {
              console.log(res.data)
              setSimilarProduct(res.data)
            })
        }
      })
  }
  useEffect(() => {
    loadProduct(props.match.params.productId)
  },[props]);
  return(
    <div className="section">
       <div className="container">
          <div className="row">
            <div className="col-sm-4 col-md-6 col-lg-4">
                {product && product.productImage &&  <ImageCarousel product={product}/> }
            </div>
            <div className="col-sm-4 col-md-6 col-lg-4">
              {product && product.name && <div className="page-header"><h2>{product.name}</h2></div>}
              {product && product.price && <p className="lead">&#36; {product.price}</p>}
              {product && product.category && <p>Category : {product.category.name}</p>}
              {product && product.description && <p>{product.description}</p>}
              {product && product.quantity > 0 ?  <p className="label label-primary">In stock</p> : <p className="label label-danger">Out of stock</p>}
              <br />
              <br />
              {product && <p><button className="btn btn-success">Add to cart</button></p>}
            </div>
          </div>
       </div>
       <div className="container">
         <h4>SIMILAR PRODUCT</h4>
         <div className="row">
           {similarProduct.map((product) => (
             <div className="col-sm-1 col-md-2 col-lg-4" key={product._id}>
                <Card product={product}/>
             </div>
           ))}
         </div>
       </div>
    </div>
  )
}
export default Product;
