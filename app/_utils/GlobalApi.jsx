const {default: axios} = require("axios");

const axiosClient = axios.create({
    baseURL:"http://localhost:1337/api"
})


const getCategory = () => axiosClient.get("/categories")

const getProduct = () => axiosClient.get("/products?populate=*") // extra one 

const getSliders = () => axiosClient.get("/sliders?populate=*").then(resp =>{
    // console.log(resp.data.data);
    return resp.data.data
})

// get products by category
const getProductByCategory = (category) => axiosClient.get("/items?filters[categories][name][$in]=" +category+ "&populate=*").then(resp => {
    return resp.data.data
})

const getCategoryList = () => axiosClient.get("/categories?populate=*").then(resp => {
    return resp.data.data
    // console.log(resp.data.data);
})

const getAllProducts = () => axiosClient.get("/items?populate=*").then(resp => {
    return resp.data.data
})

const registerUser = (username,email,password) => axiosClient.post("/auth/local/register" , {
    username:username,
    email:email,
    password:password
})

const signInUser = (email,password) => axiosClient.post("/auth/local" , {
    identifier:email,
    password:password
})

const addToCart = (data, jwt) => 
  axiosClient.post("/user-carts", data, {
    headers: {
      Authorization: `Bearer ${jwt}`, // Ensure there is a space after 'Bearer'
    },
  });

  const getCartItems=(userId,jwt) => axiosClient.get(`/user-carts?populate[items][populate]=*&filters[userId][$eq]=${userId}` ,{
     headers: {
      Authorization: `Bearer ${jwt}`, // Ensure there is a space after 'Bearer'
    },
  }).then(resp => {
    const data = resp.data.data

    const cartItemList = data.map((item,index) => ({
      name: item.items[0]?.name, // Assuming each cart has one item
      quantity: item.quantity,
      amount: item.amount,
      actualPrice: item.items[0]?.sellingPrice, // Get selling price of the item
      image: item.items[0]?.images[0]?.formats?.thumbnail?.url, // Get thumbnail URL
      id: item.id // Get the cart item ID
}));

    console.log(cartItemList);
    return cartItemList
  })
const deleteCartItem = (id, jwt) => axiosClient.delete("/user-carts/" + id, {
  headers: {
    Authorization: 'Bearer ' + jwt, // Add a space after "Bearer"
  }
});



export default {
    getCategory,
    getProduct,
    getSliders,
    getCategoryList,
    getAllProducts,
    getProductByCategory,
    registerUser,
    signInUser,
    addToCart,
    getCartItems,
    deleteCartItem
}




// const deleteCartItem = (id, jwt) => axiosClient.delete("/user-carts/" + id, {
//   headers: {
//     Authorization: 'Bearer ' + jwt, // Add a space after "Bearer"
//   }
// });