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
    <section>
        <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "#2980b9" }}>
            <div className="container-fluid">
                <Link className="navbar-brand" href="/">
                    <img src="images/ApniDukan.png" alt="logo" width="45" height="35" className="d-inline-block align-text-top mr-2 navbar-logo" />
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 text-capitalize">
                        <ul className="navbar-nav mr-auto mb-2 mb-lg-0 text-capitalize">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            {/* <li className="nav-item text-capitalize">
                                <a className="nav-link" href="./offers.html">Offers</a>
                            </li>
                            <li className="nav-item text-capitalize">
                                <a className="nav-link" href="./contactus.html">Contact us</a>
                            </li> */}
                            
                                {/* <li className="nav-item text-capitalize">
                                    <a className="nav-link" href="./about.html">About us</a>
                                </li> */}
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Category
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><Link className="dropdown-item" to={`/product-list/all`}> All</Link></li>
                                    {category.map((cat) => (
                                        <li key={cat.id}><Link className="dropdown-item" to={`/product-list/${cat.slug}`}>{cat.name}</Link></li>
                                    ))}
                                    
                                    {/* <li><a className="dropdown-item" href="./login.html">Login/Signup</a></li> */}
                                </ul>
                            </li>
                            <li className="nav-item text-capitalize">
                                <Link className="nav-link" to="cart">🛒 Cart ({cartCount})</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {token ?  user?.name:'SignIn/Signup'}
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    {token ? (
                                        <>
                                        <li>
                                            <Link className="dropdown-item" to="/user/dashboard">
                                                Dashboard
                                            </Link>
                                        </li>

                                        <li>
                                            <button
                                                className="dropdown-item"
                                                onClick={handleLogout}
                                            >
                                                Logout
                                            </button>
                                        </li> 
                                        </>       
                                        ):(
                                            <>
                                        <li className="dropdown-item">
                                            <Link className="nav-link" to="/signin">SignIn</Link>
                                        </li>   
                                        <li className="dropdown-item">
                                            <Link className="nav-link" to="/signup">SignUp</Link>
                                        </li> 
                                        </>  
                                    )}
                                 </ul>
                            </li>   
                        </ul>
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-dark" type="submit">Search</button>
                        </form>
                        </ul>
                </div>
            </div>
        </nav>
    </section>

</>
      );
    
    }