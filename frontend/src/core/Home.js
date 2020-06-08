import React from 'react';
import Layout from './Layout';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Card from './Card';
import Search from './Search';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

class Home extends React.Component{

  state = {
     products : [],
     visibleProducts : [],
     error : false,
     loading : false,
     searchTerms : ''
  }

  //get products
  getProducts = () => {
    axios.get('http://localhost:4000/api/products')
     .then(res => {
       //console.log(res.data)
       this.setState({ products : res.data })
     })
     .catch(error => {
       console.log(error)
     })
  }
  componentDidMount(){

    this.getProducts()
  }
  //handleUpdate
  handleUpdate = (newSearchTerm) => {
    this.setState({ searchTerms : newSearchTerm })
    //console.log(newSearchTerm);
    const queryData = [];
     if(newSearchTerm !== ''){
       this.state.products.forEach(function(product){
         if(product.name.toLowerCase().indexOf(newSearchTerm) !== -1){
           if(queryData.length < 10){
             queryData.push(product)
           }
         }
       })
       //this.setState({  })
     }
     this.setState({ visibleProducts : queryData })
  }

  render(){
    //console.log(this.state.carts);
    return(
       <div className="section">
          <Layout products={this.state.carts}/>
          <div className="jumbotron">
            <div className="container">
               <Search updateSearch={this.handleUpdate}/>
               <ul className="list-group">
               {
                   this.state.visibleProducts.map((product) => (
                    <Link to={`/product/${product._id}`} key={product._id} className="search-link">
                      <li className="list-group-item" >
                       <img  src={`http://localhost:4000/${product.productImage[0]}`} className="search-img"/> {product.name}
                      </li>
                    </Link>
                  ))
               }
               </ul>
            </div>
          </div>
       </div>
    )
  }
}
export default Home
