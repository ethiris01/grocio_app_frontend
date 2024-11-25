import GlobalApi from '@/app/_utils/GlobalApi'
import React from 'react'
import TopCategoryList from '../_components/TopCategoryList'
import ProductList from '@/app/_components/ProductList'

const productCategory =  async ({params}) => {
  const productList = await GlobalApi.getProductByCategory(params.categoryName)
  const categoryList = await GlobalApi.getCategoryList()
  return (  
    <div>
       <h2 className='p-4 bg-primary text-white font-bold text-3xl text-center'>{params?.categoryName}</h2>
       <TopCategoryList  categoryList={categoryList} selectedCategory={params.categoryName}/>
       <div className=' p-8 md:p-10'>

       <ProductList productList={productList} />
       </div>
    </div>
  )
}

export default productCategory
