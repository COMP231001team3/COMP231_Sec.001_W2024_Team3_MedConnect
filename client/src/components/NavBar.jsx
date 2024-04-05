import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './NavBar.css';
import logo from './logo.png'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../Contexts/authContext'


{/*the navagation bar of the application*/}

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, logout } = useAuth();
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        {/*<a className="navbar-brand" href="#">
          <img src={logo} alt="Logo" width="180" height="155" className="navImg" />
        </a>*/}
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="Logo" width="180" height="155" className="navImg" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              {/*<a className="nav-link" href="http://localhost:3000/">Home</a>*/}
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#features">Features</a>
              {/*<Link className="nav-link" to="/features">Features</Link>*/}
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#blog">Blog</a>
              {/*<Link className="nav-link" to="/blog">Blog</Link>*/}
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#about">About</a>
              {/*<Link className="nav-link" to="/about">About</Link>*/}
            </li>
            {currentUser ? (
              <React.Fragment>
                {currentUser.role === 'patient' ? (
                  <li className="nav-item">
                    <Link className="nav-link" to="/patientProfile">My Profile</Link>
                  </li>
                ) : (
                  <li className="nav-item">
                    <Link className="nav-link" to="/doctorProfile">My Profile</Link>
                  </li>
                )}
                <li className="nav-item">
                  <Link className="nav-link" to="/logout">Logout</Link>
                </li>
              </React.Fragment>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/sign-in">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
