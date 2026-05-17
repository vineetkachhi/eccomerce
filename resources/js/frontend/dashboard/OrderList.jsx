import React, { useEffect, useState } from "react";
import api from "../../services/api";
import Loader from "../../components/Loader";
import SideBarMenu from "./SideBarMenu";
export default function OrdersList() {
    const [orders, setOrders] = useState([]); // ✅ array default
    const token = localStorage.getItem("token");
    const [pagination, setPagination] = useState({});
    const [loading, setLoading] = useState(false);
    const fetchOrders = async (page = 1) => {
        setLoading(true);
        try {
            const res = await api.get(`/order-list?page=${page}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            });

            setOrders(res.data.data);
            // console.log(res.data);
            setPagination(res.data.pagination);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);
    const changePage = (page) => {
        fetchOrders(page);

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <>
            {loading && <Loader />}
            <section
                className="d-flex align-items-center bg-light py-5"
                style={{ minHeight: "100vh" }}
            >
                <div className="container">
                    <div className="row g-4">
                        {/* Left Side Dashboard Menu */}
                        <SideBarMenu />

                        {/* Right Side User Info */}
                        <div className="col-lg-8">
                            {/* Header */}
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <div>
                                    <h2 className="fw-bold mb-1 text-dark">
                                        My Orders
                                    </h2>

                                    <p className="text-muted mb-0">
                                        Manage and track your orders
                                    </p>
                                </div>
                                {/* Pagination */}
                                {pagination?.last_page > 1 && (
                                    <div className="d-flex justify-content-center align-items-center gap-3 mt-5 flex-wrap">
                                        <button
                                            className="btn btn-outline-primary rounded-pill px-4"
                                            disabled={
                                                pagination.current_page === 1
                                            }
                                            onClick={() =>
                                                changePage(
                                                    pagination.current_page - 1,
                                                )
                                            }
                                        >
                                            ← Prev
                                        </button>

                                        <div className="bg-white shadow-sm px-4 py-2 rounded-pill fw-semibold">
                                            {pagination.current_page}

                                            <span className="text-muted mx-2">
                                                of
                                            </span>

                                            {pagination.last_page}
                                        </div>

                                        <button
                                            className="btn btn-outline-primary rounded-pill px-4"
                                            disabled={
                                                pagination.current_page ===
                                                pagination.last_page
                                            }
                                            onClick={() =>
                                                changePage(
                                                    pagination.current_page + 1,
                                                )
                                            }
                                        >
                                            Next →
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Orders */}
                            {orders.map((order) => (
                                <div
                                    key={order.order_id}
                                    className="card border-0 shadow-sm rounded-4 mb-4 overflow-hidden"
                                >
                                    {/* Card Header */}
                                    <div className="card-header bg-white border-bottom py-3">
                                        <div className="row text-center text-md-start align-items-center">
                                            <div className="col-md-3 mb-2 mb-md-0">
                                                <small className="text-muted d-block">
                                                    ORDER ID
                                                </small>

                                                <span className="fw-semibold">
                                                    {order.order_id}
                                                </span>
                                            </div>

                                            <div className="col-md-3 mb-2 mb-md-0">
                                                <small className="text-muted d-block">
                                                    DATE
                                                </small>

                                                <span className="fw-semibold">
                                                    {order.date}
                                                </span>
                                            </div>

                                            <div className="col-md-3 mb-2 mb-md-0">
                                                <small className="text-muted d-block">
                                                    TOTAL
                                                </small>

                                                <span className="fw-bold text-success">
                                                    ₹ {order.total}
                                                </span>
                                            </div>

                                            <div className="col-md-3 text-md-end">
                                                <span
                                                    className={`badge px-3 py-2 rounded-pill fs-6 ${
                                                        order.status ===
                                                        "Delivered"
                                                            ? "bg-success"
                                                            : order.status ===
                                                                "Processing"
                                                              ? "bg-warning text-dark"
                                                              : "bg-secondary"
                                                    }`}
                                                >
                                                    {order.status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Card Body */}
                                    <div className="card-body p-4">
                                        {/* Items */}
                                        <div className="mb-4">
                                            <h6 className="fw-bold mb-2">
                                                Ordered Items
                                            </h6>

                                            <p className="text-muted mb-0">
                                                {order.items.join(", ")}
                                            </p>
                                        </div>

                                        {/* Buttons */}
                                        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
                                            <div className="d-flex flex-wrap gap-2">
                                                <button className="btn btn-primary rounded-pill px-4">
                                                    View Details
                                                </button>

                                                <button className="btn btn-outline-secondary rounded-pill px-4">
                                                    Track Order
                                                </button>
                                            </div>

                                            <button className="btn btn-link text-decoration-none fw-semibold">
                                                Buy Again
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* Pagination */}
                        {pagination?.last_page > 1 && (
                            <div className="d-flex justify-content-center align-items-center gap-3 mt-5 flex-wrap">
                                <button
                                    className="btn btn-outline-primary rounded-pill px-4"
                                    disabled={pagination.current_page === 1}
                                    onClick={() =>
                                        changePage(pagination.current_page - 1)
                                    }
                                >
                                    ← Prev
                                </button>

                                <div className="bg-white shadow-sm px-4 py-2 rounded-pill fw-semibold">
                                    {pagination.current_page}

                                    <span className="text-muted mx-2">of</span>

                                    {pagination.last_page}
                                </div>

                                <button
                                    className="btn btn-outline-primary rounded-pill px-4"
                                    disabled={
                                        pagination.current_page ===
                                        pagination.last_page
                                    }
                                    onClick={() =>
                                        changePage(pagination.current_page + 1)
                                    }
                                >
                                    Next →
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}
