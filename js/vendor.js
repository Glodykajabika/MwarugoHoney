

// Active links code (checks if a link is active and while the link is active it is maintained in a certain style)
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.header__link')

function activeLink() {
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop - sectionHeight / 3) {
            currentSection = section.id;
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');

        if (link.hash === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', activeLink);
activeLink();

// Sticky nav 
const navbar = document.querySelector('.nav');

window.addEventListener('scroll', function () {

    const viewportHeight = window.innerHeight * .9;


    if (window.scrollY >= viewportHeight) {
        navbar.classList.add('sticky');

    } else {
        navbar.classList.remove('sticky');
    }
});

// Typing animation 

const typingText = document.querySelector('.header__text--sub');
const sentences = [
    'Chaque goûte, est une histoire unique ... ',
    'Savourez la douceur de la nature ... ',
    "Découvrez l'or liquide de la nature ... ",
    "Découvrez Un goût pur, une passion authentique ... ",
    "Découvrez Un heritage de saveurs ... ",
    "Découvrez L'art de la nature dans chaque goûte ... "
]; // sentences to cycle through

let sentenceIndex = 0;
let wordIndex = 0;

function type() {
    if (wordIndex < sentences[sentenceIndex].length) {
        // Add the next wordacter
        typingText.textContent += sentences[sentenceIndex].charAt(wordIndex);
        wordIndex++;
        setTimeout(type, 60); // Typing speed (adjust as needed)
    } else {
        // Wait before erasing
        setTimeout(erase, 2000); // Delay before erasing (adjust as needed)
    }
}

function erase() {
    if (wordIndex > 0) {
        // Remove the last wordacter
        typingText.textContent = sentences[sentenceIndex].substring(0, wordIndex - 1);
        wordIndex--;
        setTimeout(erase, 30); // Erasing speed (adjust as needed)
    } else {
        // Move to the next sentence
        sentenceIndex = (sentenceIndex + 1) % sentences.length;
        setTimeout(type, 60); // Delay before typing the next word (adjust as needed)
    }
}

type();


// Function to calculate reading time
function readingTimeCalc(text) {
    const words = text.split(/\s+/).length; // Count the words
    const wordsPerMinute = 200; // Average reading speed
    const minutes = Math.ceil(words / wordsPerMinute); // Round up to the nearest minute
    return `${minutes} min lecture`;
}

// Function to calculate and display reading time for all articles
function displayReadingTimes() {
    const articles = document.querySelectorAll('.card__section-blog'); // Get all article links
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

