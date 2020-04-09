import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const ImageCarousel = ({product}) => {
  const {productImage} = product;
  //console.log(productImage)
  return(
     <Carousel
     showThumbs={false}
      autoPlay={true}
     >
       {product.productImage.map((img,index) => (
         <img src={`http://localhost:4000/${img}`} key={index} style={{ width : '100%'}}/>
       ))}
     </Carousel>
  )
}
export default ImageCarousel;
