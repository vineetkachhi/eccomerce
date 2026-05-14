import React from 'react';
import './static/home.css';
import './static/style.css';
import './static/index.css';
import './static/products.css';

import Appp from './Index';
import { CartProvider } from './services/CartContext';
import { ProductProvider } from './services/ProductContext';

export default function AppRender() {
    return (
        <ProductProvider>
            <CartProvider>
                <Appp />
            </CartProvider>
        </ProductProvider>
    );
}