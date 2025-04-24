import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger"; // ✅ Import ScrollTrigger
import ReviewsCourousal from "./ReviewsCourousal";


function Reviews() {
    gsap.registerPlugin(ScrollTrigger);
    const textRef=useRef(null);
    

    useEffect(()=>{
        if(textRef.current.children){
        gsap.fromTo(textRef.current.children,{y:100,opacity:0},{y:0,opacity:1,duration: 0.8,delay:0.1,stagger:0.4,scrollTrigger:{
            trigger:textRef.current,
            // scroller:mainRef.current,
            start:"top 80%",
            end:"top 30%",        
            
            }})
        }
    },[])


    return (
        <div className="flex w-full flex-col md:px-12 px-4 h-auto overflow-hidden" >
            <div className="flex w-[100%] flex-col justify-center items-center overflow-hidden" ref={textRef}>
                <h1 className="md:text-5xl text-3xl md:mt-24 mt-10  mb-4 font-normal overflow-hidden">Happy Clients</h1>
                <p className="md:text-md md:w-[100%] w-[80%] text-sm text-center overflow-hidden">Hear what they say about us</p>
            </div>
            <div className="w-[100%] md:h-[350px] h-[250px] flex mt-11 overflow-hidden">
            <ReviewsCourousal/>
            </div>
        </div>
    );
}

export default Reviews;

