import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './partials/Navbar';
import Home from './pages/home';
import Cart from './pages/Cart';
import AddProducts from './pages/AddProducts';
import { ToastContainer } from 'react-toastify';
import Checkout from './pages/Checkout';
import Success from './components/Success';
import Cancel from './components/Cancel';
import Categories from './pages/Categories'
import ProtectedRoute from './partials/ProtectedRoute';
import { useSelector } from "react-redux";
import AllProducts from './pages/AllProducts';
import Login from './pages/Login'
import Signup from './pages/Signup';

const App = () => {


  

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/cart" element={
            <ProtectedRoute requiredRole={["user", "admin"]}>
            <Cart />
            </ProtectedRoute>} />
          <Route path="/addproducts" element={
            <ProtectedRoute requiredRole="admin">
            <AddProducts />
            </ProtectedRoute>} />
          <Route path="/checkout/:id" element={<Checkout />} />
          <Route path="/categories/:id" element={<Categories />} />
          <Route path="/shopcollection" element={<AllProducts />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
        </Routes>

        <ToastContainer />
      </Router>
    </>
  );
};

export default App;
