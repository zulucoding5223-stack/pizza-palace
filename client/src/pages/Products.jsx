import React from 'react'
import AdminHeader from '../components/admin-components/AdminHeader'
import { IoSearchOutline } from 'react-icons/io5'

const Products = () => {
  return (
    <div>
        <AdminHeader />
        <section className='pl-21 md:pl-81 pt-5'>
            <h1 className='text-3xl text-blue-950 pl-8 md:pl-10 mx-auto'>Products</h1>
            <div className='flex items-center gap-3 mt-3 px-8 md:px-10 '>
                <div className='bg-gray-200 rounded-full w-full flex items-center gap-2 py-1 px-2.5 shadow-md'>
                    <input type="text" placeholder='Search for a product' className='text-[0.85rem] outline-none bg-transparent text-gray-500 px-3 w-full'/>
                    <IoSearchOutline color='gray' size={"1.5rem"} className='mb-px'/>
                </div>
            </div>
        </section>
    </div>
  )
}

export default Products