import React,{useState,useEffect} from 'react';
import Layout from './Layout';
import {Redirect,Link} from 'react-router-dom';
import axios from 'axios';
import ImageCarousel from './ImageCarousel';
import Card from './Card';
import {addItem,totalItem} from './cartHelper';


const Product = (props) => {
  const [product,setProduct] = useState({});
  const [carts,setCarts] = useState(totalItem() || [])
  const [goToCart,setGoToCart] = useState(false)
  const [error, setError] = useState(false);
  const [similarProduct,setSimilarProduct] = useState([]);
  const [redirect,setRedirect] = useState(false);
  //Add to cart
  const addToCart = () => {
     addItem(product,() => {
        setCarts(product)
        setGoToCart(true)
        setRedirect(false)
     })
  }
  //redirect
  const shouldRedirect = redirect => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  }
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
              //console.log(res.data)
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
       <Layout products={carts}/>
       <div className="container">
          {shouldRedirect(redirect)}
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
               { goToCart ?  <p className="lead"><Link to="/cart" className="btn btn-warning">GO TO BAG  &#8594;</Link></p> : <p><button onClick={addToCart}  className="btn btn-success">Add to cart</button></p>}
            </div>
          </div>
       </div>
       <div className="container">
         <h4>SIMILAR PRODUCT</h4>
         <div className="row">
           { similarProduct.length > 0 ?  similarProduct.map((product) => (
             <div className="col-sm-1 col-md-2 col-lg-4" key={product._id}>
                <Card product={product}/>
             </div>
           )) : <p className="text-center lead">NO SIMILAR PRODUCTS</p>}
         </div>
       </div>
    </div>
  )
}
export default Product;
