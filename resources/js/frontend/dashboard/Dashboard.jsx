import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBarMenu from "./SideBarMenu";
export default function Dashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        //console.log("work ");
        if (!token) {
            navigate("/signup");
        } else {
            const userData = localStorage.getItem("user");

            if (userData) {
                const user = JSON.parse(userData); // ✅ important

                setUser({
                    name: user.name,
                    email: user.email,
                });
            }
        }
    }, []);

    return (
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
                        {user && (
                            <div className="card shadow border-0 rounded-4">
                                <div className="card-body text-center p-5">
                                    <div
                                        className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4"
                                        style={{
                                            width: "100px",
                                            height: "100px",
                                            fontSize: "40px",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>

                                    <h2 className="fw-bold mb-3">
                                        Welcome, {user.name}
                                    </h2>

                                    <p className="text-muted fs-5">
                                        {user.email}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
