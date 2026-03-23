import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLogout } from '../store/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { QuoteService } from '../services/api';
import './Navbar.css';

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector((state) => state.auth.token);

    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const searchRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Debounce search
    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (inputValue.trim()) {
                const authors = await QuoteService.searchAuthors(inputValue.trim());
                setSuggestions(authors);
                setShowSuggestions(true);
            } else {
                setSuggestions([]);
                setShowSuggestions(false);
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [inputValue]);

    const handleLogout = () => {
        dispatch(setLogout());
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            setShowSuggestions(false);
            if (inputValue.trim()) {
                navigate(`/?author=${encodeURIComponent(inputValue.trim())}`);
            } else {
                navigate(`/`);
            }
        }
    };

    const handleSuggestionClick = (author) => {
        setInputValue(author);
        setShowSuggestions(false);
        navigate(`/?author=${encodeURIComponent(author)}`);
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    Quotopia
                </Link>
                <div className="navbar-search" ref={searchRef}>
                    <input 
                        type="text" 
                        placeholder="Search by author..."
                        name="authorname" 
                        id="authorname" 
                        value={inputValue}
                        onChange={(e) => {
                            setInputValue(e.target.value);
                            setShowSuggestions(true);
                        }}
                        onFocus={() => {
                            if (suggestions.length > 0) setShowSuggestions(true);
                        }}
                        onKeyDown={handleKeyDown} 
                        className="author-search-input"
                        autoComplete="off"
                    />
                    {showSuggestions && suggestions.length > 0 && (
                        <div className="suggestions-dropdown">
                            {suggestions.map((author, index) => (
                                <div 
                                    key={index} 
                                    className="suggestion-item"
                                    onClick={() => handleSuggestionClick(author)}
                                >
                                    {author}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
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
