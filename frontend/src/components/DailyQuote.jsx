import React, { useState, useEffect } from 'react';
import { QuoteService } from '../services/api';
import './DailyQuote.css';

const DailyQuote = () => {
    const [quote, setQuote] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDaily = async () => {
            const daily = await QuoteService.getDailyQuote();
            console.log("daily", daily);

            setQuote(daily);
            setLoading(false);
        };
        fetchDaily();
    }, []);

    if (loading) {
        return (
            <div className="w-full max-w-4xl mx-auto px-4 mb-16">
                <div className="h-64 rounded-3xl bg-white/5 border border-white/10 animate-shimmer"></div>
            </div>
        );
    }

    if (!quote) return null;

    return (
        <div className="daily-quote-container">
            <h3 className="daily-quote-title">DAILY QUOTE</h3>
            <h4 className="daily-quote-text">"{quote.quote_text}"</h4>
            <p className="daily-quote-author">—— {quote.author}</p>
        </div>
    );
};

export default DailyQuote;
