import api from '../services/api';
import React, { useEffect, useState,useContext  } from 'react';
import { Link } from 'react-router-dom';
import Dashboard from '../frontend/dashboard/Dashboard';
import { CartContext } from '../services/CartContext';
export default function Header() {
  const [category, setCategory] = useState([]);
  const { cartCount } = useContext(CartContext);
const [user, setUser] = useState(null);
const [token,setToken] = useState();
  useEffect(() => {
    fetchCategory();
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    setToken(token);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

  }, []);

  const fetchCategory = async () => {
    try {
      const res = await api.get('/categories');
      setCategory(res.data.categories);
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogout = async () => {
    try {
        await api.post('/logout_data', {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
    } catch (error) {
        console.error(error);
    } finally {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
         window.location.href = '/';
    }
};

    return (
        <>
  {/* Navbar */}
  <header className="container-fluid bg-dark text-white py-2">
    <div className="row align-items-center">

      {/* Logo */}
      <div className="col-md-2">
        <h4 className="mb-0">
          <Link to="/" className="text-white text-decoration-none">
            Fashion
          </Link>
        </h4>
      </div>

      {/* Search */}
      <div className="col-md-3">
        <input
          type="text"
          placeholder="Search for Products, Brands and More"
          className="form-control"
        />
      </div>

      {/* Right side */}
      <div className="col-md-6 d-flex justify-content-end align-items-center gap-1">
<Link to="/cart" className="text-white text-decoration-none">
          🛒 Cart ({cartCount})
        </Link>
        {token ? (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
  <span>
    <Link to="/user/dashboard" style={{ color: "#fff",display:"inline" }}>
      {user?.name}
    </Link>
  </span>

  <button onClick={handleLogout}>Logout</button>
</div>
          </>
        ) : (
          <Link to="/signup" className="btn btn-sm btn-light">
            Login
          </Link>
        )}

        

        {/* <span className="text-warning">Become Seller</span> */}
      </div>

    </div>
  </header>

  {/* Categories */}
  <section className="bg-light py-2 border-bottom">
    <div className="container d-flex gap-4 overflow-auto">

      <div  className="fw-medium text-nowrap" style={{ paddingLeft:"30px",paddingRight:"30px" }}>
         <Link to={`/product-list/all`}> All</Link>
        </div>
      {category.map((cat) => (
        <div key={cat.id} className="fw-medium text-nowrap" style={{ paddingLeft:"30px",paddingRight:"30px" }}>
         <Link to={`/product-list/${cat.slug}`}> {cat.name}</Link>
        </div>
      ))}
    </div>
  </section>
</>
      );
    
    }