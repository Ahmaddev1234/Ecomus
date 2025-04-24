import React, { useState } from 'react'
import Courousal from '../components/Courousal.component'
import Slider from '../components/Slider'
import Shopbycategories from '../components/ShopByCategories'
import Text from '../components/Text'
import BestSeller from '../components/BestSeller'
import ShopLook from '../components/ShopLook'
import Reviews from '../components/Reviews'
import Brands from '../components/Brands'
import Footer from '../components/Footer'

function Home() {
  const slides=[
    "images/1.jpg",
    "images/2.jpg",
    "images/3.jpg"
  ]
  return (
    <div className='flex flex-col relative'>
    <div className='w-screen overflow-hidden relative'>
      <Courousal slides={slides}  />
      <div className='relative bottom-0 py-2 flex justify-center gap-10 w-full'>
        {slides.map((e,i)=>{
           return (       <div className='w-10 h-10 rounded-full' key={`circle ${i}`} ></div>
           )
        })}
        </div>
        <Text/>
    </div>
    <Slider/>
    <Shopbycategories/>
    <BestSeller/>
    <ShopLook/>
    <Reviews/>
    <Brands/>
    <Footer/>
    </div>
  )
}

export default Home
