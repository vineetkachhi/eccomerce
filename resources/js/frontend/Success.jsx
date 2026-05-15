import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import React, { useEffect, setState } from "react";

export default function Success() {
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get("order_id");
    const navigate = useNavigate();

    return (
        <section
            className="bg-light d-flex align-items-center justify-content-center"
            style={{ minHeight: "100vh" }}
        >
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-4">
                        <div className="card text-center shadow border-0 rounded-4 p-4">
                            <div className="display-1 text-success mb-3">✓</div>

                            <h2 className="fw-bold text-success">
                                Payment Successful
                            </h2>

                            <p className="text-muted mt-3">
                                Your payment has been processed successfully.{" "}
                                <br />
                                Order ID: <strong>{orderId}</strong>
                                <br />
                                Thank you for your purchase!
                            </p>

                            <div className="d-grid gap-2 mt-4">
                                <button
                                    className="btn btn-primary rounded-pill"
                                    onClick={() => navigate("/user/dashboard")}
                                >
                                    Go to Dashboard
                                </button>

                                <button
                                    className="btn btn-outline-secondary rounded-pill"
                                    onClick={() => navigate("/")}
                                >
                                    Back to Home
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
