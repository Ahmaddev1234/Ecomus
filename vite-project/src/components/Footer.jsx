import React from 'react'

function Footer() {
  return (
    <>
    <div className=' flex w-full justify-center mt-14'>
    <div className='w-[91%] '>
    <hr className="w-full border-t-2 border-gray-300 my-4" />
    </div>
    </div>
    <div className='md:h-[320px] h-auto w-full md:overflow-hidden gap-3 flex md:flex-row flex-col mt-6 px-14 py-4'>
        
      <div className='flex flex-col gap-2  md:w-[25%] w-[100%] h-[100%] '>
        <h1 className='text-5xl font-semibold'>Ecomus</h1>
        <p className='mt-5 text-sm'>Address: 1234 Fashion Street, Suite 567,</p>
        <p className='text-sm'>New York, NY</p>
        <p className='text-sm'>Email: info@fashionshop.com</p>
        <p className='text-sm'>Phone: <span className='font-bold'>(212)555-1234</span></p>
        <a className='font-semibold mt-3 underline underline-offset-8 cursor-pointer' href="">Get direction <i class="ri-arrow-right-up-line"></i></a>
        <div className='flex gap-2 mt-5'>
            <div className='border border-black rounded-full px-2 py-1 cursor-pointer'>
                <i class="ri-facebook-fill "></i>
            </div>
            <div className='border border-black rounded-full px-2 py-1 cursor-pointer'>
                <i class="ri-twitter-x-line"></i>
            </div>
            <div className='border border-black rounded-full px-2 py-1 cursor-pointer'>
                <i class="ri-instagram-line"></i>
            </div>
            <div className='border border-black rounded-full px-2 py-1 cursor-pointer'>
                <i class="ri-tiktok-fill"></i>
            </div>
            <div className='border border-black rounded-full px-2 py-1 cursor-pointer'>
                <i class="ri-pinterest-fill"></i>
            </div>

        </div>
      </div>
      <div className='flex gap-4 flex-col md:w-[25%] w-[100%] h-[100%] '>
        <h1 className='text-2xl font-semibold mt-4'>Help</h1>
        <a className='text-sm md:mt-6 mt-2 cursor-pointer' href="">Privacy policy</a>
        <a className='text-sm cursor-pointer' href="">Return and exchanges</a>
        <a className='cursor-pointer text-sm' href="">Shipping</a>
        <a className='text-sm cursor-pointer' href="">terms and conditions</a>
        <a className='text-sm cursor-pointer' href="">FAQ's</a>
        <a className='text-sm cursor-pointer' href="My Wishlist"></a>
        </div>
        <div className='flex flex-col md:w-[25%] w-[100%] h-[100%] gap-4'>
        <h1 className='text-2xl font-semibold mt-4'>Useful Links</h1>
        <a className='text-sm mt-6 cursor-pointer' href="">Our Story</a>
        <a className='text-sm cursor-pointer' href="">Visit our store</a>
        <a className='text-sm cursor-pointer' href="">Contact us</a>
        <a className='text-sm cursor-pointer' href="">About us</a>
        <a className='text-sm cursor-pointer' href="">Account</a>

        </div>
        <div className='flex flex-col md:w-[25%] w-[100%] h-[100%] md:gap-10 gap-4'>
            <h1 className='text-2xl font-semibold mt-4'>Signup for Email</h1>
            <p className='text-sm text-wrap md:mt-6 mt-1'>Sign up to get first dibs on new arrivals, sales, exclusive content, events and more!</p>
            <div className=' flex border border-black md:px-3 md:py-2 px-2 py-1 w-[100%] justify-between'>
            <input className='outline-none w-[50%]' type="text" placeholder='Enter your email' />
            <button className='bg-black text-sm font-bold text-white md:px-3  md:py-2 px-2 py-1 rounded-sm flex'>Subscribe <i class="ri-arrow-right-up-line text-white"></i></button>
            </div>
        </div>
    </div>
    <div className=' flex w-full justify-center '>
    <div className='w-[91%] '>
    <hr className="w-full border-t-2 border-gray-300 my-4" />
    </div>
    </div>
    <div className='txt-sm flex justify-between px-14 pb-4'>
        <p>© 2025 Ecomus: All rights reserved</p>
        <div className='flex gap-2'>
        <div className='border-2 border-gray-400 h-[30px] px-2 flex justify-center items-center overflow-hidden'>
        <i class="ri-visa-line text-2xl text-blue-600 "></i>
        </div>
        <div className='border-2 border-gray-400 h-[30px] px-2 flex justify-center items-center overflow-hidden'>
        <i class="ri-paypal-fill text-2xl text-blue-600 "></i>
        </div>
        <div className='border-2 border-gray-400 h-[30px] px-2 flex justify-center items-center overflow-hidden'>
        <i class="ri-mastercard-fill text-2xl text-red-500 "></i>
        </div>
        <div className='border-2 border-gray-400 h-[30px] px-2 flex justify-center items-center overflow-hidden'>
        <i class="ri-alipay-fill text-2xl text-green-500 "></i>
        </div>

        </div>
    </div>

    </>
  )
}

export default Footer
