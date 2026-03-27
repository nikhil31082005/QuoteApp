import React from 'react';
import './QuoteCard.css'

const TAG_COLORS = [
    'linear-gradient(135deg, #a855f7, #6366f1)', // Purple to Indigo
    'linear-gradient(135deg, #ec4899, #f43f5e)', // Pink to Rose
    'linear-gradient(135deg, #10b981, #3b82f6)', // Emerald to Blue
    'linear-gradient(135deg, #f59e0b, #ef4444)', // Amber to Red
    'linear-gradient(135deg, #06b6d4, #2563eb)'  // Cyan to Blue
];

const QuoteCard = ({ quote, author, categories, index = 0 }) => {
    // Parse categories safely whether it's a JSON string or an array
    let parsedCategories = [];
    try {
        parsedCategories = typeof categories === 'string' ? JSON.parse(categories) : categories;
    } catch (e) { /* ignore */ }

    // Choose a color based on the index to have a consistent alternating pattern
    const tagBg = TAG_COLORS[index % TAG_COLORS.length];

    return (
        <div className="quote-card">
            <div className="quote-card-content">
                <div className="quote-card-top">
                    <p className="quote-text">
                        {quote}
                    </p>
                    {author && (
                        <p className="quote-author">
                            — {author}
                        </p>
                    )}
                </div>

                <div className="quote-card-bottom">
                    <div className="quote-categories">
                        {parsedCategories && parsedCategories.slice(0, 2).map((cat, idx) => (
                            <span key={idx} className="quote-category-tag" style={{ background: tagBg, color: 'white', border: 'none' }}>
                                {cat}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuoteCard;
