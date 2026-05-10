import api from '../services/api';
import { CartContext } from '../services/CartContext';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState,useContext  } from 'react';
export default function Products({products}) {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const { cartCount, setCartCount } = useContext(CartContext);
const addToCart = async (product) => {

    // If login user
    if (token) {
        try {
            await api.post('/add-cart',
                { product_id: product.id },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
           setCartCount(cartCount + 1);
        } catch (error) {
            console.log(error);
        }

    } else {

        // Guest user localStorage cart
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        const exist = cart.find(item => item.id === product.id);

        if (exist) {
            exist.qty += 1;
        } else {
            cart.push({
                ...product,
                qty: 1
            });
            setCartCount(cartCount + 1);
        }

        localStorage.setItem('cart', JSON.stringify(cart));

        alert('Added to cart');
    }
};

const handleBuyNow = (product) => {
    if(token){
  navigate("/checkout", {
    state: {
      type: "buy_now",
      product: product,
      qty: 1
    }
  });
}else{
    navigate('/signup');
}
};

    return (
        <>

        <div className="product-grid">
          {products.map((item) => (
            <div className="card" key={item.id}>
              <img src={item.image_url} alt={item.name} />
              <h3>{item.name}</h3>
              <p>₹  {item.price}</p>
              <div style={{ display: "flex", gap: "10px" }}>
                <button onClick={() => handleBuyNow(item)}>Buy Now</button>

                <button onClick={() => addToCart(item)}>
                    Add To Cart
                </button>
            </div>
            </div>
          ))}
          
        </div>
        </>
            );
    }