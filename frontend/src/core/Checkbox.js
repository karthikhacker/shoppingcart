import React from 'react';

class Checkbox extends React.Component{
  state = {
    checked : []
  }
  handleToggle = (c) => {
    const currentIndex = this.state.checked.indexOf(c);
    const newChecked = [...this.state.checked];
    if(currentIndex === -1){
      newChecked.push(c);
    }else{
      newChecked.splice(currentIndex,1);
    }
    console.log(newChecked);
     this.setState({
        checked : newChecked
     })
     this.props.handleFilters(newChecked);
  }
  render(){
    const { categories } = this.props;
    //console.log(this.state.checked);
    return(
      <div className="checkbox">
        <ul className="list-group">
        {categories.map((c) => (
          <li className="list-group-item" key={c._id}>
            <label>
               <input onChange={() => {this.handleToggle(c._id)}} value={this.state.checked.indexOf(c._id === -1)} type="checkbox"/>
               {c.name}
            </label>
          </li>
        ))
         }
        </ul>
      </div>
    )
  }
}
export default Checkbox;
