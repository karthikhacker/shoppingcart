import React from 'react';
import Layout from './Layout';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Card from './Card';
import Search from './Search';

class Home extends React.Component{
  state = {
     productBySell : [],
     productByArrival : [],
     products : [],
     visibleProducts : [],
     error : false,
     loading : false,
     searchTerms : ''
  }
  //get product by sell
  loadProductBySell = () => {
    this.setState({ loading : true})
    axios.get('http://localhost:4000/api/products/sell')
     .then(res => {
        this.setState({
          productBySell : res.data,
          loading : false
        })
     })
     .catch(error => {
        this.setState({
           error : error.response.data,
           loading : false
        })
     })
  }
  // load products by arrival
  loadProductByArrival  = () => {
    this.setState({ loading : true })
    axios.get('http://localhost:4000/api/products/latest')
     .then(res => {
        this.setState({
          productByArrival : res.data,
          loading : false
        })
     })
     .catch(error => {
        this.setState({
           error : error.response.data,
           loading : false
        })
     })
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
    this.loadProductBySell()
    this.loadProductByArrival()
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
    console.log(this.state.visibleProducts);
    return(
       <div className="section">
          <Layout />
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
          
          <div className="container">
           <div className="page-header">
              <h3>New arrivals</h3>
            </div>
            <div className="row">
              {this.state.productByArrival.map((product) => (
                <div className="col-sm-12 col-md-6 col-lg-3" key={product._id}>
                 <Card key={product._id} product={product}/>
                </div>
              ))}
            </div>
          </div>
          <div className="container">
            <div className="page-header">
               <h3>Best sellers</h3>
            </div>
             <div className="row">
              {this.state.productBySell.map((product) => (
                <div className="col-sm-12 col-md-6 col-lg-3" key={product._id}>
                 <Card key={product._id} product={product}/>
                </div>
              ))}
             </div>
          </div>
       </div>
    )
  }
}
export default Home
