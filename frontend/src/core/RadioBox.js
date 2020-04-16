import React from 'react';

class RadioBox extends React.Component{
  state = {
    value : 0
  }
  handleChange = (e) => {
    this.props.handleFilters(e.target.value)
    this.setState({ value : e.target.value})
  }
  render(){
    return(
      <div>
       {this.props.prices.map((p,i) => (
         <div className="radio" key={p._id}>
            <label>
              <input name={p} onChange={this.handleChange} value={`${p._id}`} type="radio"/>
              {p.name}
            </label>
         </div>
       ))}
      </div>
    )
  }
}
export default RadioBox;
