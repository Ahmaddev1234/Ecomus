import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);
function BestSeller() {
    const navigate = useNavigate();
    const favRef = useRef([]);
    const textRef = useRef(null);
    const [products, setProducts] = useState([]);
    const [visibleProducts, setVisibleProducts] = useState(8); 

    useEffect(() => {
        const ctx=gsap.context(()=>{
        gsap.fromTo(
            textRef.current.children,
            { y: 100, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.3,
                delay: 0.1,
                stagger: 0.4,
                scrollTrigger: {
                    trigger: textRef.current,
                    start: "top 60%",
                    end: "top 30%",
                },
            }
        );
    })
    ScrollTrigger.refresh();
    return ()=>ctx.revert();
    }, []);

    const magicEnter = (index) => {
        gsap.to(favRef.current[index], {
            y: 0,
            opacity: 1,
            duration: 0.3,
            stagger: 0.1,
        });
    };

    const magicLeave = (index) => {
        gsap.to(favRef.current[index], {
            y: 20,
            opacity: 0,
            duration: 0.3,
            stagger: 0.3,
        });
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:3000/products");
                const data = await response.json();
                setProducts(data.data || []); 
                ScrollTrigger.refresh();
            } catch (err) {
                console.log("Error fetching products:", err);
            }
        };

        fetchProducts();
    }, []);

    const loadMoreProducts = () => {
        setVisibleProducts((prev) => prev + 8);
    };

    const resolve=(productId)=>{
        navigate(`/checkout/${productId}`)
    }

    return (
        <div className="flex w-full flex-col md:px-12 px-4">
            <div className="flex w-[100%] flex-col justify-center items-center" ref={textRef}>
                <h1 className="md:text-5xl text-3xl md:mt-24 mt-10 mb-4 font-normal">Best Seller</h1>
                <p className="md:text-md md:w-[100%] w-[80%] text-sm text-center">
                    Shop the Latest Styles: Stay ahead of the curve with our newest arrivals
                </p>
            </div>

            <div className="w-[100%] h-auto flex flex-wrap overflow-hidden justify-between md:gap-4 gap-1 mt-14">
                {products.slice(0, visibleProducts).map((product, index) => (
                    <div onClick={()=>{resolve(product._id)}}
                        className="flex flex-col cursor-pointer rounded-md md:h-[550px] overflow-x-hidden md:w-[290px] h-[350px] w-[48%] mt-4"
                        key={product._id}
                        onMouseEnter={() => magicEnter(index)}
                        onMouseLeave={() => magicLeave(index)}
                    >
                        <div className="relative h-[400px] bg-gray-200 w-[100%] rounded-lg overflow-hidden">
                            <img 
                                className="object-cover w-[100%] h-[100%] hover:scale-110 transition-transform duration-1000" 
                                src={product.imageUrl} 
                                alt={product.name} 
                            />
                            <div 
                                className="gap-4 absolute bottom-4 left-28 flex flex-row opacity-0" 
                                ref={(el) => (favRef.current[index] = el)}
                            >
                                <i className="ri-heart-line text-2xl font-light bg-white px-1 rounded-md hover:bg-black hover:text-white"></i>
                                <i className="ri-shopping-bag-4-line text-2xl font-light bg-white px-1 rounded-md hover:bg-black hover:text-white"></i>
                            </div>
                        </div>
                        <div className="flex flex-col mt-6 text-center justify-center">
                            <h1 className="text-md font-normal">{product.name}</h1>
                            <p className="text-sm font-semibold text-red-600 text-center">${product.price}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/*  Load More Button */}
            {visibleProducts < products.length && (
                <div className="flex justify-center mt-6">
                    <button 
                        onClick={loadMoreProducts} 
                        className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition"
                    >
                        Load More
                    </button>
                </div>
            )}
        </div>
    );
}

export default BestSeller;
