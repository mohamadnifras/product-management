import React, { useState } from 'react'
import Categories from './addProduct/Categories'
import Products from './addProduct/Products'


function AllProduct() {
    const [selectedSubCategories, setSelectedSubCategories] = useState([]);
    
  return (
    <div className='flex justify-center'>
        <div className='w-[17%] '><Categories  selectedSubCategories={selectedSubCategories}
        setSelectedSubCategories={setSelectedSubCategories}/></div>
        <div className='w-[80%]'><Products  selectedSubCategories={selectedSubCategories}/></div>
    </div>
  )
}

export default AllProduct