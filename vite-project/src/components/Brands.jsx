import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

function Brands() {
    const items = [
        { imgUrl: "/images/brands1.png", imgWidth: 100 },
        { imgUrl: "/images/brands2.png", imgWidth: 150 },
        { imgUrl: "/images/brands3.png", imgWidth: 100 },
        { imgUrl: "/images/brands4.png", imgWidth: 100 },
        { imgUrl: "/images/brands5.png", imgWidth: 150 }
    ];

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 2 } },
            { breakpoint: 768, settings: { slidesToShow: 2 } }
        ]
    };

    return (
        <div className="w-full h-[120px] overflow-hidden px-14 md:mt-0 mt-7">
            <Slider {...settings}>
                {items.map((item, index) => (
                    <div className='flex items-center justify-center  md:w-[20%] w-[50%]  p-2 h-[100px]' key={index}>
                    <div
                        
                        className="flex items-center justify-center border w-[100%] border-black pb-2  h-[100%]"
                    >
                        <img
                            src={item.imgUrl}
                            alt=""
                             // ✅ FIXED: Correct className syntax
                            style={{ width: item.imgWidth }}
                        />
                    </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default Brands;
