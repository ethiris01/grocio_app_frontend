"use client"
import { Button } from '@/components/ui/button'
import { CircleUserRound, Layout, LayoutGrid, Search, ShoppingBag, ShoppingBasket } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from 'next/image'
import { logo, logo1 } from '../assets'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import GlobalApi from '../_utils/GlobalApi'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { UpdateCartContext } from '../_context/UpdateCartContext'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import CartItemList from './CartItemList'
import { toast } from 'sonner'




const Header = () => {

  const [categoryList,setCategoryList] = useState([])
  const [productList,setProductList] = useState([])
  const [totalCartItem,setTotalCartItem] = useState(0)
  const {updateCart,setUpdateCart } = useContext(UpdateCartContext)

  // cartItem display
  const [cartItemLists,setCartItemLists]= useState([])


  // user 
  const user = JSON.parse(sessionStorage.getItem('user'))
  const jwt = sessionStorage.getItem('jwt');


  const router = useRouter()
  useEffect(() => {
    getCategoryList();
    getProductList();  // extra one
  },[])

// useEffect for cart items
  useEffect(() => {
    getCartItems()
  },[updateCart])
const getCategoryList= () => {
  GlobalApi.getCategory().then(resp=> {
    // console.log("Category Loaded:",resp.data.data);
    setCategoryList(resp.data.data)
  })
}
// extra one
const getProductList = () => {
  GlobalApi.getProduct().then(resp=> {
    // console.log("Products Loaded:",resp.data.data);
    setProductList(resp.data.data)
  })
}

// cartItems list state 
const getCartItems = async () => {
  const cartItemList = await GlobalApi.getCartItems(user.id,jwt)
  console.log(cartItemList);
  setTotalCartItem(cartItemList?.length)
  setCartItemLists(cartItemList)
}

// jwt
const isLogin = sessionStorage.getItem('jwt') ? true : false;

const onSignOut = () => {
  sessionStorage.clear();
  router.push("sign-in")
}

const onDeleteItem=(id) => {
    GlobalApi.deleteCartItem(id,jwt).then(resp => {
      toast("item removed!")
    })
}


  // Calculate the subtotal
  const [subtotal,setSubtotal] = useState(0);
  useEffect(() => {
    let total = 0;
    cartItemLists.forEach(element => {
        total=total+element.amount
    })
    setSubtotal(total)
  },[cartItemLists])  


  return (
   <div className="flex justify-between items-center w-full shadow-md">
  {/* Left Section */}
  <div className="flex items-center gap-8 pt-2 ">
    <Link href={"/"}>
    <Image src={logo1} alt="logo" width={70} className="ml-6 mb-6" />
  </Link>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <h2 className="md:flex gap-2 items-center p-2 font-semibold text-gray-600 hover:text-primary cursor-pointer rounded-md">
          Category
        </h2>
      </DropdownMenuTrigger>
      <DropdownMenuContent  className="bg-white border border-gray-200 rounded-xl shadow-md">
        <DropdownMenuLabel className="px-4 py-2">Browse Categories</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {categoryList.map((category, index) => ( 
          <Link 
           key={category.id}
          href={"/products-category/" + category.name}>
          <DropdownMenuItem
           
            className="text-lg text-gray-600 py-2 px-4 hover:text-black rounded-md transition-all"
          >
            <h2 className="cursor-pointer">{category.name}</h2>
          </DropdownMenuItem>
           </Link>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>



  <DropdownMenu>
  <DropdownMenuTrigger asChild>
    <h2 className="md:flex gap-2 items-center p-2 font-semibold text-gray-600 hover:text-primary cursor-pointer hidden">
      Best Selling
    </h2>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="bg-white border border-gray-200 rounded-xl shadow-md">
    <DropdownMenuLabel>Browse Products</DropdownMenuLabel>
    <DropdownMenuSeparator />
    {productList.map((product) => {
      const iconUrl = product.icon?.[0]?.url
        ? `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/${product.icon[0].url}`
        : "/placeholder.png"; // Fallback image if no icon exists

      return (
        <DropdownMenuItem
          key={product.id}
          className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 rounded-md transition-all"
        >
          <Image
            src={iconUrl}
            alt={product.name}
            width={30}
            height={30}
            className="rounded-full"
          />
          <h2 className="text-lg text-gray-600 py-2 px-4 hover:text-black rounded-md transition-all cursor-pointer">
            {product.name}
          </h2>
        </DropdownMenuItem>
      );
    })}
  </DropdownMenuContent>
</DropdownMenu>




    
  </div>

  {/* Center Section (Search Bar) */}
  <div className="flex flex-grow justify-center">
    <div className="md:flex items-center gap-1 border rounded-full p-2 w-1/2 hidden">
      <input
        type="text"
        placeholder="Search"
        className="outline-none w-full px-1"
      />
      <Search className="text-gray-600" />
    </div>
  </div>

  {/* Right Section (User and Cart) */}
  <div className="flex items-center gap-6">
    <Sheet>
  {/* SheetTrigger: The button or UI to open the sheet */}
  <SheetTrigger>
    <h2 className="flex gap-2 items-center text-lg cursor-pointer">
      <ShoppingBasket className="h-7 w-7" />
      <span className="bg-primary text-white w-8 h-8 flex items-center justify-center rounded-full">
        {totalCartItem}
      </span>
    </h2>
  </SheetTrigger>

  {/* SheetContent: The content displayed within the sheet */}
  <SheetContent className="w-full sm:w-[540px] bg-white text-black p-4">
    <SheetHeader>
      <SheetTitle className="bg-primary p-2 mt-5 rounded-xl font-bold text-lg text-white">My Cart</SheetTitle>
      <SheetDescription className="text-sm font-normal">
        <CartItemList cartItemLists={cartItemLists} onDeleteItem={onDeleteItem} />
      </SheetDescription>
    </SheetHeader>

    <SheetClose asChild>
      <div className="mt-4 flex justify-between items-center border-t pt-4">
        <div className="font-semibold text-lg">Subtotal: ₹{subtotal}</div>
        <Button
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-600 transition"
          onClick={() => router.push(jwt ? "/checkout" : "/sign-in")}
        >
          Checkout
        </Button>
      </div>
    </SheetClose>
  </SheetContent>
</Sheet>





  {!isLogin? (
    <Link  href={"/sign-in"}>
    <Button  className="text-lg p-4 rounded-full font-bold text-white">
      Login
    </Button>
    </Link>
  )
  :
  (
    
  <DropdownMenu>
      <DropdownMenuTrigger asChild>
       <CircleUserRound className='w-7 h-7' />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white border border-gray-200 rounded-xl shadow-md">
        <DropdownMenuLabel className="px-4 py-2">My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-lg text-gray-600 py-2 px-4 hover:text-black rounded-md transition-all"
          > Profile
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-lg text-gray-600 py-2 px-4 hover:text-black rounded-md transition-all"
          > My Orders
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onSignOut()}
            className="text-lg text-gray-600 py-2 px-4 hover:text-black rounded-md transition-all"
          > Logout
          </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
  }

  </div>
</div>


  )
}

export default Header


