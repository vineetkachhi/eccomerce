// Home.jsx
import React, { useEffect, useState,useContext  } from 'react';
import Products  from '../components/Products';
import api from '../services/api';

export default function Home() {


    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        try {
            let url = '/products';
            const res = await api.get(url);
            setProducts(res.data.products.slice(0, 4));

        } catch (error) {
            console.log(error);
        }
    };

  return (
    <div className="home">

      {/* Banner */}
      <section className="banner">
        <h1>Big Billion Days Sale</h1>
        <p>Up to 80% Off on Top Brands</p>
      </section>

      {/* Products */}
              <section className="products">
        <h2>Best Deals</h2>

      <Products  products={products} />

      
      </section>

    </div>
  );
}