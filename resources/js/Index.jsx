import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './frontend/Home';
import Login from './frontend/Auth/Login';
import Cart from './frontend/Cart';
import Checkout from './frontend/Checkout';
import Success from './frontend/Success';
import ProtectedRoute from './ProtectedRoute';
import Dashboard from './frontend/dashboard/Dashboard';
import OrdersList from './frontend/dashboard/OrderList';
import ProductList from  './frontend/ProductList';

export default function App() {
    return (
        <BrowserRouter>
            <Header />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Login />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/payment-success" element={<Success />} />
                <Route path="/product-list/:id" element={<ProductList />} />
                {/* <Route path="/success" element={<Success />} /> */}
                {/* <Route 
                    path="/dashboard" 
                    element={
                        <ProtectedRoute>
                        <Dashboard />
                        </ProtectedRoute>
                    } 
                    /> */}
                    <Route path="/user/dashboard" element={<Dashboard />} />
                    <Route path='/user/orderlist' element={<OrdersList />} />
            </Routes>

            <Footer />
        </BrowserRouter>
    );
}