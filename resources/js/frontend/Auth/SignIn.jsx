// SignIn.jsx

import React, { useState } from "react";

import api from "../../services/api";
import { Link } from "react-router-dom";
import "../../static/login.css";
export default function SignIn() {
    const [form, setForm] = useState({
        email: "",
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
        api.post("/login", form)
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
      @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap");

      * {
  margin: 0;
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
}
:root {
  --colour-one: #5398c6;
  --colour-two: #ffffff;
  --colour-three: #223f77;
  --colour-four: #223f77;
  --colour-five: #ffffff;
  --colour-six: #223f77;
  --colour-seven: #a69f9c;
  --colour-eight: #707e8d;
  --colour-nine: #ffffff;
}

body {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--colour-one);
}
  `}
            </style>

            <div className="login_form">
                <div className="details">
                    <div className="welcome">
                        Apni Dukaan
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
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="wrap">
                            <label>Email</label>

                            <input
                                className="input"
                                type="email"
                                name="email"
                                placeholder="Enter Email"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="wrap">
                            <label>Password</label>

                            <input
                                type="password"
                                name="password"
                                placeholder="Enter Password"
                                value={form.password}
                                onChange={handleChange}
                                required
                                className="input"
                            />
                        </div>

                        <div className="wrap">
                            {/* <Link
              to="/forgot-password"
              title="Forgot Password"
              id="link-reset"
            >
              Forgot Password?
            </Link> */}
                        </div>

                        <button type="submit" className="button">
                            <h1 className="sign">Sign in!</h1>
                        </button>
                    </form>
                </div>

                <Link to="/">
                    <img
                        className="fox"
                        src="images/ApniDukan.png"
                        alt="logo"
                    />
                </Link>

                <div className="details-two">
                    <h1 className="back">Welcome back!</h1>

                    <p className="log">
                        Log in and use the opportunities offered by our portal.
                    </p>

                    <h2 className="acc">You don't have an account?</h2>

                    <button type="button" className="signup">
                        <h3>
                            <Link to="/signup">SignUp!</Link>
                        </h3>
                    </button>
                </div>
            </div>
        </>
    );
}
