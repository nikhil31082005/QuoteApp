import React, { useState, useEffect } from 'react';
import QuoteCard from './QuoteCard';
import { QuoteService } from '../services/api';

const CATEGORIES = [
    "All", "Motivation", "Nikhil", "Inspirational", "Life", "Wisdom", "Love",
    "Humor", "Success", "Education", "Philosophy", "Art", "Science",
    "Friendship", "Happiness", "History"
];

const QuoteList = () => {
    const [quotes, setQuotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [activeCategory, setActiveCategory] = useState("All");

    const fetchQuotes = async (pageNum, currentCategory = activeCategory) => {
        setLoading(true);
        // Only pass category to API if it's not "All"
        const categoryParam = currentCategory === "All" ? null : currentCategory;
        const newQuotes = await QuoteService.getQuotes(pageNum, 20, categoryParam);

        if (newQuotes && newQuotes.length > 0) {
            if (pageNum === 1) {
                setQuotes(newQuotes);
            } else {
                setQuotes(prev => [...prev, ...newQuotes]);
            }
            setHasMore(newQuotes.length === 20); // standard limit check
        } else {
            if (pageNum === 1) setQuotes([]); // clear if no results on first page
            setHasMore(false);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchQuotes(1, activeCategory);
    }, [activeCategory]);

    const loadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchQuotes(nextPage);
    };

    const handleCategorySelect = (category) => {
        if (category === activeCategory) return;
        setActiveCategory(category);
        setPage(1);
        setQuotes([]);
        setHasMore(true);
    };

    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-8">

            {/* Category Filter Menu */}
            <div className="flex overflow-x-auto pb-4 mb-8 gap-3 scrollbar-hide shrink-0 snap-x">
                {CATEGORIES.map(cat => (
                    <button
                        key={cat}
                        onClick={() => handleCategorySelect(cat)}
                        className={`snap-center shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === cat
                            ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30 -translate-y-0.5'
                            : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/5'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Masonry-like CSS columns layout */}
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                {quotes.map((q) => (
                    <QuoteCard
                        key={q.id || Math.random().toString()}
                        quote={q.quote_text}
                        author={q.author}
                        categories={q.categories}
                    />
                ))}
            </div>

            {loading && quotes.length === 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="h-48 rounded-2xl bg-white/5 border border-white/10 animate-shimmer"></div>
                    ))}
                </div>
            )}

            {hasMore && quotes.length > 0 && !loading && (
                <div className="mt-12 text-center pb-24">
                    <button
                        onClick={loadMore}
                        disabled={loading}
                        className="px-8 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium tracking-wide shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Load More Quotes
                    </button>
                </div>
            )}

            {!hasMore && quotes.length > 0 && (
                <div className="mt-12 text-center text-slate-400 pb-24 italic">
                    You've reached the end of the collection for this category.
                </div>
            )}

            {!loading && quotes.length === 0 && (
                <div className="text-center py-20">
                    <h3 className="text-2xl text-slate-300 font-medium">No quotes found</h3>
                    <p className="text-slate-500 mt-2">Try selecting a different category.</p>
                </div>
            )}
        </div>
    );
};

export default QuoteList;
