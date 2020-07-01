import React,{useState} from 'react';
import Layout from './Layout';
import  axios from 'axios';
import {Link} from 'react-router-dom';
import Loading from './Loading';

const AddAddress = ({history}) => {
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState("");
  const [values,setValues] = useState({
     name : '',
     houseNo : '',
     street : '',
     locality : '',
     city : '',
     state : '',
     pincode : '',
     mobileNumber : ''
  })

  //handleChange
  const handleChange = name => e => {
    setValues({ ...values, [name] : e.target.value,error : false })
  }

  //handleSubmit
  const handleSubmit = (e) => {
    //
    e.preventDefault();
    const {name,street,houseNo,mobileNumber,locality,city,state,pincode} = values;
     const data = {
        name : name,
        houseNo : houseNo,
        street : street,
        locality : locality,
        city : city,
        state : state,
        pincode : pincode,
        mobileNumber : mobileNumber
     }
     //console.log(data);
     setLoading(true)
     axios.post('/api/add/address',data)
     .then(res => {
        if(res.data){
          history.push("/checkout")
        }
        setValues({ name : '',mobileNumber : '',houseNo : '',street : '',locality : '',city : '',state : '',pincode : '' })
        setLoading(false)
     })
     .catch(error => {
       setError(error.response.data)
       setLoading(false)
     })
  }
  //form
  const form = () => {
    return(
      <form onSubmit={handleSubmit}>
       <div className="form-group">
         <input type="text" value={values.name} onChange={handleChange('name')} className="form-control" placeholder="NAME"/>
       </div>
       <div className="form-group">
         <input type="text" className="form-control" placeholder="HOUSE NO" onChange={handleChange('houseNo')} value={values.houseNo}/>
       </div>
       <div className="form-group">
         <input type="text" className="form-control" placeholder="STREET" onChange={handleChange('street')} value={values.street}/>
       </div>
       <div className="form-group">
         <input type="text" className="form-control" placeholder="LOCALITY" onChange={handleChange('locality')} value={values.locality}/>
       </div>
       <div className="form-group">
         <input type="text" className="form-control" placeholder="CITY" onChange={handleChange('city')} value={values.city}/>
       </div>
       <div className="form-group">
         <input type="text" className="form-control" placeholder="STATE" onChange={handleChange('state')} value={values.state}/>
       </div>
       <div className="form-group">
         <input type="text" className="form-control" placeholder="ZIPCODE" onChange={handleChange('pincode')}  value={values.pincode}/>
       </div>
       <div className="form-group">
         <input type="text" className="form-control" placeholder="MOBILE NUMBER" onChange={handleChange('mobileNumber')}  value={values.mobileNumber}/>
       </div>
       {loading ? <Loading /> : <button className="btn btn-success">SUBMIT</button>}
      </form>
    )
  }
  return(
    <div className="section">
      <Layout />
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-lg-offset-4">
             <h3>Add address</h3>
             {error ? <p className="alert alert-danger">{error.error}</p> : null}
             {form()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddAddress;
