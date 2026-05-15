import { createContext, useState } from "react";
import api from "../services/api";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [productsDetails, setProductsDetails] = useState([]);
    const [pagination, setPagination] = useState({});
    const getProducts = async (id = "", page = 1) => {
        try {
            setLoading(true);
            let url = "/products";

            if (id !== "all") {
                url = `/products/${id}?page=${page}`;
            } else {
                url = `/products?page=${page}`;
            }

            console.log("API URL =>", url);

            const res = await api.get(url);

            setProducts(res.data.products);

            setPagination(res.data.pagination);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const getProductDetails = async (slug) => {
        try {
            setLoading(true);
            let url = `/product-details/${slug}`;
            const res = await api.get(url);

            setProductsDetails(res.data.product);
            console.log(res.data.product.name);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ProductContext.Provider
            value={{
                products,
                getProducts,
                pagination,
                loading,
                getProductDetails,
                productsDetails,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};
