import React from 'react';
import axios from 'axios';
import Checkbox from './Checkbox';
import RadioBox from './RadioBox';
import { prices } from './FixedPrice';
import Card from './Card';

class Shop extends React.Component{
  state = {
    products : [],
    categories : [],
    loading : false,
    error : {},
    myFilters : {
      category : [],
      price : []
    },
    skip : 0,
    limit : 6
  }
  //get categories
  getCategories = () => {
    this.setState({ loading : true })
    axios.get('http://localhost:4000/api/categories')
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
    axios.post('http://localhost:4000/api/products/by/search',variables)
     .then(res => {
       console.log(res.data);
        this.setState({ products : res.data.product })
     })
     .catch(error => {
       console.log(error);
     })
  }
  //Lifecycle method
  componentDidMount(){
    this.getCategories();
    this.getProducts()
  }
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
    console.log('array',array);
    return array;
  }
  // load filter results

  render(){
  //  console.log(this.state.products);
    return(
       <div className="section">
         <div className="jumbotron">
            <input type="text" className="form-control"/>
         </div>
         <div className="container-fluid">
           <div className="row">
             <div className="col-sm-3">
               <h3>Filter by categories</h3>
               <Checkbox handleFilters={filters => this.handleFilters(filters,'category')}  categories={this.state.categories} />
               <h3>Filter by Price</h3>
               <RadioBox handleFilters={filters => this.handleFilters(filters,'price')}  prices={prices} />
             </div>
             <div className="col-sm-9">
                <h3 className="text-center">Products</h3>
                <div className="row">
                  {
                    this.state.products.length > 0 ? this.state.products.map((product) => (
                      <Card product={product} key={product._id}/>
                    )) : <p className="text-center lead">No products</p>
                  }
                </div>
             </div>
           </div>
         </div>
       </div>
    )
  }
}
export default Shop;
