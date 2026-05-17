import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import api from "../../services/api";
import SideBarMenu from "./SideBarMenu";
export default function AddressAdd() {
    const location = useLocation();
    const [form, setForm] = useState(
        location.state || {
            name: "",
            email: "",
            phone: "",
            address: "",
            city: "",
            state: "",
            postal_code: "",
        },
    );
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            navigate("/signup");
        }
    }, []);

    // input change
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleAddressEdit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");

            const res = await api.post(
                "/update-address/" + location.state.id,
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
                alert("Address Updated successfully!");
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
                    <SideBarMenu />
                    {/* RIGHT FORM */}
                    <div className="col-lg-8">
                        <div className="card shadow border-0 rounded-4">
                            <div className="card-header bg-white border-0 pt-4 px-4">
                                <h4 className="fw-bold">📍 Edit Address</h4>
                            </div>

                            <div className="card-body p-4">
                                <form onSubmit={handleAddressEdit}>
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control mb-3"
                                        placeholder="Full Name"
                                        value={form.name}
                                        onChange={handleChange}
                                        required
                                    />

                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control mb-3"
                                        placeholder="Email"
                                        value={form.email}
                                        onChange={handleChange}
                                        required
                                    />

                                    <input
                                        type="text"
                                        name="phone"
                                        className="form-control mb-3"
                                        placeholder="Phone"
                                        value={form.phone}
                                        onChange={handleChange}
                                        required
                                    />

                                    <textarea
                                        name="address"
                                        className="form-control mb-3"
                                        placeholder="Address"
                                        rows="3"
                                        value={form.address}
                                        onChange={handleChange}
                                        required
                                    />

                                    <div className="row">
                                        <div className="col-md-6">
                                            <input
                                                type="text"
                                                name="city"
                                                className="form-control mb-3"
                                                placeholder="City"
                                                value={form.city}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <div className="col-md-6">
                                            <input
                                                type="text"
                                                name="state"
                                                className="form-control mb-3"
                                                placeholder="State"
                                                value={form.state}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <input
                                        type="text"
                                        name="postal_code"
                                        className="form-control mb-3"
                                        placeholder="Pincode"
                                        value={form.postal_code}
                                        onChange={handleChange}
                                        required
                                    />

                                    <button className="btn btn-primary w-100 rounded-pill py-2">
                                        Update Address
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
