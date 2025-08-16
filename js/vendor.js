

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
const header__navbar = document.getElementById('header__navbar');

window.addEventListener('scroll', function () {

    const viewportHeight = window.innerHeight * .5;

    if (window.scrollY >= viewportHeight) {
        navbar.classList.add('nav--sticky');
        header__navbar.style.position = 'fixed';
        
    } else {
        navbar.classList.remove('nav--sticky');
        header__navbar.style.position = 'relative';

    }

});