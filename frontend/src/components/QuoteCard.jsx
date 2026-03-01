import React from 'react';

const QuoteCard = ({ quote, author, categories }) => {
    // Parse categories safely whether it's a JSON string or an array
    let parsedCategories = [];
    try {
        parsedCategories = typeof categories === 'string' ? JSON.parse(categories) : categories;
    } catch (e) { /* ignore */ }

    return (
        <div className="relative group p-6 sm:p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-500 hover:bg-white/10 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/20 w-full mb-6 break-inside-avoid">
            {/* Decorative gradient blur in background */}
            <div className="absolute -inset-0.5 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-20 transition duration-500 blur"></div>

            <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                    {/* Quote mark icon */}
                    <svg className="w-8 h-8 text-indigo-400/50 mb-4" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                        <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H6.2C6.7 11.2 9.1 9 12 9V8zM26 8c-3.3 0-6 2.7-6 6v10h10V14h-7.8c.5-2.8 2.9-5 5.8-5V8z" />
                    </svg>

                    <p className="text-lg sm:text-xl font-medium text-slate-100 leading-relaxed tracking-wide font-serif italic mb-6">
                        "{quote}"
                    </p>
                </div>

                <div className="mt-auto">
                    <p className="text-indigo-400 font-semibold tracking-wider text-sm sm:text-base mb-3 flex items-center gap-2">
                        <span className="w-4 h-px bg-indigo-400/50"></span>
                        {author || "Unknown"}
                    </p>

                    {parsedCategories && parsedCategories.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {parsedCategories.map((cat, idx) => (
                                <span
                                    key={idx}
                                    className="px-3 py-1 text-xs font-medium rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"
                                >
                                    {cat}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QuoteCard;
