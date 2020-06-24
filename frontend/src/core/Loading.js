import React from 'react';
import spinner from '../assests/spinner.gif';

const Loading = () => {
  return(
    <div className="loading">
      <img src={spinner} className="spinner" alt="Spinner"/>
    </div>
  )
}
export default Loading;
