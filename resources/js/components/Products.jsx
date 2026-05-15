import api from "../services/api";
import { CartContext } from "../services/CartContext";
import { useNavigate, Link } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
export default function Products({ products }) {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const { cartCount, setCartCount } = useContext(CartContext);
    const { addToCart } = useContext(CartContext);
    const { handleBuyNow } = useContext(CartContext);

    return (
        <div className="row py-3">
            {products.map((item) => (
                <div className="col-md-3" key={item.id}>
                    <div
                        className="card mx-auto"
                        style={{ width: "18rem", marginBottom: "5%" }}
                    >
                        <Link to={`/product-details/${item.slug}`}>
                            {" "}
                            <img
                                src={item.image_url}
                                className="card-img"
                                alt={item.name}
                            />
                        </Link>
                        <div className="card-body text-center">
                            <h5 className="card-title">
                                {item.name.substring(0, 20)}
                            </h5>

                            <p className="card-text">
                                Stylish furniture for modern homes and offices.
                            </p>

                            <h4 className="text-success mb-3">
                                ₹ {item.price}
                            </h4>
                            <div className="d-flex gap-2">
                                <button
                                    onClick={() => handleBuyNow(item)}
                                    className="btn btn-primary"
                                >
                                    Check Out
                                </button>

                                <button
                                    className="btn btn-warning ms-2"
                                    onClick={() => addToCart(item)}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
