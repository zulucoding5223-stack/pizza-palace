import React from 'react'

const TopRated = () => {
  return (
    <div>
        <section className='w-full px-10 mt-15 relative'>
            <h1 className='text-center font-bold py-5 text-4xl text-black w-full'>Our Top Rated Pizzas!</h1>
            <div className='my-5 w-full bg-white rounded-full shadow-[0_8px_6px_0px_rgba(36,152,245,0.4)] h-fit text-[0.85rem] text-red-600 text-center'><span className='pt-1.5 pb-2'>These Are Our Top 8 Pizzas. They Are Highly Recommended!</span></div>
            <div className='w-full flex items-center justify-center flex-row flex-nowrap gap-8 overflow-x-scroll p-4 hide-scrollbar shadow-gray-600 shadow-xl'>
                <div className='min-w-100 h-50 bg-black shadow-gray-600 rounded-2xl shadow-lg'></div>
                <div className='min-w-100 h-50 bg-black shadow-gray-600 rounded-2xl shadow-lg'></div>
                <div className='min-w-100 h-50 bg-black shadow-gray-600 rounded-2xl shadow-lg'></div>
                <div className='min-w-100 h-50 bg-black shadow-gray-600 rounded-2xl shadow-lg'></div>
                <div className='min-w-100 h-50 bg-black shadow-gray-600 rounded-2xl shadow-lg'></div>
                <div className='min-w-100 h-50 bg-black shadow-gray-600 rounded-2xl shadow-lg'></div>
                <div className='min-w-100 h-50 bg-black shadow-gray-600 rounded-2xl shadow-lg'></div>
                <div className='min-w-100 h-50 bg-black shadow-gray-600 rounded-2xl shadow-lg'></div>
                <div className='min-w-100 h-50 bg-black shadow-gray-600 rounded-2xl shadow-lg'></div>
            </div>
        </section>
    </div>
  )
}

export default TopRated