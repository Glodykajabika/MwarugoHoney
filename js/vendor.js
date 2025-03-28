

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
        navbar.classList.add('nav--sticky');

    } else {
        navbar.classList.remove('nav--sticky');
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


// Carousel button functionality
const carouselContainer = document.querySelector('.carousel')
const carouselWrapper = document.querySelector('.carousel__wrapper');
const slides = document.querySelectorAll('.carousel__slide');
const prevBtn = document.querySelector('.btn__prev');
const nextBtn = document.querySelector('.btn__next');

// Clone first and last slides for infinite looping
const firstSlideClone = slides[0].cloneNode(true);
const lastSlideClone = slides[slides.length - 1].cloneNode(true);
carouselWrapper.insertBefore(lastSlideClone, slides[0]);
carouselWrapper.appendChild(firstSlideClone);

// Get all slides including clones
const allSlides = document.querySelectorAll('.carousel__slide');
let currentIndex = 1; // Start at the first actual slide (Slide 1)

function updateCarousel() {
    const slide = allSlides[currentIndex];
    const offset = - (slide.offsetLeft + slide.offsetWidth / 2 - carouselContainer.offsetWidth / 2);
    carouselWrapper.style.transform = `translateX(${offset}px)`;
}

function goToSlide(index) {
    currentIndex = index;
    carouselWrapper.style.transition = 'transform  .6s ease-in-out';
    updateCarousel();
}

function goToSlideWithoutTransition(index) {
    currentIndex = index;
    carouselWrapper.style.transition = 'none';
    updateCarousel();
    // Force reflow to apply the change immediately
    carouselWrapper.offsetHeight;
    carouselWrapper.style.transition = 'transform .6s ease-in-out';
}

// Set initial position to Slide 1
goToSlideWithoutTransition(1);

let autoSlideInterval;

// Function to start automatic sliding
function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        goToSlide(currentIndex + 1); // Move to the next slide
    }, 5000); // Slide every 3 seconds
}

// Start the automatic sliding when the carousel initializes
startAutoSlide();

// Navigation event listeners
prevBtn.addEventListener('click', () => {
    clearInterval(autoSlideInterval); // Pause automatic sliding
    goToSlide(currentIndex - 1); // Move to previous slide
    startAutoSlide(); // Resume automatic sliding
});

nextBtn.addEventListener('click', () => {
    clearInterval(autoSlideInterval); // Pause automatic sliding
    goToSlide(currentIndex + 1); // Move to next slide
    startAutoSlide(); // Resume automatic sliding
});

// Handle infinite looping
carouselWrapper.addEventListener('transitionend', () => {
    if (currentIndex === 0) {
        // Reached cloned last slide (Slide 6') before Slide 1, jump to actual Slide 6
        goToSlideWithoutTransition(allSlides.length - 2); // Index 6
    } else if (currentIndex === allSlides.length - 1) {
        // Reached cloned first slide (Slide 1') after Slide 6, jump to actual Slide 1
        goToSlideWithoutTransition(1);
    }
});


// Update on Window Resize
window.addEventListener('resize', updateCarousel);


// Accordion 
const headers = document.querySelectorAll('.accordion__item--header');

headers.forEach(header => {
    header.addEventListener('click', () => {
        const content = header.nextElementSibling;
        const isOpen = content.classList.contains('accordion__item--content-active');

        // Close all items
        document.querySelectorAll('.accordion__item--content').forEach(item => {
            item.classList.remove('accordion__item--content-active');
        });

        // Toggle the clicked item (open if it was closed, close if it was open)
        if (!isOpen) {
            content.classList.add('accordion__item--content-active');
        }
    });
});