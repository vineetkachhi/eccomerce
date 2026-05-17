import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import SideBarMenu from "./SideBarMenu";

export default function AddressAdd() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
    });

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [addresList, setAddressList] = useState([]);
    const token = localStorage.getItem("token");
    useEffect(() => {
        if (!token) {
            navigate("/signup");
        } else {
        }
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleAddress = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");

            const res = await api.post(
                "/add-address",
                {
                    name: form.name,
                    email: form.email,
                    phone: form.phone,
                    address: form.address,
                    city: form.city,
                    state: form.state,
                    postal_code: form.postal_code,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            if (res.data.status === "success") {
                alert("Address added successfully!");
                navigate("/user/address-list");
            } else {
                alert(res.data.message || "Something went wrong!");
            }
        } catch (error) {
            console.error(error);
            alert("Server error! Please try again.");
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

                    <SideBarMenu />

                    {/* Right Side User Info */}
                    <div className="col-lg-8">
                        <div className="card shadow border-0 rounded-4">
                            <div className="card-header bg-white border-0 pt-4 px-4">
                                <h4 className="fw-bold mb-0">
                                    📍 Add New Address
                                </h4>
                            </div>

                            <div className="card border-0 shadow-sm rounded-4">
                                <div className="card-body p-4">
                                    <form onSubmit={handleAddress}>
                                        <div className="mb-3">
                                            <input
                                                type="text"
                                                name="name"
                                                className="form-control"
                                                placeholder="Full Name"
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <input
                                                type="email"
                                                name="email"
                                                className="form-control"
                                                placeholder="Email Address"
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <input
                                                type="text"
                                                name="phone"
                                                className="form-control"
                                                placeholder="Mobile Number"
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <textarea
                                                name="address"
                                                className="form-control"
                                                placeholder="Full Address"
                                                rows="4"
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <div className="row g-2 mb-3">
                                            <div className="col-md-6">
                                                <input
                                                    type="text"
                                                    name="city"
                                                    className="form-control"
                                                    placeholder="City"
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>

                                            <div className="col-md-6">
                                                <input
                                                    type="text"
                                                    name="state"
                                                    className="form-control"
                                                    placeholder="State"
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="mb-3">
                                            <input
                                                type="text"
                                                name="postal_code"
                                                className="form-control"
                                                placeholder="Pincode"
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            className="btn btn-primary w-100 rounded-pill py-2"
                                        >
                                            Add Address
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
