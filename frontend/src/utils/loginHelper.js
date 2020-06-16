 const setToken = (token) => {
   if(typeof window !== 'undefined'){
     localStorage.setItem('jwt',token)
   }
}
export default setToken;
