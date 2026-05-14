import React, { useEffect, useContext } from 'react';
import { ProductContext } from '../services/ProductContext';
import Products from '../components/Products';
import '../css/product.css';
import { useParams } from 'react-router-dom';
import Loader from "../components/Loader";
export default function ProductList() {

    const { id } = useParams();
    const {
        products,
        getProducts,
        pagination,loading
    } = useContext(ProductContext);

    useEffect(() => {

        getProducts(id);

    }, [id]);

    const changePage = (page) => {

        getProducts(id, page);

    };

    return (
        <>
          {loading && <Loader />}
        <div className="container">

            <h1 className="title">
                Product List
            </h1>

            <div className="product-grid">

                <Products products={products} />

            </div>

            {

                pagination?.last_page > 1 && (

                    <div className="pagination">

                        <button
                            className="pagination-btn"
                            disabled={pagination.current_page === 1}
                            onClick={() => changePage(pagination.current_page - 1)}
                        >
                            ← Prev
                        </button>

                        <div className="pagination-info">

                            <span className="current-page">
                                {pagination.current_page}
                            </span>

                            <span className="pagination-text">
                                of
                            </span>

                            <span className="last-page">
                                {pagination.last_page}
                            </span>

                        </div>

                        <button
                            className="pagination-btn"
                            disabled={pagination.current_page === pagination.last_page}
                            onClick={() => changePage(pagination.current_page + 1)}
                        >
                            Next →
                        </button>

                    </div>

                )

            }

        </div>
</>
    );

}