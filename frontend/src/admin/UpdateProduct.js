import React,{useState,useEffect} from 'react';
import Layout from '../core/Layout';
import axios from 'axios';
import {Link } from 'react-router-dom';
import Loading from '../core/Loading';

const UpdateProduct = ({match}) => {
  const [images,setImages] = useState([]);
  const [categories,setCateories] = useState([]);
  const [error,setError] = useState({});
  const [success,setSuccess] = useState(false);
  const [loading,setLoading] = useState(false);
  const [values,setValues] = useState({
     name : '',
     price : '',
     category : '',
     description : '',
     stock : '',
     quantity : ''
  })

  //useEffect
  useEffect(() => {
    getProduct(match.params.id)
    getCategories()
  },[])

  //handle image
  const handleImage = (e) => {
    const fd = new FormData();
    for(const key of Object.keys(e.target.files)){
      fd.append('file',e.target.files[key])
    }
    //axios
    axios.post('/api/product/image',fd)
     .then(res => {
      //  console.log(res.data)
        setImages(res.data.images)
        setLoading(false)
     })
     .catch(error => {
        setError(error)
     })
  }

  //get categories
  const getCategories = () => {
    axios.get('/api/categories')
     .then(res => {
        //console.log(res.data)
        setCateories(res.data)
     })
     .catch(error => {
        setError(error)
     })
  }

  //getProduct
  const getProduct = () => {
    axios.get(`/api/product/${match.params.id}`)
     .then(res => {
        //console.log(res.data.productImage)
        setLoading(false)
        setImages(res.data.productImage)
        setValues({
           name : res.data.name,
           price : res.data.price,
           description : res.data.description,
           quantity : res.data.quantity
         })
     })
     .catch(error => {
        console.log(error)
     })
  }

  //handle change
  const handleChange = name => e => {
    //
    setValues({ ...values, [name] : e.target.value })
  }

  //handle submit
   const handleSubmit = (e) => {
      e.preventDefault();
      const data = {
        name : values.name,
        price : values.price,
        category : values.category,
        productImage : images,
        description : values.description,
        stock : values.stock,
        quantity : values.quantity
      }
    //  console.log(data);
    setLoading(true)
    axios.put(`/api/product/${match.params.id}`,data)
     .then(res => {
        console.log(res.data)
        setSuccess(true)
        setLoading(false)
     })
     .catch(error => {
        setError(error)
     })
   }

   //show Error
   const showError = () => {
     return(
       <div>
         {error ? <p className="text-danger text-center">{error.message}</p> : ""}
       </div>
     )
   }

   return(
      <div className="section">
        <Layout />
          <div className="jumbotron">
             <h2 className="text-center">UPDATE PRODUCT</h2>
          </div>
          {showError()}
          {success  ? <div className=" col-lg-6 col-lg-offset-3 alert alert-success">PRODUCT UPDATED <Link to="/admin/manage/products" className="pull-right"> BACK TO MANAGE PRODUCTS</Link></div> : null}
          <div className="container">
             <div className="row">
               <div className="col-lg-12">
                 <form onSubmit={handleSubmit}>
                   <div className="row">
                     <div className="col-lg-4">
                       <div className="form-group">
                         <label>IMAGES</label>
                         <input type="file" onChange={handleImage} className="form-control" multiple/>
                       </div>
                       {loading === false ?  <div className="image-preview">
                        {
                           images.length > 0 ?  images.map((img,index) => (
                             <img src={`http://localhost:4000/${img}`} alt="IMAGES" key={index} style={{ width : '50%', padding: '2px', display : "inline-block"}}/>
                           )) : null
                        }
                      </div> : <Loading />}

                     </div>
                     <div className="col-lg-4">
                        <div className="form-group">
                          <label>NAME</label>
                          <input type="text" onChange={handleChange('name')} value={values.name} className="form-control"/>
                        </div>
                        <div className="form-group">
                          <label>PRICE</label>
                          <input type="text" className="form-control" onChange={handleChange('price')} value={values.price}/>
                        </div>
                        <div className="form-group">
                          <select className="form-control" onChange={handleChange('category')} value={values.category}>
                            <option>SELECT A CATEGORY</option>
                            {
                               categories.map((cat) => (
                                 <option key={cat._id} value={cat._id}>{cat.name}</option>
                               ))
                            }
                          </select>
                        </div>
                        <div className="form-group">
                          <select className="form-control" onChange={handleChange('stock')} value={values.stock}>
                            <option>STOCK</option>
                            <option value="IN STOCK">IN STOCK</option>
                            <option value="OUT OF STOCK">OUT OF STOCK</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label>DESCRIPTION</label>
                          <textarea className="form-control" onChange={handleChange('description')} value={values.description}></textarea>
                        </div>
                        <div className="form-group">
                          <label>QUANTITY</label>
                          <input type="text" className="form-control" onChange={handleChange('quantity')} value={values.quantity}/>
                        </div>
                     </div>
                   </div>
                   {loading ? <Loading /> : <p className="text-center"><button className=" btn-outline">{loading === false ? "SUBMIT" : "LOADING"}</button></p> }
                 </form>
               </div>
             </div>
          </div>
      </div>
   )
}
export default UpdateProduct;
