import React from 'react'
import Dashboard from './Dashboard'
import Product from './Product'
import SideBar from './SideBar'

const ProductPage = () => {
  return (
    <div className='flex'>
        <SideBar/>
        <Product/>
    </div>
  )
}

export default ProductPage