import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import { loginSuccess } from "../features/auth/authSlice"; // adjust path if needed
import { useNavigate,useLocation } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const navigate=useNavigate();
  const location = useLocation();

  const dispatch=useDispatch();
  const from = location.state?.from || "/";

  const handleLogin = async (e) => {
    e.preventDefault(); 

    try {
      const response = await fetch("https://ecomus-backnd-production.up.railway.app/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify({ email, password,role }), 
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message);
      } else {
        toast.success(data.message);
        dispatch(loginSuccess(data.data))
        navigate(from, { replace: true });
      }
      

      setEmail("");
      setPassword("");
      setRole("user");

    } catch (err) {
      console.error("Error:", err.message);
      toast.error("Something went wrong. Please try again.");
    }
  };


  return (
    <>
      <div className="fixed inset-0 bg-white flex justify-center items-center  font-sans">
        <div className="bg-white px-8 py-4 rounded-sm shadow-lg md:w-[53%] w-[100%] gap-8 relative md:mt-8" onSubmit={handleLogin}>
          <h2 className="text-3xl font-light mb-4 font-sans pb-8 pt-4">Log in</h2>
          
          <form className="flex flex-col gap-4">
            <div>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded placeholder:text-[14px] h-[50px]"
                placeholder="Email *"
              />
            </div>
            
            <div className="mb-4">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded placeholder:text-[14px] h-[50px]"
                placeholder="Password *"
              />
            </div>
            <div className='mb-4 flex flex-col justify-evenly'>
              <h1 className='mx-2 mb-2'>Role</h1>
            <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded h-[50px]"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            
            <a className="text-sm font-thin underline" href="" >
              Forgot your password?
            </a>
            
            <div className="w-full">
              <button
                type="submit"
                className="bg-black text-white text-sm font-semibold px-4 py-2 rounded-sm w-[50%] h-[50px]"
              >
                Log in
              </button>

              <button
                type="button"
                onClick={()=>navigate('/signup')}
                className="text-black text-[15px] font-medium px-4 py-2 w-[50%] h-[50px] underline underline-offset-4"
              >
                New customer? Create your account
              </button>
            </div>
          </form>

        </div>
      </div>
    </>
  );
}

export default Login;
