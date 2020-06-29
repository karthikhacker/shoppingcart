import React from 'react';
import Menu from './Menu';
import Footer from './Footer';

const Layout = ({products}) => {
  return(
    <div>
      <Menu products={products}/>
    </div>
  )
}
export default Menu;
