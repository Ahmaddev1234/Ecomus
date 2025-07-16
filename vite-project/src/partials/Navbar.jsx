import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { loginSuccess, logout } from '../features/auth/authSlice';
import { toast } from 'react-toastify';
import Headroom from 'react-headroom';


function Navbar() {
  const location = useLocation();
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const isAuthenticated=useSelector((state)=>state.auth.isAuthenticated);
  const role = useSelector((state) => state.auth.role);
  const isAdmin = role?.includes("admin") || role === "admin";
  
  
  const handleLogout=async()=>{
    try {
      const response = await fetch("https://ecomus-backnd-production.up.railway.app/users/logout", {
        method: "POST",
        credentials: "include",
      });
  
      const data = await response.json();
  
      if (!data.success) {
        toast.error(data.message);
      } else {
        toast.success(data.message);
      }
      dispatch(logout());

    } catch (err) {
      console.error("Error:", err.message);
      toast.error("Something went wrong. Please try again.");
    }
  }

  const [isOpen,setisopen]=useState(false);

  const handleisopen=()=>{
      setisopen(!isOpen);
  }







  return (
    <>
    <Headroom
      upTolerance={10}   
      downTolerance={10}
    >
      <div className="w-full  left-0 z-50 style={{ zIndex: 9999 }}">
        
        <nav className={` md:flex md:justify-between md:px-12 md:py-3 sm:py-2  md:backdrop-blur-md md:backdrop-saturate-150   md:items-center md:text-white md:bg-zinc-900  bg-white z-50`}>
        <h1 className="text-4xl font-bold text-sky-400 md:p-0 pl-3 p-3">Ecomus</h1>
        <div className='absolute right-8 top-3 text-3xl md:hidden' onClick={handleisopen}>
      <ion-icon name={isOpen?"close-outline":"menu-outline"}></ion-icon>
      </div>
      <ul className={`md:flex md:gap-14 absolute md:static  md:z-auto z-[-1]  left-0 w-full md:w-auto md:pl-0 pl-6  md:bg-transparent bg-white md:pb-0 pb-11 transition-all duration-300 ease-in ${isOpen?"top-12":"top-[-490px]"}`} >
          <li className=' md:my-0 md:font-semibold my-7 font-normal text-2xl  md:text-lg hover:text-yellow-400' ><Link to="/">Home</Link></li>
          <li className=' md:my-0 md:font-semibold my-7 font-normal text-2xl md:text-lg hover:text-yellow-400' ><Link to="/shopcollection">Shop</Link></li>
          <li className=' md:my-0 md:font-semibold my-7 font-normal text-2xl  md:text-lg hover:text-yellow-400' ><Link to="/shopcollection">Products</Link></li>
        </ul>
        <div className={`flex gap-3  md:w-[10%] p-4 md:p-2  w-[100%]  absolute transition-all duration-all ease-in md:static ${isOpen?"top-60":"top-[-490px]"}`}>
          {isAuthenticated?
        <i className="ri-logout-box-r-line text-2xl cursor-pointer hover:text-yellow-400" onClick={handleLogout}></i>:  
        
          <button
            className=" "
            onClick={()=>navigate('/login')} 
          >
          <div className='flex  '>
          
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 hover:text-yellow-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
          </svg>
          </div>
          
          </button>
          }
          {isAdmin?(
            <button className='px-2 py-1 font-semibold bg-white text-black rounded-md ' onClick={()=>navigate('/addproducts')}>Dashboard</button>
          ):(<>
          <button onClick={()=>navigate('/cart')}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 hover:text-yellow-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
          </svg>

          </button>
          </>
          )}
        </div>
        </nav>
      </div>
      </Headroom>
    </>
  );
}

export default Navbar;
