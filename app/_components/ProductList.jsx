import React from 'react'
import ProductItem from './ProductItem'
// import Image from 'next/image';

const ProductList = ({productList}) => {
  return (
    <div className='mt-10'>
      <h2 className='text-green-600 font-bold text-2xl text-center'>Items</h2>
   <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-4">
  {productList.map((product, index) => (
    <ProductItem key={product.id || index} product={product} />
  ))}
</div>

    </div>
  )
}

export default ProductList
