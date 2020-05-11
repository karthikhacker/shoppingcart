import React from 'react';
import Menu from './Menu';

const Layout = ({products}) => {
  return(
    <div>
      <Menu products={products}/>
    </div>
  )
}
export default Menu;
