# Amazon Product Scraper

A simple web application to scrape Amazon product listings from the first page of search results for a given keyword. The backend is built with Node.js and Express, and the frontend uses HTML, CSS, and Vanilla JavaScript.

## Features

- Scrape Amazon product listings based on a search keyword
- Display product details including title, rating, number of reviews, and image
- Simple and user-friendly web interface

## Prerequisites

- Node.js (version 12 or higher)
- npm (Node package manager)

## Setup

1. **Clone the repository:**

    ```bash
    git clone https://github.com/devitruvius/amazon-product-scraper.git
    ```

2. **Install dependencies:**

    ```bash
    cd amazon-product-scraper
    npm install
    ```

## Running the Application

1. **Start the server:**

    ```bash
    node server.js
    ```

2. **Open your browser:**

    Navigate to [http://localhost:3000](http://localhost:3000) to access the frontend.

## Usage

1. **Enter a keyword:**

    Type the desired keyword into the input field.

2. **Initiate the scraping process:**

    Click the "Scrape Amazon" button to start the scraping process.

3. **View the results:**

    Once the scraping is complete, the results will be displayed below the input field.

## Technologies Used

- Node.js
- Express.js
- Axios
- JSDOM
- HTML
- CSS
- JavaScript (Vanilla)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
