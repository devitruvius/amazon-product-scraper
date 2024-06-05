// Import necessary modules
const express = require('express'); // Express.js framework for routing and middleware
const path = require('path'); // Node.js module for handling file paths
const scrapeAmazon = require('./scrape'); // Custom module for scraping Amazon

// Create an instance of an Express application
const app = express();
// Define the port number for the server to listen on
const port = 3000;

// Serve static files (HTML, CSS, JS) from the public directory
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Route handler for GET requests to '/api/scrape'.
 * This endpoint initiates scraping of Amazon products based on a provided keyword.
 */
app.get('/api/scrape', async (req, res) => {
    // Extract the 'keyword' query parameter from the request
    const keyword = req.query.keyword;

    // Input validation: Check if the keyword is provided
    if (!keyword) {
        // If keyword is missing, return a 400 Bad Request with an error message
        return res.status(400).send({ error: 'Keyword is required' });
    }

    try {
        // Call the 'scrapeAmazon' function (presumably asynchronous) to fetch product data
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