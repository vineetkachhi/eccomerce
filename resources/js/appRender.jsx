import React from "react";
import "./static/home.css";
import "./static/style.css";
import "./static/index.css";
import "./static/products.css";

import Appp from "./Index";
import { CartProvider } from "./services/CartContext";
import { ProductProvider } from "./services/ProductContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AppRender() {
    return (
        <ProductProvider>
            <ToastContainer />
            <CartProvider>
                <Appp />
            </CartProvider>
        </ProductProvider>
    );
}
