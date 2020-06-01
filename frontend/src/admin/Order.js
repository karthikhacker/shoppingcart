import React,{useState,useEffect} from 'react';
import Layout from '../core/Layout';
import axios from 'axios';
import moment from 'moment';

const Order = () => {
  const [orders,setOrders] = useState([]);
  const [statusValues,setStatusValues] = useState([]);
  const [currentValue,setCurrentValue] = useState("");
  const [error,setError] = useState({});
  const [loading,setLoading]  = useState(false);

  //useEffect
  useEffect(() => {
     getOrders()
     getStatus()
  },[])

  //update order status
  const updateOrderStatus = (data,orderId) => {
    console.log(data,orderId);
     axios.put(`http://localhost:4000/api/order/${orderId}`,data)
       .then(res => {
          if(res.data){
             getOrders()
          }
       })
       .catch(error => {
          console.log(error)
       })
  }
  //handleChange
  const handleChange = (e,orderId) => {
     //console.log(e.target.value,orderId)
     const data ={
        status : e.target.value
     }
     updateOrderStatus(data,orderId)
  }

  //show Status
  const showStatus = (order) => {
    return(
      <div className="form-group">
         <label>{order.status}</label>
         <select  onChange={e => handleChange(e,order._id)}>
           <option>STATUS</option>
           {statusValues.map((status,index) => (
              <option value={status} key={index}>{status}</option>
           ))}
         </select>
      </div>
    )
  }

  // get order status
   const getStatus = () => {
     axios.get('http://localhost:4000/api/orders/status')
     .then(res => {
        console.log(res.data)
        setStatusValues(res.data)
     })
     .catch(error => {
        setError(error)
     })
   }

  //get orders
  const getOrders = () => {
    setLoading(true)
    axios.get('http://localhost:4000/api/orders')
    .then(res => {
       console.log(res.data)
       setOrders(res.data)
       setLoading(false)
    })
    .catch(error => {
       //console.log(error)
       setError(error)
    })
  }

  //render orders
  const renderOrders = () => {
    return(
       <div className="row">
          <div className="col-lg-12">
             <table className="table">
               <thead>
                 <tr>
                   <th>ID</th>
                   <th>TOTAL NO OF PRODUCTS</th>
                   <th>STATUS</th>
                   <th>TRANSACTION ID</th>
                   <th>AMOUNT</th>
                   <th>ORDERED BY</th>
                   <th>ORDERED DATE</th>
                   <th>ADDRESS</th>
                 </tr>
               </thead>
               <tbody>
                 {orders.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.products.length}</td>
                      <td>{showStatus(order)}</td>
                      <td>{order.transaction_id}</td>
                      <td>&#36;	 {order.amount}</td>
                      <td>{order.user.name}</td>
                      <td>{moment(order.createdAt).fromNow()}</td>
                      <td>
                        <span>{order.address.name}</span>
                        <br />
                        <span>{order.address.houseNo}</span>
                        <br />
                        <span>{order.address.street}, {order.address.locality}</span>
                        <br />
                        <span>{order.address.city}</span>
                        <br />
                        <span>{order.address.state} - {order.address.pincode}</span>
                        <br />
                        <span>{order.address.mobileNumber}</span>
                      </td>
                    </tr>
                 ))
                }
               </tbody>
             </table>
          </div>
       </div>
    )
  }

  //  noo rders
  const noOrders = (orders) => {
     return orders.length < 1 ? <p>No orders</p> : null;
  }
  return(
    <div className="main">
      <Layout />
       <div className="jumbotron">
          <h4 className="text-center">Total no of orders - {orders.length}</h4>
       </div>
       <div className="container" style={{ borderTop : "2px solid #eeeeee"}}>
          {renderOrders()}
       </div>
    </div>
  )
}
export default Order;
