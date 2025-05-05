import React from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = ({sliderRef}) => {
  const navigate = useNavigate();

    const items=[
      {
        imgSrc:"/images/shirts.png",
        btnText:"Clothes",
        bgColor:"bg-gray-100"
        },
        { 
         imgSrc:"/images/shopbycat2.png",
         btnText:"Sunglasses",
         bgColor:"bg-pink-50"
         },
         {
         imgSrc:"/images/shopbycart3.png",
         btnText:"Shoes",
         bgColor:"bg-gray-50"
         },
         {
         imgSrc:"/images/shopbycart1.png",
         btnText:"Bags",
         bgColor:"bg-pink-50"
         },
 
     ]
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
      
  
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } }
    ]
  };

  const resolve=(category)=>{
    navigate(`/categories/${category}`)
}

  return (
    <div className=" w-full h-[100%] overflow-hidden  ">
      <Slider ref={sliderRef} {...settings}>
        {items.map((item, index) => (
          <div key={index} className={`w-[280px] md:h-[350px] ${item.bgColor} overflow-hidden border-white border-[8px]   h-[250px] rounded-lg relative`}>
            <img className=" w-full  object-cover" src={item.imgSrc} alt="" />
            <button className="group py-2 px-8 bg-white rounded-sm font-semibold text-black absolute md:top-[285px] top-[180px] md:left-[20px] left-2 hover:bg-black hover:text-white" onClick={()=>resolve(item.btnText)}>
              {item.btnText} <i className="ri-arrow-right-up-line hidden group-hover:inline"></i>
            </button>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
