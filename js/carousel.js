
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