import React from 'react';
import axios from 'axios';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import moment from 'moment';

class Product extends React.Component{
  state = {
    product : [],
    error : false
  }
  //getProduct
  getProduct = () => {
    const productId = this.props.match.params.productId;
    axios.get(`http://localhost:4000/api/product/${productId}`)
       .then(res => {
         //console.log(res.data)
         this.setState({
            product : res.data
         })
       })
       .catch(error => {
         console.log(error)
         this.setState({
           error : error.response.data
         })
       })
  }
  componentDidMount(){
    this.getProduct()
  }
  //show stock
  showStock = (qty) => {
    //console.log(qty);
    return qty > 0 ? <span className="label label-primary">In stock</span> : <span className="label label-danger">Out of stock</span>
  }

  render(){
    console.log(this.state.product)

    return(
      <div className="section">
        <div className="container">
          <div className="row">
             <div className="col-sm-4">
               <Carousel>
                 {this.state.product && this.state.product.productImage  &&  this.state.product.productImage.map((image,index) => (
                   <img src={`http://localhost:4000/${image}`} key={index}/>
                 ))}
               </Carousel>

             </div>
             <div className="col-sm-4">
               {this.state.product && this.state.product.name && <h1>{this.state.product.name}</h1>}
               <hr />
               {this.state.product && this.state.product.price && <p> $ {this.state.product.price}</p>}
               {this.state.product && this.state.product.description && <p>{this.state.product.description}</p>}
               {this.state.product && this.state.product.category && <p> Category : {this.state.product.category.name}</p>}
               {this.state.product && this.state.product.createdAt && <p> Created date : {moment(this.state.product.createdAt).fromNow()}</p>}
               {this.showStock(this.state.product.quantity)}
               <br/>
               <br/>
               {this.state.product && <button className="btn btn-primary btn-sm">Add to cart</button>}
             </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Product;
