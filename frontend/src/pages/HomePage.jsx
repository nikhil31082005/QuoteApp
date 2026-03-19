import React from 'react';
import { useDispatch } from 'react-redux';
import { setLogout } from '../store/authSlice';
import QuoteList from '../components/QuoteList';
import DailyQuote from '../components/DailyQuote';

const HomePage = () => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(setLogout());
    };

    return (
        <div className="app-container">
            <div className="app-content">
                <header className="app-header">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h1 className="app-title">Wisdom Echo</h1>
                            <p className="app-subtitle">Daily Inspiration & Curated Insights from History's Greatest Minds</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            style={{
                                padding: '0.5rem 1rem',
                                background: 'white',
                                border: '1px solid currentColor',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                color: 'inherit',
                                fontSize: '0.9rem'
                            }}
                        >
                            Logout
                        </button>
                    </div>
                </header>

                <main className="app-main">
                    <DailyQuote />
                    <QuoteList />
                </main>
            </div>
        </div>
    );
};

export default HomePage;
