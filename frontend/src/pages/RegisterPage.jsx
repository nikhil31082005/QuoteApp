import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLogin } from '../store/authSlice';
import { AuthService } from '../services/authService';
import './AuthPages.css';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const data = await AuthService.register({ username, email, password });
            if (data.success || data) { // Some APIs return just true/object, but backend returns { success: true }
                dispatch(setLogin());
                navigate('/');
            } else {
                setError('Registration failed');
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h2>Register</h2>
                {error && <div className="auth-error">{error}</div>}

                <div className="form-group">
                    <label>Username</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>

                <button type="submit" className="auth-button">Register</button>
                <div className="auth-links">
                    <Link to="/login">Already have an account? <div style={{ color: 'white' }}> Login </div> here.</Link>
                </div>
            </form>
        </div>
    );
};

export default RegisterPage;
