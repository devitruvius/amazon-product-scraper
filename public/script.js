document.getElementById('scrapeButton').addEventListener('click', async () => {
    // Get the user-entered keyword from the input field
    const keyword = document.getElementById('keyword').value;

    // Validate that a keyword has been entered
    if (!keyword) {
        alert('Please enter a search keyword');
        return;
    }

    try {
        // Encode the keyword for URL safety and construct the API endpoint URL
        const response = await fetch(`/api/scrape?keyword=${encodeURIComponent(keyword)}`);

        // Parse the response as JSON, expecting an array of product objects
        const products = await response.json();

        // Pass the fetched product data to the display function
        displayResults(products);
    } catch (error) {
        // Log any errors encountered during the fetching process to the console
        console.error('Error fetching data:', error);
    }
});

// Function to display the scraped product results on the page
function displayResults(products) {
    // Get a reference to the 'results' div element
    const resultsDiv = document.getElementById('results');

    // Clear any existing content within the results div
    resultsDiv.innerHTML = '';

    // If no products were found, display a "No products found" message
    if (products.length === 0) {
        resultsDiv.innerHTML = '<p>No products found.</p>';
        return;
    }

    // Iterate through each product in the provided array
    products.forEach(product => {
        // Create a div element to represent a single product
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');

        // Create an image element for the product image
        const productImage = document.createElement('img');
        productImage.src = product.image;
        // Append the image to the product div
        productDiv.appendChild(productImage);

        // Create a div to hold the product details
        const productDetails = document.createElement('div');
        productDetails.classList.add('product-details');

        // Create an h2 element for the product title
        const productTitle = document.createElement('h2');
        productTitle.textContent = product.title;
        // Append the title to the details div
        productDetails.appendChild(productTitle);

        // Create a paragraph element for the product rating
        const productRating = document.createElement('p');
        productRating.textContent = `Rating: ${product.rating} stars`;
        // Append the rating to the details div
        productDetails.appendChild(productRating);

        // Create a paragraph element for the product reviews count
        const productReviews = document.createElement('p');
        productReviews.textContent = `Reviews: ${product.reviews}`;
        // Append the reviews count to the details div
        productDetails.appendChild(productReviews);

        // Append the details div to the product div
        productDiv.appendChild(productDetails);

        // Append the complete product div to the results div
        resultsDiv.appendChild(productDiv);
    });
}

document.getElementById('scrapeButton').addEventListener('click', async () => {
    // Get a reference to the button
    const scrapeButton = document.getElementById('scrapeButton');
    
    // Change the text of the button to "Loading..."
    scrapeButton.textContent = 'Loading...';

    // Get the user-entered keyword from the input field
    const keyword = document.getElementById('keyword').value;

    // Validate that a keyword has been entered
    if (!keyword) {
        alert('Please enter a search keyword');
        // Restore the text of the button to its original state
        scrapeButton.textContent = 'Scrape Amazon';
        return;
    }

    try {
        // Encode the keyword for URL safety and construct the API endpoint URL
        const response = await fetch(`/api/scrape?keyword=${encodeURIComponent(keyword)}`);

        // Parse the response as JSON, expecting an array of product objects
        const products = await response.json();

        // Pass the fetched product data to the display function
        displayResults(products);

        // Restore the text of the button to its original state
        scrapeButton.textContent = 'Scrape Amazon';
    } catch (error) {
        // Log any errors encountered during the fetching process to the console
        console.error('Error fetching data:', error);
        // Restore the text of the button to its original state
        scrapeButton.textContent = 'Scrape Amazon';
    }
});