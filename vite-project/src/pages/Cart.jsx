import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Reviews from '../components/Reviews';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  addToCart,
  clearCart, 
} from '../features/cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';

function Cart() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const totalPrice = useSelector((state) => state.cart.totalPrice);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://ecomus-backnd-production.up.railway.app/users/cart', {
        method: 'GET',
        credentials: 'include',
      });
      const data = await response.json();
      setProducts(data.data);

      console.log('Fetched Items:', data.data);

      // Clear Redux cart before syncing with backend
      dispatch(clearCart());

      // Add all backend items to Redux
      data.data.forEach((item) => {
        dispatch(addToCart({ ...item, quantity: item.quantity || 1 }));
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleRemove = async (productId) => {
    try {
      const response = await fetch('https://ecomus-backnd-production.up.railway.app/users/cart/remove', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }),
        credentials: 'include',
      });
      const finalData = await response.json();
      if (!response.ok) {
        toast.error(finalData.message);
      }
      toast.success(finalData.message);
      dispatch(decreaseQuantity({ id: productId }))
      fetchProducts();
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleAdd = async (productId) => {
    try {
      const response = await fetch('https://ecomus-backnd-production.up.railway.app/users/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id:productId,quantity:1 }),
        credentials: 'include',
      });
      const finalData = await response.json();
      if (!response.ok) {
        toast.error(finalData.message);
      }
      toast.success(finalData.message);
      dispatch(increaseQuantity({ id: productId }))
      fetchProducts();
    } catch (err) {
      console.log(err.message);
    }
  };

  if (!cartItems) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  const resolve = (productId) => {
    navigate(`/checkout/${productId}`);
  };

  return (
    <>
      <div className="w-full h-auto flex flex-col">
        <div className="bg-gradient-to-r from-green-50 via-red-200 to-cyan-100 w-full h-[250px] mt-20 flex items-center justify-center">
          <h1 className="text-5xl font-normal">Shopping Cart</h1>
        </div>

        {/* Desktop View */}
        {cartItems.length === 0 ? (
          <div className="hidden w-100% h-[400px] sm:flex justify-center items-center">
            <h1 className="text-3xl">Cart is Empty</h1>
          </div>
        ) : (
          <div className="hidden sm:block mx-4 sm:mx-10 mt-10">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="text-left py-2 px-4">Product</th>
                  <th className="text-left py-2 px-4">Price</th>
                  <th className="text-left py-2 px-4">Quantity</th>
                  <th className="text-left py-2 px-4">Total</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((product, index) => (
                  <tr key={index} className="border-b border-gray-300">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-slate-100 w-[65px] flex-shrink-0">
                          <img
                            className="w-full object-cover cursor-pointer"
                            src={product.imageUrl}
                            alt={product.name}
                            onClick={() => resolve(product._id)}
                          />
                        </div>
                        <div className="flex flex-col">
                          <p className="text-sm sm:text-base cursor-pointer" onClick={() => resolve(product._id)}>
                            {product.name}
                          </p>
                          <button className="underline text-xs sm:text-sm text-red-500 cursor-pointer" onClick={() => handleRemove(product._id)}>
                            Remove
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm sm:text-base">{product.price}</td>
                    <td className="py-4 px-4">
                      <div className="w-[100px] flex justify-between items-center bg-slate-100 py-1 px-2 rounded-md">
                        <i
                          className="ri-subtract-line cursor-pointer"
                          onClick={() => handleRemove(product._id)}
                        ></i>
                        <p>{product.quantity}</p>
                        <i
                          className="ri-add-line cursor-pointer"
                          onClick={() => handleAdd(product._id)}
                        ></i>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm sm:text-base">{(product.price * product.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Mobile View */}
        {cartItems.length === 0 ? (
          <div className="sm:hidden w-100% h-[400px] flex justify-center items-center">
            <h1 className="text-3xl">Cart is Empty</h1>
          </div>
        ) : (
          <div className="sm:hidden mx-4 mt-10">
            {cartItems.map((product, index) => (
              <div key={index} className="border-collapse border-y border-y-gray-200 p-4 flex gap-4 mb-4">
                <div className="bg-slate-100 w-[65px] h-[65px] flex-shrink-0">
                  <img
                    className="w-full h-full object-cover"
                    src={product.imageUrl}
                    alt={product.name}
                    onClick={() => resolve(product._id)}
                  />
                </div>
                <div className="flex flex-col gap-3 w-full">
                  <div className="flex flex-col">
                    <p className="text-base font-semibold">{product.name}</p>
                    <button className="underline text-sm text-red-500 text-left" onClick={() => handleRemove(product._id)}>
                      Remove
                    </button>
                  </div>
                  <hr />
                  <div className="w-full flex justify-between">
                    <h1 className="font-semibold">Price</h1>
                    <p className="font-semibold">{product.price}</p>
                  </div>
                  <hr />
                  <div className="w-full flex justify-between items-center">
                    <h1 className="font-semibold">Quantity</h1>
                    <div className="flex bg-slate-300 py-1 px-1">
                      <i
                        className="ri-subtract-line cursor-pointer"
                        onClick={() => dispatch(decreaseQuantity({ id: product._id }))}
                      ></i>
                      <span className="mx-2" onClick={() => dispatch(increaseQuantity({ id: product._id }))}>
                        {product.quantity}
                      </span>
                      <i className="ri-add-line cursor-pointer"></i>
                    </div>
                  </div>
                  <hr />
                  <div className="w-full flex justify-between">
                    <h1 className="font-semibold">Total</h1>
                    <p className="font-semibold">{(product.price * product.quantity).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Reviews />
      <Footer />
    </>
  );
}

export default Cart;
