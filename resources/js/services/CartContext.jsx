import { createContext, useEffect, useState } from 'react';
import api from './api';
import { useNavigate,Link } from 'react-router-dom';
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const token = localStorage.getItem('token');
    const [cartCount, setCartCount] = useState(0);
    const navigate = useNavigate();
    useEffect(() => {

        fetchCartCount();

    }, []);

    const fetchCartCount = async () => {

        try {

            const token = localStorage.getItem('token');
            console.log("TOKEN =>", token); 
            if(token){
                const res = await api.get('/cart-count', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                           Accept: 'application/json'
                    }
                });
                console.log(res.data.count);
                setCartCount(res.data.count);
            }else{
                setCartCount(0);
            }
        } catch (error) {
            console.log(error);
        }
    };

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
        navigate('/signin');
    }
};

    return (
        <CartContext.Provider
            value={{
                cartCount,
                setCartCount,
                fetchCartCount,
                addToCart,
                handleBuyNow


            }}
        >
            {children}
        </CartContext.Provider>
    );
};