import React, { useState, useEffect } from 'react';
import { QuoteService } from '../services/api';

const DailyQuote = () => {
    const [quote, setQuote] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDaily = async () => {
            const daily = await QuoteService.getDailyQuote();
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
        <div className="w-full max-w-4xl mx-auto px-4 mb-16 relative z-10 transition-all duration-500 hover:-translate-y-1">
            <div className="relative p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-indigo-500/20 to-purple-600/20 border border-white/10 backdrop-blur-md shadow-lg hover:shadow-indigo-500/20 overflow-hidden group">
                {/* Decorative blob */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/30 rounded-full mix-blend-screen filter blur-3xl opacity-50 group-hover:opacity-75 transition-opacity duration-700"></div>
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500/30 rounded-full mix-blend-screen filter blur-3xl opacity-50 group-hover:opacity-75 transition-opacity duration-700"></div>

                <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 mb-6 backdrop-blur-md shadow-sm">
                        <span className="text-xl">✨</span>
                        <span className="text-sm font-semibold tracking-wider text-indigo-200 uppercase">Quote of the Day</span>
                    </div>

                    <p className="text-2xl sm:text-3xl md:text-4xl font-serif text-white mb-8 leading-snug font-medium italic">
                        "{quote.quote_text}"
                    </p>

                    <div className="flex items-center space-x-4">
                        <div className="h-px w-12 bg-indigo-400/50"></div>
                        <span className="text-lg font-medium text-indigo-300">
                            {quote.author || 'Unknown'}
                        </span>
                        <div className="h-px w-12 bg-indigo-400/50"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DailyQuote;
