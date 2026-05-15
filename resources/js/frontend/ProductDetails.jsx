import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { CartContext } from "../services/CartContext";
import Loader from "../components/Loader";
import { ProductContext } from "../services/ProductContext";
export default function ProductDetails() {
    const { slug } = useParams();
    const { getProductDetails, loading, productsDetails } =
        useContext(ProductContext);
    const { addToCart, handleBuyNow } = useContext(CartContext);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
        getProductDetails(slug);
    }, [slug]);

    return (
        <>
            {loading && <Loader />}
            <div className="container my-4">
                <div className="row g-4">
                    {/* Left Side - Image + Buttons */}
                    <div className="col-12 col-md-5">
                        <div className="card p-3 shadow-sm">
                            <img
                                src={productsDetails?.image_url}
                                alt={productsDetails?.name}
                                className="img-fluid rounded"
                            />
                        </div>
                    </div>

                    {/* Right Side - Details */}
                    <div className="col-12 col-md-7">
                        <div className="card p-4 shadow-sm">
                            <h1 className="mb-2">{productsDetails?.name}</h1>

                            {/* <h5 className="text-muted">
              (Gold, 4GB RAM, 64GB Storage)
            </h5> */}

                            {/* <h6 className="mt-2">Best Phone Available</h6>
            <h6>Long Battery Life</h6> */}

                            <h4 className="text-success mt-3">
                                Special Price ₹ {productsDetails?.price}
                            </h4>

                            {/* <hr /> */}
                            <div className="d-flex flex-column flex-md-row gap-2 mt-3">
                                <div className="w-100">
                                    <button
                                        className="btn btn-primary w-100"
                                        onClick={() =>
                                            handleBuyNow(productsDetails)
                                        }
                                    >
                                        Buy Now
                                    </button>
                                </div>

                                <div className="w-100">
                                    <button
                                        className="btn btn-warning w-100"
                                        onClick={() =>
                                            addToCart(productsDetails)
                                        }
                                    >
                                        Add To Cart
                                    </button>
                                </div>
                            </div>

                            <hr />
                            <h4>Description:</h4>

                            <p className="text-secondary">
                                {productsDetails.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
