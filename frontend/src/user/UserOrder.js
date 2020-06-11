import React,{useState,useEffect} from 'react';
import Layout from '../core/Layout';
import axios from 'axios';
import moment from 'moment';

const UserOrder = () => {
  const [orders,setOrders] = useState([]);
  const [error,setError] = useState({});
  const [loading,setLoading] = useState(false);

  //useEffect
  useEffect(() => {
    getOrders()
  },[])

  //get user order
  const getOrders = () => {
    setLoading(true)
    axios.get('http://localhost:4000/api/user/order')
     .then(res => {
        console.log(res.data)
        setOrders(res.data)
        setLoading(false)
     })
     .catch(error => {
        setError(error.response.data)
        setLoading(false)
     })
  }

  //renderOrders
  const renderOrders = () => {
    return(
      <div className="col-lg-6 col-lg-offset-3">
         <div className="page-header">
            {orders.length > 0 ? <h4>No of orders {orders.length}</h4> : null}
         </div>
        {
           orders.map((order) => (
             <div className="well" key={order._id}>
               <h5 className="text-left">Order No : {order._id}</h5>
               <div className="products">
                {
                   order.products.length > 0 ? order.products.map((pro) => (
                     <div className="main" key={pro._id}>
                        <div className="row">
                           <div className="col-lg-4">
                             <img style={{width : "100%"}}  src={`http://localhost:4000/${pro.productImage[0]}`} alt="image"/>
                           </div>
                           <div className="col-lg-4">
                              <h4>{pro.name}</h4>
                             <p>{pro.description}</p>
                             <p> &#36;	 {pro.price}</p>
                             <p>Ordered date : {moment(order.createdAt).fromNow()}</p>
                             <hr />
                             {order &&  <p>Order status : <span className="label label-info">{order.status}</span></p> }
                           </div>
                        </div>
                     </div>
                   )) : null
                }
               </div>
             </div>
           ))
        }
      </div>
    )
  }

  const showLoading = (loading) => {
    return(
      <div className="text-center">
       {loading ? "Loading..." : renderOrders()}
      </div>
    )
  }

  return(
    <div className="section">
      <Layout />
       <div className="container">
         <div className="row">
           <div className="col-lg-12">
              {error ? <p className="text-center">{error.error}</p> : null}
              {showLoading(loading)}
           </div>
         </div>
       </div>
    </div>
  )
}
export default UserOrder;
