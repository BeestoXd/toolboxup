import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get } from 'firebase/database';

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

// Initialize Firebase with your project config
const firebaseConfig = {
  apiKey: "AIzaSyDgruYqzjGgltADVdkXKkJkV0DygdNjQzw",
  authDomain: "toolbox-up-web.firebaseapp.com",
  projectId: "toolbox-up-web",
  storageBucket: "toolbox-up-web.appspot.com",
  messagingSenderId: "1060266418920",
  appId: "1:1060266418920:web:def310ce874da1b678df5d"
};

const app = initializeApp(firebaseConfig);

// Get a reference to the database
const database = firebase.database();

// Initialize the counter variable
let visitCounter = 0;

// Function to update and display the counter
function updateCounter() {
  visitCounter++;
  document.getElementById('visitCounter').textContent = visitCounter;

  // Update the counter value in Firebase Realtime Database
  database.ref('visitCounter').set(visitCounter);
}

// Call the updateCounter function when the page is loaded
window.onload = function () {
  // Retrieve the counter value from Firebase Realtime Database
  database.ref('visitCounter').once('value', (snapshot) => {
    const storedCounter = snapshot.val();

    if (storedCounter !== null) {
      // If the counter value is present in the database, use it
      visitCounter = storedCounter;
    }

    updateCounter();

    // Set interval to update the counter every 5 seconds (adjust as needed)
    setInterval(updateCounter, 20000);
  });
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
