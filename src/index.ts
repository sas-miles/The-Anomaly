import barba from '@barba/core';

import Experience from './Experience/Experience'

const experience = new Experience(document.querySelector('canvas.webgl'));


// Initialize Barba.js
barba.init({
  transitions: [{
    name: 'fade',
    once(data) {
      console.log('Barba once hook - Initial page load');
    },
    leave(data) {
      console.log('Barba leave hook - Leaving current page');
    },
    enter(data) {
      console.log('Barba enter hook - Entering new page');
    },
  }],
});

document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault(); // Prevent the default link behavior

      const href = link.getAttribute('href');
      if (href) {
        barba.go(href); // Navigate with Barba.js
      } else {
        console.error('No href attribute found on link:', link);
      }
    });
  });
});