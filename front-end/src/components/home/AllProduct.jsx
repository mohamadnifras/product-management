import React from 'react'
import Categories from './addProduct/Categories'
import Products from './addProduct/Products'

function AllProduct() {
  return (
    <div className='flex justify-center'>
        <div className='w-[17%] '><Categories /></div>
        <div className='w-[80%]'><Products /></div>
    </div>
  )
}

export default AllProduct