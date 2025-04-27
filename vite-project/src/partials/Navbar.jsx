import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { loginSuccess, logout } from '../features/auth/authSlice';
import { toast } from 'react-toastify';


function Navbar() {
  const location = useLocation();
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const isAuthenticated=useSelector((state)=>state.auth.isAuthenticated);
  const role = useSelector((state) => state.auth.role);
  const isAdmin = role?.includes("admin") || role === "admin";
  
  
  const handleLogout=async()=>{
    try {
      const response = await fetch("http://localhost:3000/users/logout", {
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




  const isHomePage = location.pathname === "/";
  const navbarBg = isHomePage ? "md:text-white" : "md:text-black"


  return (
    <>
      <div className="w-full fixed top-0 left-0 z-50 ">
        <nav className={`md:flex md:justify-between md:px-12 md:py-6 sm:py-2   md:items-center ${navbarBg} md:bg-transparent  bg-white z-50`}>
        <h1 className="text-4xl font-bold text-yellow-400 md:p-0 pl-3 p-3">Ecomus</h1>
        <div className='absolute right-8 top-3 text-3xl md:hidden' onClick={handleisopen}>
      <ion-icon name={isOpen?"close-outline":"menu-outline"}></ion-icon>
      </div>
      <ul className={`md:flex md:gap-6 absolute md:static  md:z-auto z-[-1]  left-0 w-full md:w-auto md:pl-0 pl-6  md:bg-transparent bg-white md:pb-0 pb-11 duration-all ease-in ${isOpen?"top-12":"top-[-490px]"}`} >
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
          <button>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 hover:text-yellow-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
          </svg>

          </button>
          </>
          )}
        </div>
        </nav>
      </div>

    </>
  );
}

export default Navbar;
