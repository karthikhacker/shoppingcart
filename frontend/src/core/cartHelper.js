//Add to cart
export const addItem = (item, cb) => {
   let cart = []
   if(typeof window !== 'undefined'){
     if(localStorage.getItem('cart')){
       cart = JSON.parse(localStorage.getItem('cart'));
     }
     cart.push({
        ...item,
        quantity : 1
     })
     cart = Array.from(new Set(cart.map((p) => (p._id)))).map(id => {
       return cart.find(p => p._id  === id)
     });
     localStorage.setItem('cart',JSON.stringify(cart));
     cb()
   }
}
//getTotal
export const totalItem = () => {
   if(typeof window !== "undefined"){
      if(localStorage.getItem('cart')){
         return JSON.parse(localStorage.getItem('cart')).length
      }
   }
   return 0
}
//get Cart item
export const getCart = () => {
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            return JSON.parse(localStorage.getItem('cart'));
        }
    }
    return [];
};
//update cart
export const updateItem = (productId,count) => {
  let cart = []
  if(typeof window !== "undefined"){
    if(localStorage.getItem('cart')){
      cart = JSON.parse(localStorage.getItem('cart'))
    }
    cart.map((product,i) => {
      if(product._id === productId){
        cart[i].count = count
      }
    })
    localStorage.setItem('cart',JSON.stringify(cart))
  }
}
//removeitem
export const removeItem = productId => {
    let cart = [];
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
        }

        cart.map((product, i) => {
            if (product._id === productId) {
                cart.splice(i, 1);
            }
        });

        localStorage.setItem('cart', JSON.stringify(cart));
    }
    return cart
}
