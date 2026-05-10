// Cart.jsx

import React, { useState,useEffect,useContext } from 'react';
import api from '../services/api';
import { CartContext } from '../services/CartContext';
export default function Cart() {

  const [cartItems, setCartItems] = useState([]);
  const token = localStorage.getItem('token');
  const { cartCount, setCartCount } = useContext(CartContext);
  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    
    if (token) {
      try {
        const res = await api.get('/cart', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
       // console.log(res.data);
        setCartItems(res.data.cart);
      } catch (error) {
        console.log(error);
      }
    }else {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      setCartItems(cart);
    }
  };

  const increaseQty = (id) => {
    if(token){
      api.post('/update-cart',
         { product_id: id, action: 'increment' },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
    }else{
      let cart = JSON.parse(localStorage.getItem('cart')) || [];

      cart = cart.map(item =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      );
      localStorage.setItem('cart', JSON.stringify(cart));
    }
      alert('QTY increased');
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, qty: item.qty + 1 } : item
    ));
  };

  const decreaseQty = (id) => {
    if(token){
      api.post('/update-cart',
         { product_id: id, action: 'decrement' },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
    }else{
      let cart = JSON.parse(localStorage.getItem('cart')) || [];

      cart = cart.map(item =>
        item.id === id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item
      );
      localStorage.setItem('cart', JSON.stringify(cart));
    }
    alert('QTY decreased');
    setCartItems(cartItems.map(item =>
      item.id === id && item.qty > 1
        ? { ...item, qty: item.qty - 1 }
        : item
    ));
  };

  const removeItem = async (id) => {

  const token = localStorage.getItem('token');

  if (token) {
    try {
      await api.post('/remove-cart',
        { product_id: id },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
        alert('Item removed from cart');
      setCartItems(cartItems.filter(item => item.id !== id));

    } catch (error) {
      console.log(error);
    }

  } else {

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    cart = cart.filter(item => item.id !== id);

    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Item removed from cart');
    setCartItems(cart);
  }
};

  const total = Array.isArray(cartItems)
 ? cartItems?.reduce((sum,item)=>sum + item.price * item.qty,0)
 : 0;

 const handleCheckout = () => {
  if(cartItems.length === 0){
    alert('Your cart is empty');
    return;
  }
  if(token){
    window.location.href = '/checkout';
  }else{
    alert('Please login to proceed to checkout');
    window.location.href = '/signup';
  }
}

  return (
    <div className="cart-page">

      <h2>Shopping Cart</h2>

      <div className="cart-container">

        <div className="cart-left">
          {cartItems?.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cartItems?.length > 0 && cartItems.map(item => (
              <div className="cart-card" key={item.id}>

                <img src={item.image_url} alt={item.name} />

                <div className="cart-info">
                  <h3>{item.name}</h3>
                  <p>₹{item.price}</p>

                  <div className="qty-box">
                    <button onClick={() => decreaseQty(item.id)}>-</button>
                    <span>{item.qty}</span>
                    <button onClick={() => increaseQty(item.id)}>+</button>
                  </div>

                  <button
                    className="remove-btn"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>
                </div>

              </div>
            ))
          )}
        </div>

        <div className="cart-right">
          <h3>Price Details</h3>

          <div className="price-row">
            <span>Total Items</span>
            <span>{cartItems?.length}</span>
          </div>

          <div className="price-row">
            <span>Total Amount</span>
            <span>₹{total}</span>
          </div>

          <button className="checkout-btn" onClick={handleCheckout}>
            Proceed to Checkout
          </button>
        </div>

      </div>

    </div>
  );
}