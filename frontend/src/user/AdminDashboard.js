import React from 'react';
import Layout from '../core/Layout';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProfile } from '../actions';
import Loading from '../core/Loading';

class AdminDashboard extends React.Component{
  componentDidMount(){
     this.props.getProfile();
  }
  profilePanel = () => {
    const { profile } = this.props.profile;
    return(
      <div className="panel panel-default">
        <div className="panel-heading">
          <h4 className="text-center">Admin info</h4>
        </div>
        <div className="panel-body">
            <p>{profile.name}</p>
            <p>{profile.email}</p>
            <p>ROLE : {profile.role === 'Admin' ? 'Admin' : 'User'}</p>
        </div>
      </div>
    )
  }
  linkPanel = () => {
    return(
      <div className="panel panel-default">
        <div className="panel-heading">
          <h4 className="text-center">Admin Links</h4>
        </div>
        <div className="panel-body">
            <p><Link className="link" to="/create/category">Create category</Link></p>
            <p><Link className="link" to="/create/product">Create product</Link></p>
            <p><Link className="link" to="/admin/orders">Orders</Link></p>
            <p><Link className="link" to="/admin/manage/products">Mange products</Link></p>
        </div>
      </div>
    )
  }
  render(){
    const {loading} = this.props.profile;
    return(
      <div className="section">
      <Layout/>
         <div className="jumbotron">
            <h2 className="text-center">Admin dashboard</h2>
         </div>
         <div className="container">
           <div className="row">
             <div className="col-xs-6 col-sm-3 col-lg-3">
               {this.linkPanel()}
             </div>
             <div className="col-xs-6 col-md-9 col-sm-9 col-lg-9">
              { loading ? <Loading /> :   this.profilePanel()}
             </div>
           </div>
         </div>
      </div>
    )
  }
}
const mapStatetoProps = (state) => {
  return{
    profile : state.profile
  }
}
export default connect(mapStatetoProps,{getProfile})(AdminDashboard);
