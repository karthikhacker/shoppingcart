import React,{useState,useEffect} from 'react';
import Layout from '../core/Layout';
import axios from 'axios';

const UserOrder = () => {
  const [orders,setOrders] = useState({});
  const [error,setError] = useState({});
  const [loading,setLoading] = useState(false);

  //useEffect
  useEffect(() => {
    getOrder()
  },[])

  //get user order
  const getOrder = () => {
    setLoading(true)
    axios.get('http://localhost:4000/api/user/order')
     .then(res => {
        console.log(res.data)
        setOrders(res.data)
        setLoading(false)
     })
     .catch(error => {
        setError(error)
     })
  }
  return(
    <div className="section">
      <Layout />
       <div className="container">
         <div className="row">
           <div className="col-lg-6">
               {orders && <h4>ORDER NO - {orders._id}</h4>}
               <div className="">

               </div>
           </div>
         </div>
       </div>
    </div>
  )
}
export default UserOrder;
