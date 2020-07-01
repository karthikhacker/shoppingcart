import React,{useState,useEffect} from 'react';
import Layout from './Layout';
import {Redirect,Link} from 'react-router-dom';
import axios from 'axios';
import ImageCarousel from './ImageCarousel';
import Card from './Card';
import {addItem,totalItem} from './cartHelper';
import Loading from './Loading';
import { FaDollarSign,FaCartPlus } from "react-icons/fa";


const Product = (props) => {
  const [product,setProduct] = useState({});
  const [carts,setCarts] = useState(totalItem() || [])
  const [goToCart,setGoToCart] = useState(false)
  const [error, setError] = useState(false);
  const [similarProduct,setSimilarProduct] = useState([]);
  const [redirect,setRedirect] = useState(false);
  const [loading,setLoading] = useState(false);


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
    setLoading(true)
    axios.get(`/api/product/${props.match.params.productId}`)
      .then(res => {
        //console.log(res.data)
        if(res.data){
          setProduct(res.data)
          //similar product
          axios.get(`/api/products/related/${res.data._id}`)
            .then(res => {
              //console.log(res.data)
              setSimilarProduct(res.data)
              setLoading(false)
            })
        }
      })
  }
  useEffect(() => {
    loadProduct(props.match.params.productId)
  },[props]);

  const renderData = () => {
    return(
      <div className="main">
        <div className="container">
           {shouldRedirect(redirect)}
           <div className="row">
             <div className="col-sm-4 col-md-6 col-lg-8">
                 {product && product.productImage &&  product.productImage.map((img,index) => (
                    <img src={`http://localhost:4000/${img}`} key={index} className="product-zoom-image"/>
                 )) }
             </div>
             <div className="col-sm-4 col-md-6 col-lg-4">
               {product && product.name && <div className="page-header"><h2>{product.name}</h2></div>}
               {product && product.price && <div className="product-price"><span className="dollar">&#36;</span> <span className="price">{product.price}</span>  </div>}
               {product && product.category && <div className="categoryName"><p>Category : {product.category.name}</p></div>}
               {product && product.description && <div className="productDescription"><p>{product.description}</p></div>}
               {product && product.quantity > 0 ? <div className="productStock"><p className="label label-primary">In stock</p></div> : <div className="productStock"><p className="label label-danger">Out of stock</p></div> }
               <br />
               <br />
                { goToCart ?  <div className="cart-btn"><p className="lead"><Link to="/cart" className="btn btn-warning btn-block btn-lg">GO TO BAG  &#8594;</Link></p></div> : <div className="cart-btn"><p><button onClick={addToCart}  className="btn btn-success btn-block btn-lg "><span className="react-icons"><FaCartPlus /></span>  ADD TO BAG</button></p></div>}
             </div>
           </div>
        </div>
        <div className="container similarProduct">
          <div className="page-header">
            <h4>SIMILAR PRODUCT</h4>
          </div>
          <div className="row">
            { similarProduct.length > 0 ?  similarProduct.map((product) => (
              <div className="col-sm-1 col-md-2 col-lg-4" key={product._id}>
                 <Card product={product}/>
              </div>
            )) : <div className="col-xs-4 col-md-4 col-lg-12"><p className="text-center">NO SIMILAR PRODUCTS</p></div>}
          </div>
        </div>
      </div>
    )
  }
  return(
    <div className="section">
       <Layout products={carts}/>
       {loading ? <Loading /> : renderData() }

    </div>
  )
}
export default Product;
