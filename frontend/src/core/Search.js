import React from 'react';


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
          <input type="text" onChange={this.handleChange} vale={this.state.searchTerms} className="form-control" placeholder="Search products"/>
        </div>
      </div>
    )
  }
}
export default Search;
