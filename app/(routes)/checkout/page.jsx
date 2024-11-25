"use client"
import GlobalApi from '@/app/_utils/GlobalApi'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = () => {

  // user 
  const user = JSON.parse(sessionStorage.getItem('user'))
  const jwt =sessionStorage.getItem('jwt')
  const router = useRouter()
  const [totalCartItem,setTotalCartItem] = useState(0)
  
   // cartItem display
  const [cartItemLists,setCartItemLists]= useState([])
  const [subtotal,setSubtotal] = useState(0);

    // payment
  const [username,setUsername] = useState()
  const [email,setEmail] = useState()
  const [phone,setPhone] = useState()
  const [zip,setZip] = useState()
  const [address,setAddress] = useState()

  // cartItems list state 
const getCartItems = async () => {
  const cartItemList = await GlobalApi.getCartItems(user.id,jwt)
  console.log(cartItemList);
  setTotalCartItem(cartItemList?.length)
  setCartItemLists(cartItemList)
}
useEffect(() => {
    if(!jwt) {
        router.push("/sign-in")
    }
    getCartItems()
},[])

  // Calculate the subtotal

  useEffect(() => {
    let total = 0;
    cartItemLists.forEach(element => {
        total=total+element.amount
    })
    setSubtotal(total)
  },[cartItemLists]) 

  const calculateTotalAmount = () => {
    const totalAmount = subtotal * 1.0 +  10  + 15
    return totalAmount
  }

  return (
  <div className="font-bold bg-white p-4">
        <h2 className='flex items-center justify-center font-bold text-lg'>Checkout</h2>
        <br />
      <div className="md:max-w-5xl max-w-xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 max-md:order-1">
            <h2 className="text-3xl font-extrabold text-gray-800">Make a payment</h2>
            {/* <p className="text-gray-800 text-sm mt-4">Complete your transaction swiftly and securely with our easy-to-use payment process.</p> */}
            <form className="mt-8 max-w-lg">
              <div className="grid gap-4">
                <div>
                  <input type="text" 
                  placeholder="Name"
                  onChange={(e) => setUsername(e.target.value)}
                    className="px-4 py-3.5 bg-gray-100 text-gray-800 w-full text-sm border rounded-md focus:border-purple-500 focus:bg-transparent outline-none" />
                </div>
                <div className="flex bg-gray-100 border rounded-md focus-within:border-purple-500 focus-within:bg-transparent overflow-hidden"> 
                  <input type="email" placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                    className="px-4 py-3.5 text-gray-800 w-full text-sm outline-none bg-transparent" />
                </div>
                <div className="flex bg-gray-100 border rounded-md focus-within:border-purple-500 focus-within:bg-transparent overflow-hidden">
                  
                  <input type="text" placeholder="Address"
                  onChange={(e) => setAddress(e.target.value)}
                    className="px-4 py-3.5 text-gray-800 w-full text-sm outline-none bg-transparent" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input type="number" placeholder="Phone"
                    onChange={(e) => setPhone(e.target.value)}
                      className="px-4 py-3.5 bg-gray-100 text-gray-800 w-full text-sm border rounded-md focus:border-purple-500 focus:bg-transparent outline-none" />
                  </div>
                  <div>
                    <input type="number" placeholder="Zip"
                    onChange={(e) => setZip(e.target.value)}
                      className="px-4 py-3.5 bg-gray-100 text-gray-800 w-full text-sm border rounded-md focus:border-purple-500 focus:bg-transparent outline-none" />
                  </div>
                </div>
              </div>
              <button type="button" className="mt-8 w-40 py-3.5 text-sm bg-purple-500 text-white rounded-md hover:bg-purple-600 tracking-wide">Pay  </button>
            </form>
          </div>
          <div className="bg-gray-100 p-6 rounded-md">
            <h2 className="text-2xl font-extrabold text-gray-800"> Total Cart ({totalCartItem})</h2>
            <ul className="text-gray-800 mt-8 space-y-4">
              <li className="flex flex-wrap gap-4 text-sm">SubTotal: <span className="ml-auto font-bold">₹{subtotal}</span></li>
              <li className="flex flex-wrap gap-4 text-sm">Delivery:<span className="ml-auto font-bold">₹10</span></li>
              <li className="flex flex-wrap gap-4 text-sm">Tax:<span className="ml-auto font-bold">₹15</span></li>
              <br />
              <li className="flex flex-wrap gap-4 text-sm font-bold border-t-2 pt-4">Total:<span className="ml-auto">₹ {calculateTotalAmount()}</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
