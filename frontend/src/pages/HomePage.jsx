import React from 'react';
import QuoteList from '../components/QuoteList';
import DailyQuote from '../components/DailyQuote';

const HomePage = () => {
    return (
        <div className="app-content page-enter-active">
            <div className="hero-section" style={{ textAlign: 'center', margin: '2rem 0 4rem', animation: 'fadeIn 0.8s ease-out' }}>
                <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 800, background: 'linear-gradient(135deg, #fff, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1rem', letterSpacing: '-1px' }}>
                    Discover Daily Inspiration
                </h1>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 'clamp(1.1rem, 3vw, 1.3rem)', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
                    Curated insights from history's greatest minds to elevate your thinking and transform your day.
                </p>
            </div>

            <main className="app-main">
                <DailyQuote />
                <QuoteList />
            </main>
        </div>
    );
};

export default HomePage;
