import React from 'react';
import './QuoteCard.css'

const BGS = [
    '#251515', // Dark red
    '#252210', // Dark yellow
    '#111c25', // Dark blue
    '#1c1626', // Dark purple
    '#10211b', // Dark green
];

const QuoteCard = ({ quote, author, categories, index = 0 }) => {
    // Parse categories safely whether it's a JSON string or an array
    let parsedCategories = [];
    try {
        parsedCategories = typeof categories === 'string' ? JSON.parse(categories) : categories;
    } catch (e) { /* ignore */ }

    // Fallback category if none is parsed effectively
    const firstCategory = parsedCategories && parsedCategories.length > 0 ? parsedCategories[0] : "GENERAL";

    // Choose a color based on the index to have a consistent alternating pattern
    const bgColor = BGS[index % BGS.length];

    return (
        <div className="quote-card" style={{ backgroundColor: bgColor }}>
            <div className="quote-card-content">
                <div className="quote-card-top">
                    <p className="quote-card-category-title">{firstCategory}</p>
                    <p className="quote-text">
                        {quote}
                    </p>
                </div>

                <div className="quote-card-bottom">
                    <div className="quote-categories">
                        {parsedCategories && parsedCategories.slice(0, 2).map((cat, idx) => (
                            <span key={idx} className="quote-category-tag">
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
