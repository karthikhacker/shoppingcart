import React from 'react';
import Layout from '../core/Layout';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProfile } from '../actions';

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
          <ul className="list-group">
            <li className="list-group-item">{profile.name}</li>
            <li className="list-group-item">{profile.email}</li>
            <li className="list-group-item">{profile.role === 'Admin' ? 'Admin' : 'User'}</li>
          </ul>
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
          <ul className="list-group">
            <li className="list-group-item"><Link to="/create/category">Create category</Link></li>
            <li className="list-group-item"><Link to="/create/product">Create product</Link></li>
            <li className="list-group-item"><Link to="/admin/orders">Orders</Link></li>
            <li className="list-group-item"><Link to="/admin/manage/products">Mange products</Link></li>
          </ul>
        </div>
      </div>
    )
  }
  render(){
    return(
      <div className="section">
      <Layout/>
         <div className="jumbotron">
            <h2 className="text-center">Admin dashboard</h2>
         </div>
         <div className="container">
           <div className="row">
             <div className="col-sm-3">
               {this.linkPanel()}
             </div>
             <div className="col-sm-9">
              {this.profilePanel()}
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
