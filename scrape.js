// Import the axios and JSDOM library for making HTTP requests and parsing HTML content
const axios = require('axios');
const { JSDOM } = require('jsdom');

/**
 * Scrapes product data from Amazon search results for a given keyword.
 *
 * @param {string} keyword - The search keyword to use on Amazon.
 * @returns {Promise<Array>} A promise that resolves to an array of product objects.
 */
const scrapeAmazon = async (keyword) => {
  try {
    // Construct the Amazon search URL with the encoded keyword
    const url = `https://www.amazon.com/s?k=${encodeURIComponent(keyword)}`;

    // Make a GET request to the Amazon search URL
    // Set a User-Agent header to mimic a browser request
    const { data: html } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
    });

    // Parse the HTML response using JSDOM
    const dom = new JSDOM(html);
    const document = dom.window.document;

    // Initialize an empty array to store product data
    const products = [];

    // Iterate over each product item in the search results
    document.querySelectorAll('.s-main-slot .s-result-item').forEach(item => {
      // Extract the product title, rating, number of reviews and the product image URL, while handling cases where data might be missing
      const title = item.querySelector('h2 a span')?.textContent || 'No title';
      const rating = item.querySelector('.a-icon-alt')?.textContent.split(' ')[0] || 'No rating';
      const reviews = item.querySelector('.s-link-style .a-size-base')?.textContent || 'No reviews';
      const image = item.querySelector('.s-image')?.src || 'No image';

      // Add the extracted product data to the products array
      products.push({ title, rating, reviews, image });
    });

    // Return the array of scraped product data
    return products;
  } catch (error) {
    // Log any errors encountered during the process
    console.error(error);
    // Return an empty array in case of an error
    return [];
  }
};

// Export the scrapeAmazon function for use in other modules
module.exports = scrapeAmazon;