import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Layout from './Layout';
import Loading from './Loading';

const UpdateAddress = ({match,history}) => {
  const [loading,setLoading] = useState(false);
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

  //useEffect
  useEffect(() => {
    getAddress(match.params.id)
  },[])

  //handleChange
  const handleChange = name => e => {
    setValues({ ...values, [name] : e.target.value})
  }

  //get address
  const getAddress = () => {
    axios.get(`/api/address/${match.params.id}`)
      .then(res => {
         console.log(res.data)
         setValues({
           name : res.data.name,
           houseNo : res.data.houseNo,
           street : res.data.street,
           locality : res.data.locality,
           city :res.data.city,
           state : res.data.state,
           pincode : res.data.pincode,
           mobileNumber : res.data.mobileNumber
         })
      })
      .catch(error => {
         console.log(error)
      })
  }

  //handleSubmit
  const handleSubmit = (e) => {
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
     console.log(data);

    setLoading(true)
    axios.put(`/api/address/edit/${match.params.id}`,data)
      .then(res => {
        console.log(res.data)
        history.push('/checkout')
        setLoading(false)
      })
      .catch(error => {
         console.log(error)
         setLoading(false)
      })
  }

  // form
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
      <div className="jumbotron">
         <h4 className="text-center">UPDATE ADDRESS</h4>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-lg-offset-4">
            {form()}
          </div>
        </div>
      </div>
    </div>
  )
}
export default UpdateAddress;
