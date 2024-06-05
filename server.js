// Import necessary modules
const express = require('express'); // For routing and middleware
const path = require('path'); // For handling file paths
const scrapeAmazon = require('./scrape'); // Custom module for scraping Amazon

// Create an instance of an Express application
const app = express();
const port = 3000;

// Serve static files (HTML, CSS, JS) from the public directory
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Route handler for GET requests to '/api/scrape'.
 * Initiates scraping of Amazon products based on provided keyword.
 */
app.get('/api/scrape', async (req, res) => {
    // Extract the query parameter from the request
    const keyword = req.query.keyword;

    // Input validation: Check if the keyword is provided
    if (!keyword) {
        return res.status(400).send({ error: 'Keyword is required' });
    }

    try {
        // Call the 'scrapeAmazon' function to fetch product data
        const products = await scrapeAmazon(keyword);
        // Send the scraped product data as a JSON response
        res.json(products);
    } catch (error) {
        // Handle potential errors during scraping
        console.error('Scraping error:', error);
        res.status(500).send({ error: 'An error occurred while scraping.' });
    }
});

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});