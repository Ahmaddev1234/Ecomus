import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";



function ShopLook() {
    gsap.registerPlugin(ScrollTrigger);
    const textRef = useRef(null);


    useEffect(() => {
        if (textRef.current.children) {
            gsap.fromTo(textRef.current.children, { y: 100, opacity: 0 }, {
                y: 0, opacity: 1, duration: 0.8, delay: 0.1, stagger: 0.4, scrollTrigger: {
                    trigger: textRef.current,

                    start: "top 80%",
                    end: "top 30%",

                }
            })
        }
    }, [])


    return (
        <div className="flex w-full flex-col md:px-12 px-4 h-auto overflow-hidden" >
            <div className="flex w-[100%] flex-col justify-center items-center" ref={textRef}>
                <h1 className="md:text-5xl text-3xl md:mt-24 mt-10  mb-4 font-normal">Shop the look</h1>
                <p className="md:text-md md:w-[100%] w-[80%] text-sm text-center">Inspire and let yourself be inspired, from one unique fashion to another</p>
            </div>
            <div className="w-[100%] md:h-[450px] h-[250px] flex mt-11">
                <img className="w-[50%] object-cover" src="/images/ShopLook2.jpg" alt="" />
                <img
                    className="w-[50%] object-cover"
                    src="/images/ShopLook1.jpg"
                    alt="Shop Look"
                />

            </div>
        </div>
    );
}

export default ShopLook;
