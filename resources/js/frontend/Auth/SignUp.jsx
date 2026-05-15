// SignUp.jsx

import React, { useState } from "react";

import api from "../../services/api";
import { Link } from "react-router-dom";
import "../../static/signup.css";
export default function SignUp() {
    const [form, setForm] = useState({
        email: "",
        name: "",
        password: "",
    });
    const [error, setError] = useState("");
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        api.post("/signup", form)
            .then(async (res) => {
                console.log(res.data);
                setError("");
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data.user));
                await mergeGuestCart();
                window.location.href = "/";
                // Handle successful login (e.g., store token, redirect)
            })
            .catch((err) => {
                console.error(err);
                if (err.response && err.response.data.message) {
                    setError(err.response.data.message);
                } else {
                    setError("Something went wrong");
                }
            });
    };

    const mergeGuestCart = async () => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        if (cart.length === 0) return;

        try {
            await api.post(
                "/merge-cart",
                { items: cart },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                },
            );

            localStorage.removeItem("cart");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <style>
                {`
        body {
          height: 100%;
          margin: 0;
          padding: 0;
        }
                    section {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(-30deg,
            #03a9f4 0%,
            #3a78b7 50%,
            #262626 50%,
            #607d8b 100%);
    filter: hue-rotate(120deg);
    animation: animate 10s linear infinite;
}
      `}
            </style>

            <section>
                <div className="box">
                    <div className="form">
                        <div className="form_logo">
                            <Link to="/">
                                <img src="images/ApniDukan.png" alt="Logo" />
                            </Link>
                        </div>

                        <h2>SignUp</h2>
                        {error && (
                            <p
                                style={{
                                    color: "red",
                                    textAlign: "center",
                                    marginBottom: "10px",
                                }}
                            >
                                {error}
                            </p>
                        )}
                        <form onSubmit={handleSubmit}>
                            <div className="inputBox">
                                <input
                                    type="text"
                                    placeholder="Username"
                                    value={form.name}
                                    name="name"
                                    onChange={handleChange}
                                />
                                <img src="images/user.png" alt="user" />
                            </div>

                            <div className="inputBox">
                                <input
                                    type="email"
                                    placeholder="Email Id"
                                    value={form.email}
                                    name="email"
                                    onChange={handleChange}
                                />
                                <img src="images/user.png" alt="email" />
                            </div>

                            <div className="inputBox">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={form.password}
                                    name="password"
                                    onChange={handleChange}
                                />

                                <img src="images/lock.png" alt="lock" />

                                <span className="show-hide">
                                    {/* <i
                  className="fas fa-eye"
                  id="eye"
                  
                ></i> */}
                                </span>
                            </div>

                            {/* <label className="remember">
              <input type="checkbox" />
              Remember Me
            </label> */}

                            <div className="inputBox">
                                <input
                                    className="btn"
                                    type="submit"
                                    value="SignUp"
                                />
                            </div>
                        </form>

                        <p>
                            Have an <Link to="/signin">Account</Link>?
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}
