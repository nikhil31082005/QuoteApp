import React, { useState, useEffect } from 'react';
import QuoteCard from './QuoteCard';
import { QuoteService } from '../services/api';
import './QuoteList.css'

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

    // Handles scrolling the categories horizontally with the mouse wheel
    const handleCategoryScroll = (e) => {
        const container = e.currentTarget;
        container.scrollLeft += e.deltaY;
    };

    return (
        <div className='quote-container'>
            <div className='categories-list' onWheel={handleCategoryScroll}>
                {CATEGORIES.map(cat => (
                    <button
                        key={cat}
                        onClick={() => handleCategorySelect(cat)}
                        className={activeCategory === cat ? "category-active" : 'category'}
                    >
                        {cat}
                    </button>
                ))}
            </div>
            <div className='explore-quotes'>
                EXPLORE MORE QUOTES
            </div>
            <div className='cards-container'>
                {quotes.map((q, idx) => (
                    <QuoteCard
                        key={q.id || Math.random().toString()}
                        index={idx}
                        quote={q.quote_text}
                        author={q.author}
                        categories={q.categories}
                    />
                ))}
            </div>

            {loading && quotes.length === 0 && (
                <div className='loading-container'>
                    <p>Loading...</p>
                </div>
            )}

            {hasMore && quotes.length > 0 && !loading && (
                <div className='load-more-container'>
                    <button
                        onClick={loadMore}
                        disabled={loading}
                        className='load-more-btn'
                    >
                        Load More Quotes
                    </button>
                </div>
            )}

            {!hasMore && quotes.length > 0 && (
                <div className='end-of-collection'>
                    You've reached the end of the collection for this category.
                </div>
            )}

            {!loading && quotes.length === 0 && (
                <div className='no-quotes-container'>
                    <h3 className='no-quotes-title'>No quotes found</h3>
                    <p className='no-quotes-subtitle'>Try selecting a different category.</p>
                </div>
            )}
        </div>
    );
};

export default QuoteList;
