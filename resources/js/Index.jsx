import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./frontend/Home";
import SignIn from "./frontend/Auth/SignIn";
import SignUp from "./frontend/Auth/SignUp";
import Cart from "./frontend/Cart";
import Checkout from "./frontend/Checkout";
import Success from "./frontend/Success";
import Dashboard from "./frontend/dashboard/Dashboard";
import OrdersList from "./frontend/dashboard/OrderList";
import ProductList from "./frontend/ProductList";
import Loader from "./components/Loader";

function Layout() {

  const location = useLocation();
const [loading, setLoading] = useState(false);

 const hiddenPaths = ["/signin", "/signup", "/forgot-password"];
const hideLayout = hiddenPaths.includes(location.pathname);

  return (
    <>
      {!hideLayout && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment-success" element={<Success />} />
        <Route path="/product-list/:id" element={<ProductList />} />

        <Route path="/user/dashboard" element={<Dashboard />} />
        <Route path="/user/orderlist" element={<OrdersList />} />

        {/* SignIn / Signup */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>

      {!hideLayout && <Footer />}

      {/* GLOBAL LOADER OVERLAY */}
      {loading && <Loader />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}