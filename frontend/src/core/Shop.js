import React from 'react';
import Layout from './Layout';
import axios from 'axios';
import Checkbox from './Checkbox';
import RadioBox from './RadioBox';
import { prices } from './FixedPrice';
import Card from './Card';
import Loading from './Loading';

class Shop extends React.Component{
  state = {
    products : [],
    categories : [],
    loading : false,
    error : {},
    skip : 0,
    size : 0,
    limit : 6,
    myFilters : {
      category : [],
      price : []
    }
  }
  //Lifecycle method
  componentDidMount(){
    this.getCategories();

    this.getProducts()
  }

  //get categories
  getCategories = () => {
    this.setState({ loading : true })
    axios.get('/api/categories')
     .then(res => {
       //console.log(res.data)
       this.setState({
         categories : res.data,
         loading : false,
       })
     })
     .catch(error => {
       console.log(error)
       this.setState({
         error : error.response.data,
         loading : false
       })
     })
  }

  //get products

  getProducts = (variables) => {
    //console.log(data)
    axios.post('/api/products/by/search',variables)
     .then(res => {
       //console.log(res.data.size);
        this.setState({...this.state.products, products : res.data.product, size : res.data.size })
     })
     .catch(error => {
       console.log(error);
     })
  }
  // Load more
  loadMore = () => {
    this.setState({
      limit : this.state.limit + 4
    })
  }
   //load more button
   loadMoreButton = () => {
        return (
            this.state.limit <
            this.state.products.length && (
                <button onClick={this.loadMore} className="btn btn-warning btn-sm">
                    Load more
                </button>
            )
        );
    };

  //showFilterResults
  showFilterResults = (filters) => {
   const variables = {
     filters : filters
   }
   this.getProducts(variables);
  }
  //handle filters
   handleFilters = (filters,category) => {
     console.log(filters)
     const newFilters = {...this.state.myFilters};
     newFilters[category] = filters;
     if(category === "price"){
        let priceValue = this.handlePrice(filters);
        newFilters[category] = priceValue
     }
     this.showFilterResults(newFilters)
     this.setState({ myFilters : newFilters })
   }
  //handlePrice
  handlePrice = (value) => {
    const data = prices;
    let array = [];
    for(let key in data){
      if(data[key]._id === parseInt(value,10)){
         array = data[key].array;
      }
    }
    //console.log('array',array);
    return array;
  }
  // load filter results

  render(){
   //console.log(this.state.size);
    return(
       <div className="section">
         <Layout />
         <div className="container">
           <div className="row">
             <div className="col-xs-12 col-md-12 col-lg-12">
                {this.state.products.length > 0 ? <h5> No of products - {this.state.products.length}</h5> : null}
                <hr />
             </div>
           </div>
           <div className="row">
             <div className=" col-xs-4 col-md-6  col-sm-3 col-lg-3 side-bar">
                 <h5>Filter by categories</h5>
               <Checkbox handleFilters={filters => this.handleFilters(filters,'category')} loading={this.state.loading}  categories={this.state.categories} />
                <h5>Filter by price</h5>
               <RadioBox handleFilters={filters => this.handleFilters(filters,'price')}  prices={prices} />
             </div>
             <div className="col-xs-8 col-md-6 col-lg-9 main-content">
                {this.state.loading ? <Loading /> : <div className="row">
                  {
                    this.state.products.length > 0 ? this.state.products.slice(0,this.state.limit).map((product) => (
                      <div className="col-xs-6 col-sm-4 col-md-4 col-lg-3" key={product._id}>
                       <Card product={product} />
                      </div>
                    )) : <p className="text-center lead">No products</p>
                  }
                </div>}
                {this.loadMoreButton()}
             </div>
           </div>
         </div>
       </div>
    )
  }
}
export default Shop;
