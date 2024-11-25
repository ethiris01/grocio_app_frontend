"use client"
import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { LoaderCircle, ShoppingBasket } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import GlobalApi from "../_utils/GlobalApi";
import { toast } from "sonner";
import { UpdateCartContext } from "../_context/UpdateCartContext";

const ProductItemDetail = ({ product }) => {

  // State for quantity
const [productTotalPrice,setProductTotalPrice] = useState(
  product.sellingPrice?
  product.sellingPrice:
  product.mrp
)

  const {updateCart,setUpdateCart } = useContext(UpdateCartContext)
  const jwt =sessionStorage.getItem('jwt')
  const user = JSON.parse(sessionStorage.getItem('user'))
  const router = useRouter()


const [quantity,setQuantity] = useState(1);
const [loading,setLoading] = useState(false);


  const addToCart =() => {
    setLoading(true)
    if(!jwt) {
      router.push("/sign-in")
      setLoading(false)
      return
    }
    const data = {
    data:{
      quantity:quantity,
      amount:(quantity* productTotalPrice),
      items:product.id,
      users_permissions_users:user.id,
      userId:user.id
    }

    }
    console.log(data);
    console.log(product);
    
    
    GlobalApi.addToCart(data,jwt).then(resp => {
      console.log(resp);
      toast("Added to cart")
      setUpdateCart(!updateCart)
      setLoading(false)
    },(e) =>{
      toast("Error wil adding")
      setLoading(false)
    })
  }


  const imageUrl = product.images?.[0]?.formats?.thumbnail?.url
    ? `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${product.images[0].formats.thumbnail.url}`
    : "/placeholder.png"; // Fallback image if no thumbnail exists

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 p-7 gap-3 bg-white text-black">
      {/* Product Image */}
      <Image
        src={imageUrl}
        alt={product.name || "Product Image"}
        width={300}
        height={300}
        className="bg-slate-300 p-5 h-[160px] w-[300px] object-contain rounded-xl"
      />

      <div className="flex flex-col gap-3">
      <h2 className="text-2xl font-bold">{product.name || "Product Name"}</h2>
     <h2 className="text-sm text-gray-500">
          {product.description || "No description available."}
        </h2>

      <div className='flex gap-3'>
{product.sellingPrice && 
    <h2 className="font-bold text-lg "> ₹{product.sellingPrice}</h2>}
 <h2 className={`font-medium text-lg ${product.sellingPrice ? 'line-through text-gray-400' : ''}`}>
  ₹{product.mrp}
</h2>
  </div>  
  <h2 className="font-bold text-md">Quantity ({product.itemQuantityType})</h2>
  <div className="flex flex-col items-baseline gap-3">
  <div className="flex gap-3">
    <div className="p-2 border flex gap-10 items-center px-5" >
      <button disabled={quantity==1} onClick={() => setQuantity(quantity -1)}>-</button>
      <h2>{quantity}</h2>
      <button onClick={() => setQuantity(quantity + 1 )}>+</button>
    </div>
    <h2 className="text-2xl font-bold">₹{quantity * productTotalPrice}</h2>
      </div>
    <Button className="flex gap-3 text-white"
    onClick={() => addToCart()}
    disabled={loading}
     >
      <ShoppingBasket />
      {loading?<LoaderCircle className="animate-spin" /> : 'Add to Cart'}
      
    </Button>
  </div>
   <h2><span className="font-bold">Category:</span> 
          {product.categories?.map((category) => (
            <span key={category.id} className="mr-2">{category.name}</span>
          ))}
        </h2>
      </div>
    </div>
  );
};

export default ProductItemDetail;
