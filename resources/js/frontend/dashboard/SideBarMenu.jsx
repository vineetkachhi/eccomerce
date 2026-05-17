import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
export default function SideBarMenu() {
    const navigate = useNavigate();

    return (
        <>
            {/* LEFT MENU */}
            <div className="col-lg-4">
                <div className="card shadow border-0 rounded-4 h-100">
                    <div className="card-body p-4">
                        <h4 className="fw-bold text-center mb-4">
                            User Dashboard
                        </h4>

                        <div className="d-grid gap-3">
                            <button
                                onClick={() => navigate("/user/dashboard")}
                                className="btn btn-primary rounded-pill"
                            >
                                User Dashboard
                            </button>

                            <button
                                onClick={() => navigate("/user/orderlist")}
                                className="btn btn-success rounded-pill"
                            >
                                📦 Orders
                            </button>

                            <button
                                onClick={() => navigate("/user/address-list")}
                                className="btn btn-warning rounded-pill"
                            >
                                📍 Address List
                            </button>

                            <button
                                onClick={() => {
                                    localStorage.removeItem("token");
                                    navigate("/signup");
                                }}
                                className="btn btn-danger rounded-pill"
                            >
                                🚪 Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
