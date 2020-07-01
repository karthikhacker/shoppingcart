import React,{useState,useEffect} from 'react';
import {Link,Redirect} from 'react-router-dom';
import Layout from './Layout';
import axios from 'axios';
import {getCart} from './cartHelper';
import Loading from './Loading';

const Checkout = ({history}) => {
  const [address, setAddress] = useState([]);
  const [loading,setLoading] = useState(false);
  const [carts,setCarts] = useState(getCart());
  const [error,setError] = useState("");
  const [selectedAddress,setSelectedAddress] = useState("");

  //useEffect
  useEffect(() => {
     getAddress()
  },[])

  //cart total
  const cartTotal = () => {
    //console.log(carts)
     return carts.reduce((a,b) => {
        return a + (b.quantity*b.price)
     },0)
  }

  // get shipping address


  //get address
  const getAddress = () => {
    setLoading(true)
    axios.get('/api/address')
     .then(res => {
        console.log(res.data)
        setAddress(res.data)
        setLoading(false)
     })
     .catch(error => {
        setError(error.response.data)
        setLoading(false)
     })
  }

  //handleChange
   const handleChange = (e) => {
      setSelectedAddress(e.target.value)
      //setCompleted(!completed)
      //console.log(e.target.value)
   }

   //deleteAddress
   const deleteAddress = (id) => {
     axios.delete(`/api/address/${id}`)
       .then(res => {
         console.log(res.data)
         setAddress( address.filter(ad => ad._id !== id) )
       })
       .catch(error => {
          setError(error.message);
       })
   }

   //render address
   const renderAddress = () => {
     return(
       <div className="address">
        { address.length ?  address.map((add) => (
            <div className="well" key={add._id}>
              <div className="row">
                <div className="col-xs-2 col-lg-2">
                  <input type="radio" name={add.name} onChange={handleChange} value={add._id} />
                </div>
                <div className="col-xs-6 col-lg-6">
                   <p className="addressName">{add.name}</p>
                   <p>
                     <span>{add.houseNo}</span>, <span>{add.street}</span>,
                     <br />
                     <span>{add.locality}</span>, <span>{add.city}</span>,
                     <br />
                     <span>{add.state}</span> - <span>{add.pincode}</span>
                     <br />
                     <span className="text-bold"><b>{add.mobileNumber}</b></span>
                   </p>
                </div>
              </div>
              <hr />
              <div className="action-btn">
                 <button onClick={() => deleteAddress(add._id)} className="btn btn-danger btn-md">REMOVE</button>
                 <Link to={`/address/edit/${add._id}`} className="btn btn-success btn-md pull-right">EDIT</Link>
              </div>
            </div>
         )) : null
       }
       </div>
     )
   }

   //show loading
   const showLoading = (loading) => {
      return(
        <div className="text-center">
          {loading ? <Loading /> : null}
        </div>
      )
   }
  return(
    <div className="section">
      <Layout />
      <div className="container">
         <div className="row">
            <div className="col-xs-8 col-lg-4">
              <div className="page-header">
                <p>
                 <Link to="/add/address" className="btn btn-success btn-block">ADD ADDRESS</Link>
                </p>
              </div>
               {address.length < 1 ? <p className="text-center">Add address for shipping</p> : <p className="text-muted">Select address for shipping</p>}
               {error ?  <p className="lead text-center">{error.message}</p> : null}
               {showLoading(loading)}
               {renderAddress()}
            </div>
            <div className="col-xs-4 col-lg-4">
               <div className="page-header">
                  <span className="price">Your bag total</span> :  <span className="dollar pull-right">&#36; {cartTotal()}</span>
               </div>
               {selectedAddress ? <Link to={`/checkout/payment/${selectedAddress}`} className="btn btn-success btn-sm">Continue</Link> : null }
            </div>
         </div>
      </div>
    </div>
  )
}
export default Checkout;
