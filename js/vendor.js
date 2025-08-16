

// Sticky nav 
const navbar = document.querySelector('.nav');
const header__navbar = document.getElementById('header__navbar');

window.addEventListener('scroll', function () {

    const viewportHeight = window.innerHeight * .99;

    if (window.scrollY >= viewportHeight) {
        navbar.classList.add('nav--sticky');
        header__navbar.style.position = 'fixed';
        
    } else {
        navbar.classList.remove('nav--sticky');
        header__navbar.style.position = 'relative';

    }

});