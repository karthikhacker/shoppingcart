import React from 'react';
import axios from 'axios';

class Shop extends React.Component{
  render(){
    return(
       <div className="section">
         <div className="jumbotron">
            shop
         </div>
         <div className="container-fluid">
           <div className="row">
             <div className="col-sm-3">
               <h3>Categories</h3>
             </div>
             <div className="col-sm-9">
                <h3 className="text-center">Products</h3>
             </div>
           </div>
         </div>
       </div>
    )
  }
}
export default Shop;
