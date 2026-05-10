import { createContext, useEffect, useState } from 'react';
import api from './api';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {

        fetchCartCount();

    }, []);

    const fetchCartCount = async () => {

        try {

            const token = localStorage.getItem('token');
            if(token){
                const res = await api.get('/cart-count', {
                    headers: {
                        Authorization: `Bearer ${token}`
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

    return (
        <CartContext.Provider
            value={{
                cartCount,
                setCartCount,
                fetchCartCount
            }}
        >
            {children}
        </CartContext.Provider>
    );
};