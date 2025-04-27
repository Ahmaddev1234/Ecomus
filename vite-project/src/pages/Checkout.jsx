import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {loadStripe} from '@stripe/stripe-js';
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  addToCart,
  clearCart,
} from '../features/cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';

function Checkout() {
  const navigate=useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); // Local state to manage quantity
  const { id } = useParams();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const isAuthenticated=useSelector((state)=>state.auth.isAuthenticated)
  // const Item = cartItems.find((p) => p._id === id); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await fetch(`http://localhost:3000/products/checkout/${id}`);
        const product = await data.json();
        setProduct(product.data || []);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchProducts();
  }, [id]);

  if (!product) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  // Function to handle increase in quantity
  const increaseQuantityHandler = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  // Function to handle decrease in quantity
  const decreaseQuantityHandler = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1)); // Prevent quantity from going below 1
  };

  // Add to cart
  const addToCartHandler = async () => {
    try {
      const response = await fetch(`http://localhost:3000/users/cart/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, quantity }),
        credentials: 'include',
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message);
      } else {
        toast.success(data.message);
        dispatch(increaseQuantity({ id }));
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  // Remove from cart
  // const removeFromCartHandler = async () => {
  //   try {
  //     const response = await fetch(`http://localhost:3000/users/cart/remove`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ productId: id }),
  //       credentials: 'include',
  //     });
  //     const data = await response.json();
  //     if (!response.ok) {
  //       toast.error(data.message);
  //     } else {
  //       toast.success(data.message);
  //       dispatch(decreaseQuantity({ id }));
  //     }
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // };


  const handlePayment=async()=>{
      const stripe= await loadStripe("pk_test_51RGNYtFV6iYOcZnce6FDZaApoJK5KlCeoTAfBw5j3Mg2jzOXzWbO12AoW9KWoHgBrjobS03eWCWGmO9xY4agZIOm00d0MXx4t8")

      const body={
        products:product,
        quantity:quantity
      }
          try {
      const response = await fetch('http://localhost:3000/users/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        credentials: 'include',
      });
      const session = await response.json();
      const result=stripe.redirectToCheckout({
        sessionId:session.id
      })
      if(result.error){
        console.log(result.error);
        
      }

    } catch (err) {
      console.log(err.message);
    }

  }

  return (
    <>
      <div className="w-full h-auto">
        <div className="flex md:flex-row flex-col w-[100%] h-[100%] gap-12 md:px-16 md:mt-40 mt-12">
          <div className="md:w-[600px] w-[100%] h-[730px] bg-gray-300 flex-shrink-0 flex rounded-lg">
            <img
              className="md:w-[500px] w-[100%] object-cover"
              src={product.imgUrl}
              alt=""
            />
          </div>
          <div className="flex flex-col w-[100%] gap-6 py-4 px-3 md:px-0">
            <h1 className="text-3xl font-normal">{product.name}</h1>
            <div className="flex gap-4">
              <p className="text-3xl text-red-600 font-normal">768.000</p>
              <p className="text-2xl text-gray-500 line-through font-normal">
                {product.price}
              </p>
              <div className="flex items-center justify-center px-6 rounded-full text-white">
                <p className="text-[14px] py-1 px-3 rounded-full bg-[#FC5732] font-semibold">
                  {product.discount}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <p>
                Size: <span className="font-semibold">M</span>
              </p>
              <div className="flex gap-4">
                <div className="bg-black flex items-center justify-center text-white rounded-sm px-4 py-2">
                  <p>M</p>
                </div>
                <div className=" flex border items-center justify-center text-black rounded-sm px-4 py-2">
                  <p>L</p>
                </div>
                <div className=" flex line-through border items-center justify-center text-black rounded-sm px-4 py-2">
                  <p>XL</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <p className="font-semibold">Quantity</p>
              <div className="flex w-[100px] justify-around rounded-sm bg-slate-200 py-2 px-2">
                <i
                  className="ri-subtract-line cursor-pointer"
                  onClick={decreaseQuantityHandler}
                ></i>
                <span className="mx-2">{quantity}</span>
                <i
                  className="ri-add-line cursor-pointer"
                  onClick={increaseQuantityHandler}
                ></i>
              </div>
            </div>

            <div className="flex gap-2">
              <div
                onClick={addToCartHandler}
                className="bg-black text-white w-full py-2 flex items-center rounded-sm justify-center font-semibold cursor-pointer"
              >
                <h1>Add To Cart - {product.price * quantity}</h1>
              </div>
              <div className="bg-white border flex flex-shrink-0 text-xl rounded-md px-3 py-2 hover:border-black cursor-pointer">
                <i class="ri-heart-3-line"></i>
              </div>
            </div>

            <div className="bg-[#DB1215] w-full rounded-sm text-white font-semibold py-2 flex items-center justify-center cursor-pointer">
            <h1 onClick={isAuthenticated ? handlePayment : () => navigate('/login',{ state: { from: `/checkout/${id}` } })}>BUY IT NOW</h1>

            </div>

            <div className="flex w-[100%] md:flex-row flex-col gap-6 md:justify-between">
              <div className="flex flex-col md:w-[48%] w-[100%] h-auto border gap-3 justify-around px-6 py-9">
                <i class="ri-truck-line text-3xl text-center"></i>
                <p className="text-sm text-center">
                  Estimate delivery times: <strong>12-26 days</strong> (International),<strong> 3-6 days </strong> (United States).
                </p>
              </div>
              <div className="flex flex-col md:w-[48%] w-[100%] h-auto border gap-3 justify-around px-6 py-9">
                <i class="ri-corner-down-right-fill text-3xl text-center"></i>
                <p className="text-sm text-center">
                  Return within <strong>30 days </strong> of purchase. Duties & taxes are non-refundable..
                </p>
              </div>
            </div>

            <div className="txt-sm flex md:justify-between gap-3 md:flex-row flex-col ">
              <div className="flex items-center">
                <i class="ri-shield-check-line text-2xl"></i>
                <p className="text-md font-semibold">Guarantee Safe Checkout</p>
              </div>
              <div className="flex gap-2">
                <div className="border-2 border-gray-400 h-[30px] px-2 flex justify-center items-center overflow-hidden">
                  <i class="ri-visa-line text-2xl text-blue-600 "></i>
                </div>
                <div className="border-2 border-gray-400 h-[30px] px-2 flex justify-center items-center overflow-hidden">
                  <i class="ri-paypal-fill text-2xl text-blue-600 "></i>
                </div>
                <div className="border-2 border-gray-400 h-[30px] px-2 flex justify-center items-center overflow-hidden">
                  <i class="ri-mastercard-fill text-2xl text-red-500 "></i>
                </div>
                <div className="border-2 border-gray-400 h-[30px] px-2 flex justify-center items-center overflow-hidden">
                  <i class="ri-alipay-fill text-2xl text-green-500 "></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Checkout;
