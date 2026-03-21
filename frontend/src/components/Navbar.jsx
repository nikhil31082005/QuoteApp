import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLogout } from '../store/authSlice';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);

    const handleLogout = () => {
        dispatch(setLogout());
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    Quotopia
                </Link>
                <div className="navbar-menu">
                    {token && (
                        <button onClick={handleLogout} className="navbar-logout">
                            Logout
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
