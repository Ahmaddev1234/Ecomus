import React, { useState } from 'react'
import Courousal from '../components/main'
import Slider from '../components/Slider'
import Shopbycategories from '../components/ShopByCategories'
import Text from '../components/Text'
import BestSeller from '../components/BestSeller'
import ShopLook from '../components/ShopLook'
import Reviews from '../components/Reviews'
import Brands from '../components/Brands'
import Footer from '../components/Footer'

function Home() {

  return (
    <div className='flex flex-col relative'>
    <div className='w-screen overflow-hidden relative'>
      <Courousal />
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
