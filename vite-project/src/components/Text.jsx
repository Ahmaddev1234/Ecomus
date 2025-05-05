import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

function Text() {
  const devs = useRef(null);
  const navigate=useNavigate();

  useEffect(() => {
    if (devs.current) {
      gsap.fromTo(
        devs.current.children, 
        { y: 400, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.4,stagger:0.4 } 
      );
    }
  }, []);

  const handleNavigation=()=>{
      navigate('/shopcollection')
  }

  return (
    <div
      className="absolute top-[30%] left-10 flex flex-col h-[100%] gap-2 text-white w-[40%]"
      ref={devs}
    >
      <h1 className="font-light md:text-[500%] text-[300%]">Glamorous Glam</h1>
      <p className="hidden md:block">From casual to formal we have got you covered</p>
      <button className="hover:bg-yellow-400 bg-black text-sm md:w-[80%] md:text-lg text-white font-semibold hover:text-black px-4 py-2 w-[100%] mt-5" onClick={handleNavigation}>
        Shop Collection
      </button>
    </div>
  );
}

export default Text;
