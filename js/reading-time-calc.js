
// Function to calculate reading time
function readingTimeCalc(text) {
    const words = text.split(/\s+/).length; // Count the words
    const wordsPerMinute = 200; // Average reading speed
    const minutes = Math.ceil(words / wordsPerMinute); // Round up to the nearest minute
    return `${minutes} min lecture`;
}

// Function to calculate and display reading time for all articles
function displayReadingTimes() {
    const articles = document.querySelectorAll('.article'); // Get all article links
    articles.forEach(article => {
        const contentElement = article.querySelector('.blog-content'); // Get hidden content
        const content = contentElement.textContent; // Extract text
        const time = readingTimeCalc(content); // Calculate reading time
        const timeElement = article.querySelector('.card__section-blog--time'); // Get time display element
        timeElement.textContent = time; // Display reading time
    });
}

// Run the function when the page loads
document.addEventListener('DOMContentLoaded', displayReadingTimes);