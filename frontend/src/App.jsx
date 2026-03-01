import React from 'react';
import QuoteList from './components/QuoteList';
import DailyQuote from './components/DailyQuote';

function App() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-950">

      {/* Abstract Background Elements */}
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-indigo-500/10 to-transparent pointer-events-none"></div>
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob pointer-events-none"></div>
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-indigo-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000 pointer-events-none"></div>

      {/* Main Content */}
      <div className="relative z-10">
        <header className="pt-20 pb-12 px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500 mb-4 select-none drop-shadow-sm">
            Timeless Quotes
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg pt-2 leading-relaxed font-light">
            Discover thousands of inspiring quotes carefully curated to provide wisdom, humor, and motivation.
          </p>
        </header>

        <main>
          <DailyQuote />
          <QuoteList />
        </main>
      </div>
    </div>
  );
}

export default App;
