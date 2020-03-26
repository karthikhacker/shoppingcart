import React,{useState} from 'react';
import axios from 'axios';
import {API} from '../../config';
import {isAuthenticated} from '../auth';
import {Link} from 'react-router-dom';

const AddCategory = () => {
  const [name,setName] = useState('');
  const [error,setError] = useState(false);
  const [success,setSuccess] = useState(false);
  const { user, token } = isAuthenticated();
  //handleChange
   const handleChange = (e) => {
     setError('')
     setName(e.target.value)
   }
   //handleSubmit
   const handleSubmit = (e) => {
     e.preventDefault();
     setError('');
     setSuccess(false)
     //axios req
     const data = {name : name};
     axios.post(`${API}/create/${user._id}`,{
       headers : {
         'Authorization' : `Bearer ${token}`
       }
     },data).then(res => {
        console.log(res.data)
     })
     .catch(err => {
       console.log(err.response.data)
     })
   }
  //form
  const form = () => {
    return(
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input value={name} onChange={handleChange} type="text" className="form-control" placeholder="Name"/>
        </div>
        <button className="btn btn-success btn-sm">Submit</button>
      </form>
    )
  }
  return(
     <div className="section">
       <div className="jumbotron">
         <h2 className="text-center">Create category</h2>
       </div>
       <div className="container">
        <div className="row">
         <div className="col-sm-4 col-sm-offset-4">
           {form()}
         </div>
        </div>
       </div>
     </div>
  )
}
export default AddCategory;
