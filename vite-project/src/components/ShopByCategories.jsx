import React, { useEffect, useRef } from 'react'
import Slider from "react-slick";
import { useNavigate } from 'react-router-dom';
import Courousal from './Courousal2';

function Shopbycategories() {
    const sliderRef=useRef(null);
    const navigate=useNavigate();

    const handlePrev = () => {
        if (sliderRef.current) {
          sliderRef.current.slickPrev();
        }
      };
    
      const handleNext = () => {
        if (sliderRef.current) {
          sliderRef.current.slickNext();
        }
      };

      const handleNavigation=()=>{
        navigate('/shopcollection')
      }
    
  return (
    <div className='h-auto w-full'>
        <div className='flex w-[100%] h-[50%] md:p-8 p-3 mt-5'>
        <h1 className='text-xl font-semibold ml-4'>SHOP BY CATEGORIES</h1>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 ml-3 cursor-pointer hover:bg-black rounded-full hover:text-white" onClick={handlePrev}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"  />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 ml-3 cursor-pointer hover:bg-black rounded-full hover:text-white" onClick={handleNext}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"  />
            </svg>
            
        </div>
        <div className='flex md:flex-row gap-3 flex-col justify-center md:gap-6 mt-4 w-[100%] md:h-[350px] h-[100%] md:p-0 px-3'>
            <div  className='flex md:w-[70%] w-[100%]  overflow-hidden h-[100%]'>
            <Courousal sliderRef={sliderRef}/>


            </div>
            <div onClick={handleNavigation} className='md:w-[22%] w-[100%] h-[65px] items-center  flex justify-between shrink-0 md:h-[100%] rounded-lg md:relative border-2 md:items-center  border-black md:p-0 py-1 px-5 '>
                <h2 className='md:text-3xl text-2xl   font-sm md:absolute md:bottom-24 md:left-6'>Discovery all new items</h2>
                <i className="ri-arrow-right-up-line text-black hover:bg-black hover:text-white cursor-pointer font-light md:text-xl text-lg md:px-4 md:py-3 px-2 py-1 border border-black rounded-[50%] md:absolute md:top-[270px] md:left-[20px]"></i>
            </div>
        </div>
        
    </div>
    
  )
}

export default Shopbycategories
