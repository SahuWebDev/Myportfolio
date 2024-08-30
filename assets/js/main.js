/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId);
    const nav = document.getElementById(navId);

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show');
        });
    }
};
showMenu('nav-toggle', 'nav-menu');

/*==================== REMOVE MENU MOBILE ====================*/
const navLinks = document.querySelectorAll('.nav__link');

const linkAction = () => {
    const navMenu = document.getElementById('nav-menu');
    // When we click on each nav__link, we remove the show class from nav-menu
    navMenu.classList.remove('show');
};
navLinks.forEach(navLink => navLink.addEventListener('click', linkAction));

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
    const scrollY = window.scrollY;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50; // Adjust the offset for better accuracy
        const sectionId = current.getAttribute('id');
        const navLink = document.querySelector(`.nav__menu a[href*=${sectionId}]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink.classList.add('active-link');
        } else {
            navLink.classList.remove('active-link');
        }
    });
};
window.addEventListener('scroll', scrollActive);

/*============= move top button ===========*/

// Show the button when scrolled down 100px from the top
window.onscroll = function() {
    let moveTopBtn = document.getElementById("back-to-top");
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        moveTopBtn.style.display = "inline-flex";  // Changed to inline-flex to maintain alignment styles
    } else {
        moveTopBtn.style.display = "none";
    }
};

// Scroll to top when the button is clicked
document.getElementById("back-to-top").onclick = function() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
};


/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
    reset: false // Keep reset false for better performance
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text', {}); 
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img', { delay: 400 }); 
sr.reveal('.home__social-icon', { interval: 200 }); 
sr.reveal('.skills__data, .work__img, .contact__input', { interval: 200 });

/*==================== HANDLE RESPONSE FROM PHP MAILER ====================*/
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector('.contact__form');
    const messageDiv = document.getElementById('form-message');

    form.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent default form submission

        const formData = new FormData(form);
        
        fetch('mailer.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                messageDiv.innerHTML = `<div class="success-box">${data.message}</div>`;
                messageDiv.classList.add('success');
            } else {
                messageDiv.innerHTML = `<div class="error-box">${data.message}</div>`;
                messageDiv.classList.add('error');
            }
            
            if (data.status === 'success') {
                form.reset();
            }

            // Automatically remove the message and refresh the page after 3-4 seconds
            setTimeout(() => {
                messageDiv.innerHTML = '';
                messageDiv.classList.remove('success', 'error');
                window.location.href = '#home'; // Replace 'index.html' with the correct path to your homepage
            }, 4000);
        })
        .catch(error => {
            messageDiv.innerHTML = `<div class="error-box">An unexpected error occurred. Please try again later.</div>`;
            messageDiv.classList.add('error');
        });
    });
});

function newFunction() {
    return "back-to-top";
}

