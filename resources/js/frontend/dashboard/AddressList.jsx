import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import SideBarMenu from "./SideBarMenu";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
export default function AddressList() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [addresList, setAddressList] = useState([]);
    const token = localStorage.getItem("token");
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (!token) {
            navigate("/signup");
        } else {
            getAddressList();
        }
    }, []);
    const getAddressList = async () => {
        setLoading(true);
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
            setLoading(false);
        }
    };

    const handleAddressDelete = async (id) => {
        toast(
            ({ closeToast }) => (
                <div>
                    <p>Are you sure you want to delete this address?</p>

                    <div
                        style={{
                            display: "flex",
                            gap: "10px",
                            marginTop: "10px",
                        }}
                    >
                        <button
                            onClick={async () => {
                                try {
                                    await api.post(
                                        `/delete-address/${id}`,
                                        {},
                                        {
                                            headers: {
                                                Authorization: `Bearer ${token}`,
                                                Accept: "application/json",
                                            },
                                        },
                                    );

                                    toast.success(
                                        "Address deleted successfully!",
                                    );

                                    getAddressList();
                                } catch (error) {
                                    console.log(error);

                                    toast.error("Something went wrong!");
                                }

                                closeToast();
                            }}
                            style={{
                                background: "red",
                                color: "#fff",
                                border: "none",
                                padding: "6px 12px",
                                cursor: "pointer",
                                borderRadius: "5px",
                            }}
                        >
                            Yes
                        </button>

                        <button
                            onClick={closeToast}
                            style={{
                                background: "#ccc",
                                border: "none",
                                padding: "6px 12px",
                                cursor: "pointer",
                                borderRadius: "5px",
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ),
            {
                autoClose: false,
                closeOnClick: false,
            },
        );
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
                            <div className="card shadow border-0 rounded-4">
                                <div className="card-header bg-white border-0 pt-4 px-4 d-flex justify-content-between align-items-center">
                                    <h4 className="fw-bold mb-0">
                                        📍 My Address List
                                    </h4>

                                    <button
                                        onClick={() =>
                                            navigate("/user/address-add")
                                        }
                                        className="btn btn-sm btn-outline-success"
                                    >
                                        + Add New Address
                                    </button>
                                </div>

                                <div className="card-body p-4">
                                    {addresList && addresList.length > 0 ? (
                                        addresList.map((list) => (
                                            <div
                                                key={list.id}
                                                className="border rounded-3 p-3 mb-3 d-flex justify-content-between align-items-start"
                                            >
                                                <div>
                                                    <h6 className="fw-bold mb-1">
                                                        Home
                                                    </h6>
                                                    <p className="mb-1 text-muted">
                                                        {list.name},{" "}
                                                        {list.address},{" "}
                                                        {list.city},{" "}
                                                        {list.state} -{" "}
                                                        {list.postal_code}
                                                    </p>
                                                </div>

                                                <div className="btn-group">
                                                    <button
                                                        onClick={() =>
                                                            navigate(
                                                                "/user/address-edit",
                                                                {
                                                                    state: list,
                                                                },
                                                            )
                                                        }
                                                        className="btn btn-sm btn-outline-primary"
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            handleAddressDelete(
                                                                list.id,
                                                            )
                                                        }
                                                        className="btn btn-sm btn-outline-danger"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-4 text-muted">
                                            No address found
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
