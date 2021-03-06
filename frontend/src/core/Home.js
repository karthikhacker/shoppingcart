import React from 'react';
import Layout from './Layout';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Card from './Card';
//import Footer from './Footer';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Search from './Search';
import Loading from './Loading';
import image1 from '../assests/image1.jpg'
import image2 from '../assests/image2.jpg'
import image3 from '../assests/image3.jpg'
import image4 from '../assests/image4.jpg'

class Home extends React.Component{

  state = {
     latestProducts : [],
     products : [],
     visibleProducts : [],
     error : "",
     loading : false,
     searchTerms : ''
  }

  componentDidMount(){
    this.latestProducts()
    this.getProducts()
  }

  //get products
  getProducts = () => {
    axios.get('/api/products')
     .then(res => {
       //console.log(res.data)
       this.setState({ products : res.data })
     })
     .catch(error => {
       console.log(error)
     })
  }

  //latest products
   latestProducts = () => {
     this.setState({ loading : true})
     axios.get('/api/products/latest')
      .then(res => {
         console.log(res.data)
         this.setState({ latestProducts : res.data, loading : false })
      })
      .catch(error => {
         this.setState({ error : error.response.data, loading:false })
      })
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

  //render latest productList
  renderLatestProducts = () => {
    return(
      <div className="row">
        {
          this.state.latestProducts.map((pro) => (
            <div className="col-xs-6 col-md-6 col-lg-3" key={pro._id}>
              <Card product={pro}/>
            </div>
          ))
        }
      </div>
    )
}

  //showLoading
  showLoading = () => {
     return(
       this.state.loading ? <Loading /> : this.renderLatestProducts()
     )
  }

  render(){
    return(
       <div className="section">
          <Layout products={this.state.carts}/>
           <div className="page-header">
            <div className="container">
               <Search updateSearch={this.handleUpdate}/>
               <ul className="list-group search-list">
               {
                   this.state.visibleProducts.map((product) => (
                    <Link to={`/product/${product._id}`} key={product._id} className="link">
                      <li className="list-group-item" >
                       <img  src={`http://localhost:4000/${product.productImage[0]}`} className="search-img" alt="search"/> <span className="product-name">{product.name}</span>
                      </li>
                    </Link>
                  ))
               }
               </ul>
            </div>
          </div>
          <div className="container carousel-container">
            <div className="row">
              <div className="col-lg-12">
                <Carousel
                  showThumbs={false}
                  infiniteLoop={true}
                  autoPlay={true}
                >
                     <div>
                         <img src={image1}  alt="image1"/>
                     </div>
                     <div>
                         <img src={image2} alt="image2"/>
                     </div>
                     <div>
                         <img src={image3} alt="image3"/>
                     </div>
                     <div>
                         <img src={image4} alt="image4"/>
                     </div>
                 </Carousel>
              </div>
            </div>
          </div>
          <div className="container latest-products">
            <div className="page-header">
              <h4>LATEST PRODUCTS</h4>
            </div>
             {this.showLoading()}
             {this.state.latestProducts.length > 0 ? null : <p className="text-centert">No products</p>}
          </div>
       </div>
    )
  }
}
export default Home
