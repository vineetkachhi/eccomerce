// Checkout.jsx

import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CartContext } from "../services/CartContext";
import api from "../services/api";
import Loader from "../components/Loader";
export default function Checkout() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        payment: "online",
    });

    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const {
        cartCount,
        setCartCount,
        fetchCartItems,
        cartItems,
        cartTotal,
        setCartTotal,
        loading,
        setLoading,
    } = useContext(CartContext);

    const location = useLocation();
    const data = location.state;
    const [productId, setProductId] = useState([]);
    const [purchasetype, setPurchasetype] = useState([]);
    useEffect(() => {
        if (data?.type === "buy_now") {
            const product = data.product;

            const total = product.price * (data.qty || 1);

            setCartTotal(total);
            setPurchasetype("buy_now");
            setProductId(product.id);
            setLoading(false);
            // console.log(product.id);
        } else {
            fetchCartItems();
        }
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, [data]); // added dependency

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handlePayment = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        const res = await api.post(
            "/create-order",
            {
                amount: cartTotal,
                name: form.name,
                email: form.email,
                phone: form.phone,
                address: form.address,
                city: form.city,
                state: form.state,
                postal_code: form.postal_code,
                payment_method: form.payment,
                product_id: productId,
                type: purchasetype,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        const options = {
            key: res.data.key,
            amount: res.data.amount,
            currency: "INR",
            name: "My Store",
            description: "Order Payment",
            order_id: res.data.razorpay_payment_id,
            product_order_id: res.data.order_id,

            handler: async function (response) {
                try {
                    const verifyRes = await api.post(
                        "/verify-payment",
                        {
                            product_order_id: res.data.order_id,
                            amount: res.data.amount,
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        },
                    );

                    if (verifyRes.data.status) {
                        navigate(
                            `/payment-success?order_id=${res.data.order_id}`,
                        );
                    } else {
                        navigate("/payment-failed");
                    }
                } catch (err) {
                    navigate("/payment-failed");
                }
            },

            theme: {
                color: "#3399cc",
            },
        };

        const razor = new window.Razorpay(options);
        razor.open();
    };

    const placeOrder = (e) => {
        e.preventDefault();

        console.log(form);

        alert("Order Placed Successfully!");
    };

    return (
        <>
            {loading && <Loader />}
            <section className="bg-light py-5" style={{ minHeight: "100vh" }}>
                <div className="container">
                    <h2 className="text-center fw-bold mb-4">Checkout</h2>

                    <div className="row g-4">
                        {/* LEFT FORM */}
                        <div className="col-lg-7">
                            <div className="card border-0 shadow-sm rounded-4">
                                <div className="card-body p-4">
                                    <form onSubmit={handlePayment}>
                                        <h4 className="fw-bold mb-3">
                                            Billing Details
                                        </h4>

                                        <div className="mb-3">
                                            <input
                                                type="text"
                                                name="name"
                                                className="form-control"
                                                placeholder="Full Name"
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <input
                                                type="email"
                                                name="email"
                                                className="form-control"
                                                placeholder="Email Address"
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <input
                                                type="text"
                                                name="phone"
                                                className="form-control"
                                                placeholder="Mobile Number"
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <textarea
                                                name="address"
                                                className="form-control"
                                                placeholder="Full Address"
                                                rows="4"
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <div className="row g-2 mb-3">
                                            <div className="col-md-6">
                                                <input
                                                    type="text"
                                                    name="city"
                                                    className="form-control"
                                                    placeholder="City"
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>

                                            <div className="col-md-6">
                                                <input
                                                    type="text"
                                                    name="state"
                                                    className="form-control"
                                                    placeholder="State"
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="mb-3">
                                            <input
                                                type="text"
                                                name="postal_code"
                                                className="form-control"
                                                placeholder="Pincode"
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <h5 className="fw-bold mt-4 mb-3">
                                            Payment Method
                                        </h5>

                                        {/* <div className="form-check mb-2">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="payment"
                                                value="cod"
                                                onChange={handleChange}
                                            />
                                            <label className="form-check-label">
                                                Cash on Delivery
                                            </label>
                                        </div> */}

                                        <div className="form-check mb-3">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="payment"
                                                value="online"
                                                checked={
                                                    form.payment === "online"
                                                }
                                                onChange={handleChange}
                                            />
                                            <label className="form-check-label">
                                                Online Payment
                                            </label>
                                        </div>

                                        <button
                                            type="submit"
                                            className="btn btn-primary w-100 rounded-pill py-2"
                                        >
                                            Place Order
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT SUMMARY */}
                        <div className="col-lg-5">
                            <div className="card border-0 shadow-sm rounded-4">
                                <div className="card-body p-4">
                                    <h4 className="fw-bold mb-4">
                                        Order Summary
                                    </h4>

                                    <div className="d-flex justify-content-between mb-2">
                                        <span>Items Total</span>
                                        <span>₹{cartTotal}</span>
                                    </div>

                                    <div className="d-flex justify-content-between mb-2">
                                        <span>Delivery Charge</span>
                                        <span>₹0</span>
                                    </div>

                                    <hr />

                                    <div className="d-flex justify-content-between fw-bold fs-5">
                                        <span>Total Amount</span>
                                        <span className="text-success">
                                            ₹{cartTotal}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
