import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const ImageCarousel = ({product}) => {
  //console.log(product.productImage)
  return(
     <Carousel
     showThumbs={false}
      autoPlay={true}
     >
       {product.productImage.length > 0 ? product.productImage.map((img,index) => (
         <img src={`${img}`} key={index} style={{ width : '100%'}} alt="carousel"/>
       )) : null }
     </Carousel>
  )
}
export default ImageCarousel;
