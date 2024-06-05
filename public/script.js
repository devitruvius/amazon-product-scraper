document.getElementById('scrapeButton').addEventListener('click', async () => {
    // Retrieve the keyword entered by the user
    const keyword = document.getElementById('keyword').value;

    // Ensure a keyword has been entered
    if (!keyword) {
        alert('Please enter a search keyword');
        return;
    }

    try {
        // Fetch data from the API using the encoded keyword
        const response = await fetch(`/api/scrape?keyword=${encodeURIComponent(keyword)}`);
        // Parse the response as JSON
        const products = await response.json();

        // Display the fetched product data
        displayResults(products);
    } catch (error) {
        // Log any fetching errors
        console.error('Error fetching data:', error);
    }
});

// Display function for showing scraped product results
function displayResults(products) {
    const resultsDiv = document.getElementById('results');

    // Clear previous results
    resultsDiv.innerHTML = '';

    // If no products found, display a message
    if (products.length === 0) {
        resultsDiv.innerHTML = '<p>No products found.</p>';
        return;
    }

    // Iterate through each product
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');

        // Create and append product image
        const productImage = document.createElement('img');
        productImage.src = product.image;
        productDiv.appendChild(productImage);

        // Create and append product details
        const productDetails = document.createElement('div');
        productDetails.classList.add('product-details');

        // Add product title
        const productTitle = document.createElement('h2');
        productTitle.textContent = product.title;
        productDetails.appendChild(productTitle);

        // Add product rating
        const productRating = document.createElement('p');
        productRating.textContent = `Rating: ${product.rating} stars`;
        productDetails.appendChild(productRating);

        // Add product reviews count
        const productReviews = document.createElement('p');
        productReviews.textContent = `Reviews: ${product.reviews}`;
        productDetails.appendChild(productReviews);

        productDiv.appendChild(productDetails);
        resultsDiv.appendChild(productDiv);
    });
}

// Enhanced button functionality for better user feedback
document.getElementById('scrapeButton').addEventListener('click', async () => {
    const scrapeButton = document.getElementById('scrapeButton');
    // Change button text to indicate loading
    scrapeButton.textContent = 'Loading...';

    const keyword = document.getElementById('keyword').value;

    // Ensure a keyword has been entered before fetching
    if (!keyword) {
        alert('Please enter a search keyword');
        // Restore original button text
        scrapeButton.textContent = 'Scrape Amazon';
        return;
    }

    try {
        const response = await fetch(`/api/scrape?keyword=${encodeURIComponent(keyword)}`);
        const products = await response.json();

        displayResults(products);
        // Restore original button text
        scrapeButton.textContent = 'Scrape Amazon';
    } catch (error) {
        console.error('Error fetching data:', error);
        // Restore original button text
        scrapeButton.textContent = 'Scrape Amazon';
    }
});