import React, { useEffect, useState,useContext  } from 'react';
import { ProductContext  } from '../services/ProductContext';
import Products  from '../components/Products';
import '../css/product.css';
import { useParams } from 'react-router-dom';
export default function ProductList(){
    const { id } = useParams();
const {products,getProducts} = useContext(ProductContext);
useEffect(() => {
        getProducts(id);
    }, [id]);
return(
        //   <Products  products={products} />

         <div className="container">

      <h1 className="title">Product List</h1>

      <div className="product-grid">

            <Products  products={products} />
      </div>

    </div>
    
);

}