import React from 'react';
import {BsSearch} from 'react-icons/bs'


class Search extends React.Component{
  state = {
    searchTerms : ''
  }
  //handleChange
  handleChange = (e) => {
     this.setState({
       searchTerms : e.target.value
     })
     this.props.updateSearch(e.target.value)
  }
  render(){
    //console.log(this.state.search);
    return(
      <div className="row">
        <div className="col-sm-12">
          <div className="input-group add-on">
            <input type="text" onChange={this.handleChange} vale={this.state.searchTerms} className="form-control" placeholder="Search for products"/>
              <div className="input-group-btn">
                 <button className="btn btn-default"><BsSearch /></button>
              </div>
            </div>
        </div>
      </div>
    )
  }
}
export default Search;
