"use client"
import { Button } from '@/components/ui/button';
import { TrashIcon } from 'lucide-react';
import Image from 'next/image'; // Ensure Image is imported from next/image for optimized images
// import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
 // For View Cart button navigation

 // // Calculate the subtotal
 // const [subtotal,setSubtotal] = useState(0);
 // useEffect(() => {
  //   let total = 0;
  //   cartItemLists.forEach(element => {
    //       total=total+element.amount
  //   })
  //   setSubtotal(total)
  // },[cartItemLists])  

  
  // Router for navigation
  //   const router = useRouter();
  
  // Function to handle View Cart button click
  //   const handleViewCart = () => {
    //     router.push('/'); // Assuming the cart page is located at '/cart'
    //   };
    
    
    const CartItemList = ({ cartItemLists, onDeleteItem }) => {
  return (
    <div>
      {cartItemLists.map((cart, index) => (
        <div key={cart.id || index} className="flex justify-between items-center p-2 mb-4 border-b">
          {/* Cart item details */}
          <div className="flex gap-6 items-center">
            <Image
              src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + cart.image}
              alt={cart.name}
              width={100} // Adjust the width of the image
              height={100} // Adjust the height of the image
              className="rounded-md object-cover" // Optional styling
            />
            <div>
              <h2 className="font-semibold">{cart.name}</h2>
              <h2 className="text-sm text-gray-500">Quantity: {cart.quantity}</h2>
              <h2 className="font-bold">₹{cart.amount}</h2>
              {/* <h2 className="font-bold">{cart.id}</h2> */}

            </div>
          </div>

          {/* Trash icon */}
         <div className="cursor-pointer text-red-500 hover:text-red-700">
            {/* TrashIcon for deletion */}
            <TrashIcon onClick={()=> onDeleteItem(cart.id)} size={20} />
          </div>
        </div>
      ))}

      {/* Subtotal and View Cart Button */}
      {/* <div className="mt-4 flex justify-between items-center border-t pt-4">
        <div className="font-semibold text-lg">Subtotal: ${subtotal}</div>
        <Button 
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition"
        //   onClick={handleViewCart} 
        >
        Checkout
        </Button>
      </div> */}
    </div>
  );
};

export default CartItemList

