import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { QuoteService } from '../services/api';
import './QuoteCard.css'

const TAG_COLORS = [
    'linear-gradient(135deg, #a855f7, #6366f1)', // Purple to Indigo
    'linear-gradient(135deg, #ec4899, #f43f5e)', // Pink to Rose
    'linear-gradient(135deg, #10b981, #3b82f6)', // Emerald to Blue
    'linear-gradient(135deg, #f59e0b, #ef4444)', // Amber to Red
    'linear-gradient(135deg, #06b6d4, #2563eb)'  // Cyan to Blue
];

const QuoteCard = ({ quote, author, categories, index = 0, id, likeCount: initialLikes = 0, dislikeCount: initialDislikes = 0 }) => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const [currentReaction, setCurrentReaction] = useState(null);
    const [likes, setLikes] = useState(initialLikes);
    const [dislikes, setDislikes] = useState(initialDislikes);

    // Parse categories safely whether it's a JSON string or an array
    let parsedCategories = [];
    try {
        parsedCategories = typeof categories === 'string' ? JSON.parse(categories) : categories;
    } catch (e) { /* ignore */ }

    // Choose a color based on the index to have a consistent alternating pattern
    const tagBg = TAG_COLORS[index % TAG_COLORS.length];

    const handleReaction = useCallback(async (reactionType) => {
        if (!isAuthenticated) {
            alert("Please login to react to quotes!");
            return;
        }
        if (!id) return;

        setCurrentReaction(reactionType);

        // Execute the backend request and sync counts from server response
        const response = await QuoteService.createReaction(id, reactionType);
        if (response.success && response.data) {
            setLikes(response.data.likeCount);
            setDislikes(response.data.dislikeCount);
        }
    }, [isAuthenticated, id]);

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

                    <div className="quote-actions">
                        <button
                            className={`action-btn ${currentReaction === 'like' ? 'active-like' : ''}`}
                            onClick={() => handleReaction('like')}
                            title="Like Quote"
                        >
                            ❤️ <span className="reaction-count">{likes}</span>
                        </button>
                        <button
                            className={`action-btn ${currentReaction === 'dislike' ? 'active-dislike' : ''}`}
                            onClick={() => handleReaction('dislike')}
                            title="Dislike Quote"
                        >
                            👎 <span className="reaction-count">{dislikes}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuoteCard;
