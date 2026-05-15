import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
export default function AddressList() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [addresList, setAddressList] = useState([]);
    const token = localStorage.getItem("token");
    useEffect(() => {
        if (!token) {
            navigate("/signup");
        } else {
            getAddressList();
        }
    }, []);
    const getAddressList = async () => {
        try {
            const res = await api.get("/address-list", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            });

            setAddressList(res.data.data);
            console.log(res.data.data);
        } catch (error) {
            console.log(error);
        } finally {
            // setLoading(false);
        }
    };
    return (
        <section
            className="d-flex align-items-center bg-light py-5"
            style={{ minHeight: "100vh" }}
        >
            <div className="container">
                <div className="row g-4">
                    {/* Left Side Dashboard Menu */}
                    <div className="col-lg-4">
                        <div className="card shadow border-0 rounded-4 h-100">
                            <div className="card-body p-4">
                                <h4 className="fw-bold mb-4 text-center">
                                    User Dashboard
                                </h4>

                                <div className="d-grid gap-3">
                                    <button
                                        onClick={() => navigate("/cart")}
                                        className="btn btn-primary btn-lg rounded-pill"
                                    >
                                        🛒 Go to Cart
                                    </button>

                                    <button
                                        onClick={() =>
                                            navigate("/user/orderlist")
                                        }
                                        className="btn btn-success btn-lg rounded-pill"
                                    >
                                        📦 My Orders
                                    </button>
                                    <button
                                        onClick={() =>
                                            navigate("/user/address-list")
                                        }
                                        className="btn btn-warning btn-lg rounded-pill"
                                    >
                                        Address List
                                    </button>

                                    <button
                                        onClick={() => {
                                            localStorage.removeItem("token");
                                            navigate("/signup");
                                        }}
                                        className="btn btn-danger btn-lg rounded-pill"
                                    >
                                        🚪 Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side User Info */}
                    <div className="col-lg-8">
                        <div className="card shadow border-0 rounded-4">
                            <div className="card-header bg-white border-0 pt-4 px-4">
                                <h4 className="fw-bold mb-0">
                                    📍 My Address List
                                </h4>
                            </div>

                            <div className="card-body p-4">
                                {addresList.map((list) => (
                                    <div
                                        key={list.id}
                                        className="border rounded-3 p-3 mb-3 d-flex justify-content-between align-items-start"
                                    >
                                        <div>
                                            <h6 className="fw-bold mb-1">
                                                Home
                                            </h6>
                                            <p className="mb-1 text-muted">
                                                {list.name},{list.address},{" "}
                                                {list.city},{list.state} -{" "}
                                                {list.postal_code}
                                            </p>
                                            {/* <small className="text-success">
                                                Default Address
                                            </small> */}
                                        </div>

                                        <div className="btn-group">
                                            <button className="btn btn-sm btn-outline-primary">
                                                Edit
                                            </button>
                                            <button className="btn btn-sm btn-outline-danger">
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
