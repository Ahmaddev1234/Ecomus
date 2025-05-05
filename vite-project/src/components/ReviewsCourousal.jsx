import React, { useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger"; 


const Carousel = () => {
  gsap.registerPlugin(ScrollTrigger);

    const mainRef=useRef(null);
    const divRefs=useRef([]);

  const items = [
    { title: "Best Online Fashion Site", description: "I always find something stylish and affordable on this website. I love the quality of products and variety of styles", customerName: "Ahmad Hassan" },
    { title: "Best Online Fashion Site", description: "I always find something stylish and affordable on this website. I love the quality of products and variety of styles", customerName: "Ahmad Hassan" },
    { title: "Best Online Fashion Site", description: "I always find something stylish and affordable on this website. I love the quality of products and variety of styles", customerName: "Ahmad Hassan" },
    { title: "Best Online Fashion Site", description: "I always find something stylish and affordable on this website. I love the quality of products and variety of styles", customerName: "Ahmad Hassan" },
    { title: "Best Online Fashion Site", description: "I always find something stylish and affordable on this website. I love the quality of products and variety of styles", customerName: "Ahmad Hassan" },
    { title: "Best Online Fashion Site", description: "I always find something stylish and affordable on this website. I love the quality of products and variety of styles", customerName: "Ahmad Hassan" }
  ];

  const NextArrow = ({ onClick }) => (
    <div className="custom-arrow next absolute right-1 top-[110px] bg-white border border-black inline-block rounded-full px-2 py-1 cursor-pointer" onClick={onClick}>
      <i className="ri-arrow-right-s-line text-black font-extrabold text-2xl"></i>
    </div>
  );

  const PrevArrow = ({ onClick }) => (
    <div className="custom-arrow prev absolute !z-10 left-[0px] top-[110px] bg-white border border-black inline-block rounded-full px-2 py-1 cursor-pointer" onClick={onClick}>
      <i className="ri-arrow-left-s-line text-black font-extrabold text-2xl"></i>
    </div>
  );

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } }

    ],
    
  };

  useEffect(() => {
    if(divRefs.current.length){
      gsap.fromTo(
        divRefs.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.1,scrollTrigger:{trigger:mainRef.current,
          start:"top 80%",
          end:"top 30%",} }
      );
    }
        
  }, []);
  



  return (
    <div className="w-[100%] h-auto overflow-hidden" ref={mainRef}>
      <Slider {...settings}>
        {items.map((item, index) => (
          <div className="flex flex-col h-[250px] pl-3" ref={(elem)=>(divRefs.current[index]=elem)} key={index}>
            <div className="w-[96%] border p-3 border-black rounded-md h-[100%]">
              <div className="flex mt-4">
                <i className="ri-star-s-fill text-yellow-400 text-xl"></i>
                <i className="ri-star-s-fill text-yellow-400 text-xl"></i>
                <i className="ri-star-s-fill text-yellow-400 text-xl"></i>
                <i className="ri-star-s-fill text-yellow-400 text-xl"></i>
                <i className="ri-star-s-fill text-yellow-400 text-xl"></i>
              </div>
              <div className="mt-3">
                <h1 className="text-lg font-semibold">{item.title}</h1>
                <p className="text-md font-light mt-4">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
