import React, { useEffect, useContext,useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { CartContext } from '../services/CartContext';
export default function ProductDetails() {
    const { slug } = useParams();
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
     const { addToCart } = useContext(CartContext);
     const { handleBuyNow } = useContext(CartContext);

  useEffect(()=>{
    getProductDetails(slug);

  },[slug]);


  const getProductDetails = async (slug) => {
          try {
              setLoading(true);  
              let url = `/product-details/${slug}`;
              const res = await api.get(url);
  
              setProducts(res.data.product);
              console.log(res.data.product.name);
          } catch (error) {
              console.log(error);
  
          } finally {
              setLoading(false);  
          }
      };

  return (
    <div className="container my-4">
      <div className="row g-4">

        {/* Left Side - Image + Buttons */}
        <div className="col-12 col-md-5">

          <div className="card p-3 shadow-sm">
            
            <img
              src={products?.image_url}
              alt={products?.name}
              className="img-fluid rounded"
            />

           
          </div>

        </div>

        {/* Right Side - Details */}
        <div className="col-12 col-md-7">

          <div className="card p-4 shadow-sm">

            <h1 className="mb-2">{products?.name}</h1>

            <h5 className="text-muted">
              (Gold, 4GB RAM, 64GB Storage)
            </h5>

            <h6 className="mt-2">Best Phone Available</h6>
            <h6>Long Battery Life</h6>

            <h4 className="text-success mt-3">
              Special Price ₹ {products?.price}
            </h4>

            {/* <hr /> */}
            <div className="d-flex flex-column flex-md-row gap-2 mt-3">

                <a href="/error" className="w-100">
                    <button className="btn btn-primary w-100" onClick={() => handleBuyNow(products)}>
                    Buy Now
                    </button>
                </a>

                <div  className="w-100">
                    <button className="btn btn-warning w-100" onClick={() => addToCart(products)}>
                    Add To Cart
                    </button>
                </div>
            </div>

            <hr />
            <h4>Description:</h4>

            <p className="text-secondary">
              {products.description}
            </p>

          </div>

        </div>

      </div>
    </div>
  );
}