import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { createProduct } from '../actions';

class CreateProduct extends React.Component{
  //state
  state = {
    productImage : [],
    name : '',
    price : '',
    categories : [],
    category : '',
    description : '',
    stock : '',
    quantity : '',
    imageError : '',

  }
  //handleImage
  handleImage = (e) => {
    //console.log(e.target.files)
    const fd = new FormData();
    for(const key of Object.keys(e.target.files)){
      fd.append('file',e.target.files[key])
    }
    //axios
    axios.post('http://localhost:4000/api/product/image',fd)
     .then(res => {
        console.log(res.data)
        this.setState({
          productImage : res.data.images
        })
     })
     .catch(error => {
       this.setState({
          imageError : error.response.data
       })
     })
  }
  //get categories
  componentDidMount(){
    axios.get('http://localhost:4000/api/categories')
     .then(res => {
       this.setState({ categories : res.data})
     })
     .catch(error => {
        console.log(error)
     })
  }
  // handleName
  handleName = (e) => {
    this.setState({ name : e.target.value },() => {this.nameValidation()})
  }
  //handle price
  handlePrice = (e) => {
    this.setState({ price : e.target.value },() => {this.priceValidation()})
  }
  //handleCategory
  handleCategory = (e) => {
    this.setState({ category : e.target.value},() => {this.categoryValidation()})
  }
  handleDescription = (e) => {
    this.setState({ description : e.target.value },() => {this.descriptionValidation()})
  }
  handleStock = (e) => {
    this.setState({ stock : e.target.value }, () => {this.stockValidation()})
  }
  handleQuantity = (e) => {
    this.setState({ quantity : e.target.value })
  }
  // name validation
   nameValidation = () => {
     const { name } = this.state;
     let nameError;
     if(name === ''){
       nameError = 'Name is required'
     }
     this.setState({ nameError })
     return !nameError;
  }
  // price validation
  priceValidation = () => {
    const { price } = this.state;
    let priceError;
    if(price === ''){
      priceError = 'Price is required'
    }
    this.setState({ priceError })
    return !priceError;
  }
  // category validation
  categoryValidation = () => {
    const {category} = this.state;
    let categoryError;
    if(category === ''){
      categoryError = 'Category is required'
    }
    this.setState({ categoryError })
    return !categoryError
  }
  //description validation
  descriptionValidation = () => {
    const { description} = this.state;
    let descriptionError;
    if(description === ''){
      descriptionError = 'description is required'
    }
    this.setState({ descriptionError })
    return !descriptionError;
  }
  //stockValidation
  stockValidation = () => {
    const { stock } = this.state;
    let stockError;
    if(stock === ''){
      stockError = 'Stock is required'
    }
    this.setState({ stockError })
    return !stockError;
  }

  // handle submit
  handleSubmit = (e) => {
    e.preventDefault();
    const { name,category,productImage, price, description, stock, quantity }  = this.state;
    const validName = this.nameValidation();
    const validCategory = this.categoryValidation();
    const validPrice = this.priceValidation();
    const validDescription = this.descriptionValidation();
    const validStock = this.stockValidation();
    if(validName || validCategory || validPrice || validDescription || validStock){
      const data = {
        name,
        category,
        productImage,
        price,
        description,
        stock,
        quantity
      }
      this.props.createProduct(data);
      this.setState({
         name : '',
         category : '',
         price : '',
         description : '',
         productImage : [],
         stock : '',
         quantity : ''
      })
    }
  }
  //form
  form = () => {
    return(
      <form onSubmit={this.handleSubmit}>
        <div className="row">
          <div className="col-sm-4">
            <div className={classnames('form-group',{ 'has-error' : this.state.imageError })}>
              <label>Product image</label>
              <input onChange={this.handleImage} type="file" className="form-control" placeholder="Product image" multiple/>
              <span className="help-block">{this.state.imageError.message}</span>
            </div>
          </div>
          <div className="col-sm-4">
             <div className={classnames('form-group',{'has-error' : this.state.nameError})}>
                <label>Product name</label>
                <input onChange={this.handleName} value={this.state.name} type="text" className="form-control" placeholder="Product name"/>
                <span className="help-block">{this.state.nameError}</span>
             </div>
             <div className={classnames('form-group',{'has-error' : this.state.priceError})}>
                <label>Product price</label>
                <input onChange={this.handlePrice} value={this.state.price} type="number" className="form-control" placeholder="Product price"/>
                <span className="help-block">{this.state.priceError}</span>
             </div>
             <div className={classnames('form-group',{'has-error' : this.state.categoryError})}>
                <select className="form-control" onChange={this.handleCategory} value={this.state.category}>
                  <option>Product category</option>
                  {
                    this.state.categories.map((category) => (
                      <option key={category._id} value={category._id}>{category.name}</option>
                    ))
                  }
                </select>
                <span className="help-block">{this.state.categoryError}</span>
             </div>
             <div className={classnames('form-group',{'has-error' : this.state.descriptionError})}>
                <label>Product description</label>
                <textarea onChange={this.handleDescription} value={this.state.description} className="form-control" placeholder="Product description"></textarea>
                <span className="help-block">{this.state.descriptionError}</span>
             </div>
             <div className={classnames('form-group',{'has-error' : this.state.stockError})}>
               <select className="form-control" onChange={this.handleStock} value={this.state.stock}>
                 <option>Stock</option>
                 <option value="Available">Available</option>
                 <option value="Out of stock">Out of stock</option>
               </select>
               <span className="help-block">{this.state.stockError}</span>
             </div>
             <div className="form-group">
               <label>Quantity</label>
               <input onChange={this.handleQuantity} value={this.state.quantity} type="text" className="form-control" placeholder="Quantity"/>
             </div>
             <button className="btn btn-success btn-sm">{this.showLoading()}</button>
          </div>
        </div>
      </form>
    )
  }
  //show loading
  showLoading = () => {
    const { loading } = this.props.product;
    return(
      <div>
        {loading ? '...Loading' : 'Submit'}
      </div>
    )
  }
  // show error
  showError = () => {
    const { error } = this.props.product;
    return(
      <div>
        {error ? <p className="text-danger text-center">{error.error}</p> : ''}
      </div>
    )
  }
  // show success msg
  showSuccess = () => {
    const { product } = this.props.product;
    return(
      <div>
       {product.name ? <p className="alert alert-success text-center">{product.name} created.</p> : ''}
      </div>
    )
  }
  render(){
    console.log(this.props.product);
    return(
      <div className="section">
        <div className="jumbotron">
          <h2 className="text-center">Add Product</h2>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-sm-10 col-sm-offset-2">
              {this.showError()}
              {this.showSuccess()}
              {this.form()}
              <br />
              <br />
              <Link to="/admin/dashboard" className="btn btn-default">Go back</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return{
    product : state.product
  }
}
export default connect(mapStateToProps,{createProduct})(CreateProduct);
