// Login.jsx

import React, { useState } from 'react';

import api from '../../services/api';

export default function Login() {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post('/login', form)
      .then(async res => {
        console.log(res.data);
         localStorage.setItem('token', res.data.token);
         localStorage.setItem('user', JSON.stringify(res.data.user));
         await mergeGuestCart();
            window.location.href = '/';
        // Handle successful login (e.g., store token, redirect)
      })
      .catch(err => {
        console.error(err);
        // Handle login error (e.g., show error message)
      });
  };

  const mergeGuestCart = async () => {

   const cart = JSON.parse(localStorage.getItem('cart')) || [];

   if (cart.length === 0) return;

   try {
      await api.post('/merge-cart',
         { items: cart },
         {
            headers:{
              Authorization:`Bearer ${localStorage.getItem('token')}`
            }
         }
      );

      localStorage.removeItem('cart');

   } catch(error){
      console.log(error);
   }
};

  return (
    <div className="login-page">
      <div className="login-box">

        <h2>Login</h2>
        <p>Welcome Back</p>

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Login</button>

        </form>

        <div className="extra-links">
          <a href="#">Forgot Password?</a>
          <a href="#">Create Account</a>
        </div>

      </div>
    </div>
  );
}