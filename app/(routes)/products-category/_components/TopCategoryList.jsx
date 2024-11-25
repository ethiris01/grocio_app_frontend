import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const TopCategoryList = ({categoryList,selectedCategory}) => {
  return (
  <div className="flex gap-4 mt-4 overflow-auto mx-7 justify-center">
        {categoryList.map((category, index) => {
          const iconUrl = category.icon?.[0]?.url
            ? `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${category.icon[0].url}`
            : '/placeholder.png'; // Fallback image if no icon exists

          return (
            <Link href={"/products-category/" + category.name} key={index} 
            className={` flex flex-col items-center bg-green-50 gap-3 p-3 rounded-xl group hover:bg-green-500 w-[150px] min-w-[100px]  ${selectedCategory === category.name&& 'bg-green-600 hover:bg-green-600 text-white'}  `}>
              <Image
                src={iconUrl}
                alt={category.name || 'Category Image'}
                width={70}
                height={70}
                className="group-hover:scale-125 transition-all ease-in-out"
              />
              <h3 className={` text-gray-800 font-medium mt-2 
              ${selectedCategory== category.name&& 'text-white'}
               `}>
                {category.name || 'Unnamed Category'}
              </h3>
            </Link>
          );
        })}
      </div>
  )
}

export default TopCategoryList
