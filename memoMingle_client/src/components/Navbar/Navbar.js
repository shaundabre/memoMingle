import React, { useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
  let navigate = useNavigate();
  const handleLogout =()=>{
    localStorage.removeItem('token');
    navigate('/login');
  }
  let location = useLocation();

  useEffect(()=>{
    console.log(location.pathname);
  }, [location]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">memoMingle</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className={`nav-item ${location.pathname === '/' ? 'active':"" }`}>
            <Link className="nav-link" to="/">Home <span className="sr-only"></span></Link>
          </li>
          <li className={`nav-item ${location.pathname === '/about' ? 'active':"" }`}>
            <Link className="nav-link" to="/about">About</Link>
          </li>
        </ul>
        <div className="ml-auto d-flex">
          {!localStorage.getItem('token') ? (
            <>
              <Link className="btn btn-dark mx-2" to="/login" role="button">Login</Link>
              <Link className="btn btn-dark mx-2" to="/signup" role="button">Signup</Link>
            </>
          ) : (
            <button onClick={handleLogout} className="btn btn-dark mx-2">Logout</button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
