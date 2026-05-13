

import React from 'react';
import ReactDOM from 'react-dom/client';
// import './css/home.css';
// import './css/login.css';
// import './css/cart.css';
// import './css/checkout.css';
// import './css/success.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './static/home.css';
import './static/style.css';
import './static/index.css';

//import './static/mobile.css';
import App from './Index';
import { CartProvider } from './services/CartContext';
import { ProductProvider } from './services/ProductContext';

ReactDOM.createRoot(document.getElementById('app')).render(
    // <React.StrictMode>
        <ProductProvider>
         <CartProvider>
        <App />
        </CartProvider>
        </ProductProvider>
   // </React.StrictMode>
);