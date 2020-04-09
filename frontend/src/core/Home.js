import React from 'react';
import axios from 'axios';
import Card from './Card';

class Home extends React.Component{
  state = {
     productBySell : [],
     productByArrival : [],
     error : false,
     loading : false
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
  componentDidMount(){
    this.loadProductBySell()
    this.loadProductByArrival()
  }
  render(){
    console.log(this.state.loading);
    return(
       <div className="section">
          <div className="container">
            <div className="page-header">
              <h3>New arrivals</h3>
            </div>
            <div className="row">
              {this.state.productByArrival.map((product) => (
                <Card key={product._id} product={product}/>
              ))}
            </div>
          </div>
          <div className="container">
            <div className="page-header">
               <h3>Best sellers</h3>
            </div>
             <div className="row">
              {this.state.productBySell.map((product) => (
                <Card key={product._id} product={product}/>
              ))}
             </div>
          </div>
       </div>
    )
  }
}
export default Home
