import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLogin } from '../store/authSlice';
import { AuthService } from '../services/authService';
import './AuthPages.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const data = await AuthService.login({ email, password });
            if (data.token) {
                dispatch(setLogin(data.token));
                navigate('/');
            } else {
                setError('Login failed: No token received');
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h2>Login</h2>
                {error && <div className="auth-error">{error}</div>}
                
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                
                <button type="submit" className="auth-button">Login</button>
                <div className="auth-links">
                    <Link to="/register">Don't have an account? Register here.</Link>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
