import { createContext, useEffect, useState } from "react";
import api from '../services/api';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async (id = "") => {
        try {

            let url = '/products';

            if (id) {
                url += `/${id}`;
            }

            const res = await api.get(url);

            setProducts(res.data.products);

            console.log(res.data);

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <ProductContext.Provider value={{
            products,
            getProducts
        }}>
            {children}
        </ProductContext.Provider>
    );
};