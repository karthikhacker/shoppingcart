import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import Layout from './Layout';
import axios from 'axios';
import {getCart} from './cartHelper';

const Checkout = ({history}) => {
  const [address, setAddress] = useState([]);
  const [carts,setCarts] = useState(getCart());
  const [error,setError] = useState({});
  const [selectedAddress,setSelectedAddress] = useState("");
  const [completed,setCompleted] = useState(false)

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
    axios.get('http://localhost:4000/api/address')
     .then(res => {
        //console.log(res.data)
        setAddress(res.data)
     })
     .catch(error => {
        setError(error)
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
     axios.delete(`http://localhost:4000/api/address/${id}`)
       .then(res => {
         console.log(res.data)
         getAddress()
       })
       .catch(error => {
          setError(error);
       })
   }

   //render address
   const renderAddress = () => {
     return(
       <div className="address">
        { address.length !== 0 ? address.map((add) => (
            <div className="well" key={add._id}>
              <div className="row">
                <div className="col-lg-2">
                  <input type="radio" name={add.name} onChange={handleChange} value={add._id} />
                </div>
                <div className="col-lg-6">
                   <p>{add.name}</p>
                   <p>
                     <span>{add.houseNo}</span> <span>{add.street}</span>
                     <br />
                     <span>{add.locality}</span> <span>{add.city}</span>
                     <br />
                     <span>{add.state}</span> - <span>{add.pincode}</span>
                     <br />
                     <span>{add.mobileNumber}</span>
                   </p>
                </div>
              </div>
              <hr />
              <button onClick={() => deleteAddress(add._id)} className="btn btn-danger btn-sm">REMOVE</button>
            </div>
         )) : <p>No address added</p>
       }
       </div>
     )
   }
  return(
    <div className="section">
      <Layout />
      <div className="container">
         <div className="row">
            <div className="col-lg-4">
               <p>
                <Link to="/add/address" className="btn btn-success btn-block">ADD ADDRESS</Link>
               </p>
               {address.length > 0 ?  <h4>Select address for communication</h4> : null}
               {renderAddress()}
            </div>
            <div className="col-lg-4">
               Your bag total :  $ {cartTotal()}
               <hr />
               {selectedAddress ? <Link to={`/checkout/payment/${selectedAddress}`} className="btn btn-success btn-sm">Continue</Link> : null }
            </div>
         </div>
      </div>
    </div>
  )
}
export default Checkout;
