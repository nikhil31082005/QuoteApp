import React from 'react';
import QuoteList from './components/QuoteList';
import DailyQuote from './components/DailyQuote';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <div className="app-content">
        <header className="app-header">
          <h1 className="app-title">
            Wisdom Echo
          </h1>
          <p className="app-subtitle">
            Daily Inspiration & Curated Insites from History's Greatest Minds
          </p>
        </header>

        <main className="app-main">
          <DailyQuote />
          <QuoteList />
        </main>
      </div>
    </div>
  );
}

export default App;
