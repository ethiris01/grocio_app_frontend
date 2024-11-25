import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const CategoryList = ({ categoryList }) => {
  return (
    <div className="mt-5">
      <h2 className="text-green-600 font-bold text-2xl text-center">All Categories</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
        {categoryList.map((category, index) => {
          const iconUrl = category.icon?.[0]?.url
            ? `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${category.icon[0].url}`
            : '/placeholder.png'; // Fallback image if no icon exists

          return (
            <Link href={"/products-category/" + category.name} key={index} className="flex flex-col items-center bg-green-50 gap-3 p-3 rounded-xl group hover:bg-green-500">
              <Image
                src={iconUrl}
                alt={category.name || 'Category Image'}
                width={70}
                height={70}
                className="group-hover:scale-125 transition-all ease-in-out"
              />
              <h3 className="text-gray-800 font-medium mt-2">
                {category.name || 'Unnamed Category'}
              </h3>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryList;
