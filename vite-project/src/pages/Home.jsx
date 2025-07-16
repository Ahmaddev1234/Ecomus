import React, { useState,lazy,Suspense} from 'react'
import Courousal from '../components/main'
import Slider from '../components/Slider'
import Shopbycategories from '../components/ShopByCategories'
import Text from '../components/Text'
// import BestSeller from '../components/BestSeller'
// import ShopLook from '../components/ShopLook'
// import Reviews from '../components/Reviews'
// import Brands from '../components/Brands'
import Footer from '../components/Footer'
const BestSeller=React.lazy(()=>import('../components/BestSeller'))
// const Shopbycategories=React.lazy(()=>import('../components/ShopByCategories'))
// const Courousal=React.lazy(()=>import('../components/main'))
// const Slider=React.lazy(()=>import('../components/Slider'))
const Reviews=React.lazy(()=>import('../components/Reviews'))
const ShopLook=React.lazy(()=>import('../components/ShopLook'))
const Brands=React.lazy(()=>import('../components/Brands'))

function Home() {

  return (
    <div className='flex flex-col relative'>
    <div className='w-screen overflow-hidden relative pt-0 mt-0'>
      <Courousal />
        <Text/>
    </div>
    <Suspense fallback={<div>Loading.... </div>}>
    <Slider/>
    <Shopbycategories/>
    <BestSeller/>
    <ShopLook/>
    <Reviews/>
    <Brands/>
    <Footer/>
    </Suspense>
    </div>
  )
}

export default Home
