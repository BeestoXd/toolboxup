/*============================= toggle icon navbar =============================*/
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

/*============================= scroll sections active link =============================*/
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');

// Initialize the counter variable
let visitCounter = 0;

// Function to update and display the counter
function updateCounter() {
    visitCounter++;
    document.getElementById('visitCounter').textContent = visitCounter;
    // Save the counter value to local storage
    localStorage.setItem('visitCounter', visitCounter);
}

// Call the updateCounter function when the page is loaded
window.onload = function () {
    // Retrieve the counter value from local storage
    const storedCounter = localStorage.getItem('visitCounter');
    if (storedCounter) {
        // If the counter value is present in local storage, use it
        visitCounter = parseInt(storedCounter);
    } else {
        // If the counter value is not present, initialize it to 0
        visitCounter = 0;
    }
    updateCounter();
    
    // Set interval to update the counter every 5 seconds (adjust as needed)
    setInterval(updateCounter, 30000);
};

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });

            // Check if the user is in the home section
            if (id === 'home') {
                // Update the counter when the user is in the home section
                updateCounter();
            }
        }
    });

    // Check if the user scrolled more than 100 pixels and apply sticky class to the header
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    // Remove toggle icon and navbar when clicking on navbar link (scroll)
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

/*============================= scroll reveal =============================*/
ScrollReveal({
    reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .services-container, .portfolio-box', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img, .headingg', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });

/*============================= typed js =============================*/
const typed = new Typed('.multiple-text', {
    strings: ['BeestoXd', 'Beykix'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});
