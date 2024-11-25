import React from 'react';
import Image from 'next/image'; // Ensure the Image component is imported
import { Button } from '@/components/ui/button';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import ProductItemDetail from './ProductItemDetail';


const ProductItem = ({ product }) => {
const imageUrl = product.images?.[0]?.formats?.thumbnail?.url
          ? `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${product.images[0].formats.thumbnail.url}`
          : '/placeholder.png'; // Fallback image if no thumbnail exists

  return (
    <div className="p-2 md:p-6 flex flex-col items-center justify-center gap-3 border rounded-xl cursor-pointer  hover:shadow-md">
     <Image
              src={imageUrl}
              alt={product.name || 'Product Image'}
              width={100}
              height={100}
              className="h-[150px] w-[150px] object-contain hover:scale-110 transition-all ease-in-out"
            />
<h2 className='font-bold text-lg'>{product.name}</h2>
<div className='flex gap-3'>
{product.sellingPrice && (
    <h2 className="font-bold text-lg ">
      ₹{product.sellingPrice}
    </h2>
  )}
  {product.mrp && (
    <h2 className="font-medium text-lg text-gray-400 line-through">
      ₹{product.mrp}
    </h2>
  )}
  </div>
  <Dialog>
  <DialogTrigger asChild>
    <Button variant="outline" className="text-black  hover:bg-green-500 hover:text-white">
      Add to cart
    </Button>
  </DialogTrigger>
  <DialogContent className="bg-white text-black p-6 rounded-lg shadow-md">
    <DialogHeader>
      <DialogTitle>
      {/* Confirm Add to Cart */}
      
      </DialogTitle>
      <DialogDescription>
        {/* Are you sure you want to add this item to your cart? */}
        <ProductItemDetail product ={product}/>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>


    </div>
  );
};

export default ProductItem;
