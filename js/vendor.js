
// Sticky nav 
const navbar = document.querySelector('.nav');
const header__navbar = document.getElementById('header__navbar');
const hamburger = document.querySelector('.hamburger');
const header__linksBox = document.querySelector(".header__links-box");


// Sticky navigation bar
window.addEventListener('scroll', function () {
    
    const viewportHeight = window.innerHeight * .59;
    
    if (window.scrollY >= viewportHeight) {
        navbar.classList.add('nav--sticky');
        header__navbar.style.position = 'fixed';
        
    } else {
        navbar.classList.remove('nav--sticky');
        header__navbar.style.position = 'relative';

    }
    
});


// Hamburger menu toggle
hamburger.addEventListener('click', () => {
    header__linksBox.classList.toggle('active');
    hamburger.classList.toggle('active');
});