import React,{useState,useEffect} from 'react';
import Layout from '../core/Layout';
import axios from 'axios';
import moment from 'moment';
import Loading from '../core/Loading';


const Order = () => {
  const [orders,setOrders] = useState([]);
  const [statusValues,setStatusValues] = useState([]);
  const [error,setError] = useState("");
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
          setError(error.response.data)
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
         <select  onChange={e => handleChange(e,order._id)} className="form-control">
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

  //show loading
  const showLoading = (loading) => {
     return(
       <div className="text-center">
         {loading ? <Loading /> : null}
       </div>
     )
  }

  const showError = () => {
    return(
      <div>
       {error ? <p className="text-danger">{error.message}</p> : ""}
      </div>
    )
  }

  //render orders
  const renderOrders = () => {
    return(
       <div className="table-responsive">
             <table className="table">
               <thead>
                 <tr>
                   <th>ID</th>
                   <th>PRODUCTS</th>
                   <th>STATUS</th>
                   <th>TRANS ID</th>
                   <th>AMOUNT</th>
                   <th>ORDERED</th>
                   <th>DATE</th>
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
                      <td>{order.user ? order.user.name : null}</td>
                      <td>{moment(order.createdAt).fromNow()}</td>
                      <td>
                        {order.address ?
                           <div>
                             <span>{order.address.name}</span>,
                             <span>{order.address.houseNo}</span>,
                             <span>{order.address.street}</span>,
                             <span>{order.address.locality}</span>,
                             <span>{order.address.city}</span>,
                             <span>{order.address.state}</span>,
                             <span>{order.address.pincode}</span>,
                             <span>{order.address.mobileNumber}</span>.
                           </div>  : <span>No address</span>}
                      </td>
                    </tr>
                 ))
                }
               </tbody>
             </table>
       </div>
    )
  }
  return(
    <div className="section">
      <Layout />
       <div className="jumbotron">
          <h4 className="text-center">Total no of orders - <span className="label label-info">{orders.length}</span></h4>
       </div>
       <div className="main">
         <div className="row">
           <div className="col-xs-12 col-lg-12">
             {showError()}
             {showLoading(loading)}
             {orders.length > 0 ? renderOrders() : null}
           </div>
         </div>
       </div>
    </div>
  )
}
export default Order;
