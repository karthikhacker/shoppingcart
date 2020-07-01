import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import Layout from '../core/Layout';
import axios from 'axios';
import Loading from '../core/Loading';


const ManageProducts = () => {

    //state
    const [products,setProducts] = useState([]);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState("")
   // use effect
   useEffect(() => {
      getProducts()
   },[])
  // get all products
  const getProducts = () => {
    setLoading(true)
     axios.get('http://localhost:4000/api/products')
     .then(res => {
        console.log(res.data)
        setProducts(res.data)
        setLoading(false)
     })
     .catch(error => {
        console.log(error)
        setError(error)
     })
  }

  //Delete product
  const deleteProduct = (id) => {
    axios.delete(`http://localhost:4000/api/product/${id}`)
      .then(res => {
         console.log(res.data)
         getProducts()
      })
      .catch(error => {
         setError(error)
      })
    console.log(id)
  }

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
        {error ? <p className="text-danger text-center">{error.message}</p> : ""}
      </div>
    )
  }

  // render products
  const renderProducts = () => {
    return(
       <table className="table table-responsive">
         <thead>
           <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>ACTION</th>
           </tr>
         </thead>
         <tbody>
          {
             products.map((product) => {
               return (
                 <tr key={product._id}>
                   <td>{product._id}</td>
                   <td>{product.name}</td>
                   <td>&#36; {product.price}</td>
                   <td>
                    <Link className="btn btn-success btn-sm" to={`/admin/product/update/${product._id}`}>EDIT</Link>
                    { '      '}
                    <button onClick={() => deleteProduct(product._id)} className="btn btn-danger btn-sm">DELETE</button>
                   </td>
                 </tr>
               )
             })
          }
         </tbody>
       </table>
    )
  }
  return(
    <div className="section">
      <Layout />
      <div className="jumbotron">
        <h2 className="text-center">Manage products</h2>
        <div className="page-header text-center">
          <span>Total no of products <span className="label label-primary">{products.length}</span></span>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
             {showError()}
             {showLoading(loading)}
             {products.length > 0 ? renderProducts() : <p className="text-center">NO PRODUCTS</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
export default ManageProducts;
