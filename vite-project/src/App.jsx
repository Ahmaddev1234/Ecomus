import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './partials/Navbar';
import { ToastContainer } from 'react-toastify';
import Success from './components/Success';
import Cancel from './components/Cancel';
import ProtectedRoute from './partials/ProtectedRoute';
import { useSelector } from "react-redux";
import Headroom from 'react-headroom';

// Lazy-loaded components (ensure file names exactly match these)
const Home = lazy(() => import('./pages/Home'));
const Cart = lazy(() => import('./pages/Cart'));
const AddProducts = lazy(() => import('./pages/AddProducts'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Categories = lazy(() => import('./pages/Categories'));
const AllProducts = lazy(() => import('./pages/AllProducts'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Suspense fallback={<div>Loading....</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/cart"
              element={
                <ProtectedRoute requiredRole={["user", "admin"]}>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/addproducts"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AddProducts />
                </ProtectedRoute>
              }
            />
            <Route path="/checkout/:id" element={<Checkout />} />
            <Route path="/categories/:id" element={<Categories />} />
            <Route path="/shopcollection" element={<AllProducts />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/success" element={<Success />} />
            <Route path="/cancel" element={<Cancel />} />
          </Routes>
        </Suspense>
        <ToastContainer />
      </Router>
    </>
  );
};

export default App;
