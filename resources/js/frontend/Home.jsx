// Home.jsx
import React, { useEffect, useState,useContext  } from 'react';
import Products  from '../components/Products';
import api from '../services/api';
import Loader from "../components/Loader";
export default function Home() {

const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        try {
            setLoading(true);  

            let url = '/products';
            const res = await api.get(url);

            setProducts(res.data.products.slice(0, 8));

        } catch (error) {
            console.log(error);

        } finally {
            setLoading(false);  
        }
    };


return (
  <div>

    {loading && <Loader />}

    {/* PAGE ALWAYS RENDER */}
    <section className="offer">
      <div className="text-center my-5">
        <h1 className="display-4">Big Billion Days Sale</h1>
        <p>Up to 80% Off on Top Brands</p>
        <hr className="w-25 mx-auto" />
      </div>

      <Products products={products} />
    </section>

  </div>
);
}