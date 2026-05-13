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
        

        <div className="row py-3">
          {products.map((item) => (
            <div className="col-md-3" key={item.id}>
                <div className="card mx-auto" style={{width:"18rem", marginBottom:"5%"}}>
                <img src={item.image_url} 
                className="card-img"
                alt={item.name} />

            <div className="card-body text-center">
                <h5 className="card-title">{item.name.substring(0, 20)}</h5>

                <p className="card-text">
                    Stylish furniture for modern homes and offices.
                </p>

                <h4 className="text-success mb-3">₹ {item.price}</h4>
                <div className='d-flex gap-2'>
                <button onClick={() => handleBuyNow(item)} className="btn btn-primary" >
                    Check Out
                </button>

                <button className="btn btn-warning ms-2" onClick={() => addToCart(item)}>
                    Add to Cart
                </button>
                </div>
            </div>
        </div>
    </div>
          ))}
          
        </div>
        
            );
    }