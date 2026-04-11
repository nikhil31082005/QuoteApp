import React, { useCallback, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { QuoteService } from '../services/api';
import html2canvas from 'html2canvas';
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
    const [isSharing, setIsSharing] = useState(false);
    const cardRef = useRef(null);
    const exportRef = useRef(null);

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

    const handleShare = async () => {
        if (!exportRef.current) return;
        try {
            setIsSharing(true);
            const canvas = await html2canvas(exportRef.current, {
                useCORS: true,
                backgroundColor: null, // Transparent to keep border-radius and padding intact around our frame
                scale: 2 // High Resolution export
            });
            
            canvas.toBlob(async (blob) => {
                if (!blob) return;
                const file = new File([blob], 'quote.png', { type: 'image/png' });
                
                // Try Native Share API First (ideal for mobile, Safari, modern Edge/Windows)
                if (navigator.canShare && navigator.canShare({ files: [file] })) {
                    try {
                        await navigator.share({
                            title: 'Quotopia',
                            text: `"${quote}" - ${author}`,
                            files: [file]
                        });
                    } catch (error) {
                        console.log('Error sharing or user cancelled', error);
                    }
                } else {
                    // Fallback to Download for unsupported browsers (many desktop browsers)
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.download = `quote-${author.replace(/\s+/g, '-').toLowerCase()}.png`;
                    link.href = url;
                    link.click();
                    URL.revokeObjectURL(url);
                }
            }, 'image/png');
        } catch (error) {
            console.error('Failed to generate image', error);
            alert('Failed to share quote.');
        } finally {
            setIsSharing(false);
        }
    };

    return (
        <>
        <div className="quote-card" ref={cardRef}>
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
                        <button
                            className="action-btn share-btn"
                            onClick={handleShare}
                            disabled={isSharing}
                            title="Share Quote"
                            style={{ opacity: isSharing ? 0.5 : 1 }}
                        >
                            {isSharing ? '⏳' : '📤'} <span className="reaction-count">Share</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        {/* Hidden Export View for Premium Sharing */}
        <div style={{ position: 'absolute', left: '-9999px', top: 0 }}>
            <div 
                ref={exportRef}
                style={{
                    width: '900px',
                    padding: '4rem',
                    background: tagBg, // Use the current theme gradient
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <div 
                    style={{
                        width: '100%',
                        background: '#0f172a', // Dark, sleek slate color
                        borderRadius: '16px',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)',
                        overflow: 'hidden',
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}
                >
                    {/* macOS Style Window Controls */}
                    <div style={{ display: 'flex', gap: '8px', padding: '1.2rem 1.5rem', background: 'rgba(255, 255, 255, 0.03)', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                        <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#ff5f56' }}></div>
                        <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#ffbd2e' }}></div>
                        <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#27c93f' }}></div>
                    </div>
                    {/* Quote Content */}
                    <div style={{ padding: '3.5rem 4rem' }}>
                         <p style={{ fontFamily: '"Outfit", sans-serif', fontSize: '2.4rem', lineHeight: 1.6, color: '#f8fafc', marginBottom: '2.5rem', fontWeight: 500 }}>
                             "{quote}"
                         </p>
                         {author && (
                             <p style={{ fontFamily: '"Inter", sans-serif', fontSize: '1.4rem', color: 'rgba(255, 255, 255, 0.7)', fontStyle: 'italic', textAlign: 'right' }}>
                                 — {author}
                             </p>
                         )}
                         <div style={{ marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <div style={{ display: 'flex', gap: '0.8rem' }}>
                                   {parsedCategories && parsedCategories.slice(0, 3).map((cat, idx) => (
                                       <span key={idx} style={{ background: 'rgba(255, 255, 255, 0.1)', color: 'rgba(255, 255, 255, 0.9)', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '1rem', fontWeight: 500, fontFamily: '"Inter", sans-serif' }}>
                                           {cat}
                                       </span>
                                   ))}
                              </div>
                              <div style={{ color: 'rgba(255, 255, 255, 0.4)', fontFamily: '"Inter", sans-serif', fontSize: '1rem', fontWeight: 600, letterSpacing: '1px' }}>
                                  QUOTOPIA
                              </div>
                         </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default QuoteCard;
