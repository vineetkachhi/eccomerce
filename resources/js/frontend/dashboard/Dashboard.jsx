import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

useEffect(() => {
  const token = localStorage.getItem("token");
    //console.log("work ");
  if (!token) {
    navigate('/signup');
  } else {
    const userData = localStorage.getItem("user");

    if (userData) {
      const user = JSON.parse(userData); // ✅ important

      setUser({
        name: user.name,
        email: user.email
      });
    }
  }
}, []);

  return (
    <section>
    <div className="container mt-4">
      {/* <h2>User Dashboard</h2> */}

      {user && (
        <div className="card p-3">
          <h4>Welcome, {user.name}</h4>
          <p>Email: {user.email}</p>
        </div>
      )}

      <div className="mt-4">
        <button onClick={() => navigate('/cart')} className="btn btn-primary">
          Go to Cart
        </button>

        <button style={{ marginTop:"10px" }} onClick={() => navigate('/user/orderlist')} className="btn btn-success ms-2">
          My Orders
        </button>

        <button style={{ marginTop:"10px" }}
          onClick={() => {
            localStorage.removeItem("token");
            navigate('/signup');
          }}
          className="btn btn-danger ms-2"
        >
          Logout
        </button>
      </div>
    </div>
    </section>
  );
}

