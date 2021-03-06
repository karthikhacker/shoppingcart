import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import Layout from '../core/Layout';
import axios from 'axios';
import Loading from '../core/Loading';

const UpdateProfile = ({history}) => {
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState("");
  const [user,setUser] = useState({
     name : '',
     email : '',
     about : '',
     location : ''
  })
  //useEffect
  useEffect(() => {
     getProfile()
  },[])
  //get profile
  const getProfile = () => {
    axios.get('/api/user/profile')
    .then(res => {
       console.log(res.data)
       setUser({
          name : res.data.name,
          email : res.data.email,
          about : res.data.about,
          location : res.data.location
       })
    })
    .catch(error => {
       console.log(error)
    })
  }

  //handleChange
  const handleChange = name => e => {
    setUser({ ...user, [name] : e.target.value })
  }

  //handleSubmit
  const handleSubmit = (e) => {
     e.preventDefault();
     const {name,email,about,location} = user;
     const data = {
        name,email,about,location
     }
     setLoading(true)
     axios.put('/api/profile/update',data)
      .then(res => {
         console.log(res.data)
         setLoading(false)
         history.push('/user/dashboard')
      })
      .catch(error => {
         console.log(error)
      })
  }

  //form
   const form = () => {
     return(
       <form onSubmit={handleSubmit}>
         <div className="form-group">
           <input type="text" className="form-control" onChange={handleChange('name')} value={user.name || ""}/>
         </div>
         <div className="form-group">
           <input type="text" className="form-control" onChange={handleChange('email')} value={user.email || ''}/>
         </div>
         <div className="form-group">
           <input type="text" className="form-control" onChange={handleChange('about')}  value={user.about || ''}/>
         </div>
         <div className="form-group">
           <input type="text" className="form-control" onChange={handleChange('location')} value={user.location || ''}/>
         </div>
         <Link className="btn btn-success btn-block btn-sm" to="/user/change/password">CHANGE PASSWORD</Link>
         {loading ? <Loading /> : <button className="btn btn-primary btn-sm btn-block">SUBMIT</button>}
       </form>
     )
   }
  return(
    <div className="section">
       <Layout />
       <div className="jumbotron">
          <h3 className="text-center text-muted">Edit profile</h3>
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
export default UpdateProfile;
