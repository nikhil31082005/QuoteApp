const cron = require('node-cron');
const QuoteService = require('../services/quoteService');

const fetchDailyQuote = async () => {
    try {
        console.log('🔄 Running daily quote fetch job...');

        // First check if a quote was already fetched today
        const QuoteRepository = require('../repositories/quoteRepository');
        const hasQuoteToday = await QuoteRepository.hasDailyPickForToday();

        if (hasQuoteToday) {
            console.log('⏭️ Daily quote was already fetched today. Skipping.');
            return;
        }

        // Using an open random quote API (DummyJSON)
        const response = await fetch('https://dummyjson.com/quotes/random');

        if (!response.ok) {
            throw new Error(`API responded with status: ${response.statusText}`);
        }

        const data = await response.json();

        const quoteData = {
            quote_text: data.quote,
            author: data.author || 'Unknown',
            work: null,
            categories: ["Daily Pick"]
        };

        await QuoteService.createQuote(quoteData);
        console.log(`✅ Successfully saved daily quote to database: "${quoteData.quote_text}"`);
    } catch (error) {
        console.error('❌ Error executing daily quote job:', error.message);
    }
};

const initCronJobs = () => {
    // Schedule to run at 00:00 (midnight sharp) every day
    cron.schedule('0 0 * * *', fetchDailyQuote, {
        scheduled: true
    });

    console.log('📅 Daily Quote Cron Job initialized. Scheduled for 00:00 sharp daily.');

    // Also run immediately on server startup so we always have a quote
    console.log('🚀 Running initial fetch for Daily Quote...');
    fetchDailyQuote();
};

module.exports = { initCronJobs };
