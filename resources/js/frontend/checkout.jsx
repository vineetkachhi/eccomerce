// Checkout.jsx

import React, { useState,useEffect, use } from 'react';
import { useNavigate,useLocation  } from 'react-router-dom';

import api from '../services/api';
export default function Checkout() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    payment: 'cod'
  });
   const [cartTotal, setCartTotal] = useState(0);
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const token = localStorage.getItem('token');
  

  const location = useLocation();
  const data = location.state;
const [productId,setProductId] = useState([]);
const [purchasetype,setPurchasetype] =useState([]);
useEffect(() => {
  if (data?.type === "buy_now") {

    const product = data.product;

    const total = product.price * (data.qty || 1);

    setCartTotal(total);
    setPurchasetype('buy_now');
    setProductId(product.id);

    console.log(product.id);

  } else {
    fetchCartItems();
  }
}, [data]); // added dependency
 

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };


const handlePayment = async (e) => {
  e.preventDefault(); 

  const token = localStorage.getItem('token');

  const res = await api.post(
    '/create-order',
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
        product_id:productId,
        type:purchasetype,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
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
          '/verify-payment',
          {
            product_order_id: res.data.order_id, 
            amount: res.data.amount,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        if (verifyRes.data.status) {
          navigate(`/payment-success?order_id=${res.data.order_id}`);
        } else {
          navigate('/payment-failed');
        }

      } catch (err) {
        navigate('/payment-failed');
      }
    },

    theme: {
      color: "#3399cc"
    }
  };

  const razor = new window.Razorpay(options);
  razor.open();
};
  const fetchCartItems = async () => {
        try {
          const res = await api.get('/cart', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          console.log(res.data);
          const total = res.data.cart.reduce((acc, item) => acc + item.total_price, 0);
          setCartItems(res.data.cart);
          setCartTotal(total);
        } catch (error) {
          console.log(error);
        }
    };

  const placeOrder = (e) => {
    e.preventDefault();

    console.log(form);

    alert('Order Placed Successfully!');
  };

  return (
    <div className="checkout-page">

      <h2>Checkout</h2>

      <div className="checkout-container">

        {/* Left */}
        <div className="checkout-left">

          <form onSubmit={handlePayment} method="POST">

            <h3>Billing Details</h3>

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="phone"
              placeholder="Mobile Number"
              onChange={handleChange}
              required
            />

            <textarea
              name="address"
              placeholder="Full Address"
              rows="4"
              onChange={handleChange}
              required
            ></textarea>

            <div className="row">
              <input
                type="text"
                name="city"
                placeholder="City"
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="state"
                placeholder="State"
                onChange={handleChange}
                required
              />
            </div>

            <input
              type="text"
              name="postal_code"
              placeholder="Pincode"
              onChange={handleChange}
              required
            />

            <h3>Payment Method</h3>

            <label>
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={form.payment === 'cod'}
                onChange={handleChange}
              />
              Cash on Delivery
            </label>

            <label>
              <input
                type="radio"
                name="payment"
                value="online"
                onChange={handleChange}
              />
              Online Payment
            </label>

            <button type="submit"  >
              Place Order
            </button>

          </form>

        </div>

        {/* Right */}
        <div className="checkout-right">

          <h3>Order Summary</h3>

          <div className="summary-row">
            <span>Items Total</span>
            <span>₹{cartTotal}</span>
          </div>

          <div className="summary-row">
            <span>Delivery Charge</span>
            <span>₹0</span>
          </div>

          <div className="summary-row total">
            <span>Total Amount</span>
            <span>₹{cartTotal}</span>
          </div>

        </div>

      </div>

    </div>
  );
}