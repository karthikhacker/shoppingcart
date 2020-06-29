import React from 'react';
import Layout from '../core/Layout';
import {connect} from 'react-redux';
import { addCategory } from '../actions';
import {Link} from 'react-router-dom';
import Loading from '../core/Loading';

class CreateCategory extends React.Component{
  state = {
     name : '',
     error : {}
  }
  //handleName
  handleName = (e) => {
    this.setState({
       name : e.target.value
    })
  }
  //name validation
  // nameValidation = () => {
  //   const { name } = this.state;
  //   let nameError;
  //   if(name === ''){
  //     nameError = 'Name is required'
  //   }
  // }
  handleSubmit = (e) => {
    e.preventDefault();
    const data = { name : this.state.name };
    this.props.addCategory(data)
  }
  //form
  form = () => {
    const {loading} = this.props.category;
    return(
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label>Category name</label>
          <input onChange={this.handleName} value={this.state.name} type="text" className="form-control" placeholder="Category name"/>
        </div>
        {loading ? <Loading /> : <button className="btn btn-success btn-sm">SUBMIT</button>}
      </form>
    )
  }
  //show Error
  showError = () => {
    return(
      <div>
        <p className="text-center text-danger">{ this.props.category.error.error}</p>
      </div>
    )
  }
 //show success
 showSuccess = () => {
   return(
     <div>
      {this.props.category.category.name ? <p className="alert alert-success">{this.props.category.category.name} category created</p> : ''}
     </div>
   )
 }
 goback = () => {
   return(
     <div>
       <Link className="btn btn-info btn-sm" to="/admin/dashboard">Back to Dashboard</Link>
     </div>
   )
 }
  render(){
    console.log(this.props.category)
    return(
      <div className="section">
        <Layout />
        <div className="jumbotron">
          <h2 className="text-center">Add category</h2>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-sm-4 col-sm-offset-4">
             {this.showError()}
             {this.showSuccess()}
             {this.form()}
             <br />
             <br />
             {this.goback()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return{
    category : state.category
  }
}
export default connect(mapStateToProps,{addCategory})(CreateCategory);
