import React, { useState,useEffect } from 'react'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const navigate=useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent default form submission
  
    try {
      const response = await fetch("http://localhost:3000/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Ensure JSON format
        },
        body: JSON.stringify({ email, password }), // Send JSON instead of FormData
        credentials: "include",
      });
  
      const data = await response.json();
  
      if (!data.success) {
        toast.error(data.message);
      } else {
        toast.success(data.message);
      }
    } catch (err) {
      console.error("Error:", err.message);
      toast.error("Something went wrong. Please try again.");
    }
  };
  


  return (
    <div className='fixed inset-0 bg-white  flex justify-center items-center  font-sans'>
      <div className="bg-white p-8 rounded-sm shadow-lg md:w-[53%] w-[100%] gap-8 relative" >
        <h2 className="text-3xl font-light mb-4 font-sans pb-8 pt-4">Sign Up</h2>
        {/* Add your form inputs here */}
        <form className='flex flex-col gap-4' onSubmit={handleSignup}>
          <div className="">
            <input
              value={email}
              onChange={(e)=>setemail(e.target.value)}
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded placeholder:text-[14px] h-[50px]"
              placeholder="Email *"
            />
          </div>
          <div className="mb-4">
            <input
              value={password}
              onChange={(e)=>setpassword(e.target.value)}
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded placeholder:text-[14px] h-[50px]"
              placeholder="Password *"
            />
          </div>
          <a className='text-sm  font-thin underline ' href="">Forgot your password</a>
          <div className='w-full'>
            <button
              type="submit"
              className="bg-black text-white text-sm font-semibold px-4 py-2 rounded-sm w-[50%] h-[50px]"
            >
              Sign up
            </button>
            <button
              type="button"
              onClick={()=>navigate('/login')}
              className=" text-black  text-[15px]  font-medium px-4 py-2  w-[50%] h-[50px] underline underline-offset-4"
            >
              Already have an account? Login
            </button>
          </div>
        </form>

        {/* Close button */}
      </div>
    </div>
  )
}

export default Signup
