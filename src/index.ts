import barba from '@barba/core';
import { gsap } from 'gsap';

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
      gsap.fromTo(".chapter-page-title", { opacity: 1, x: 0 }, { opacity: 0, x: -20, duration: 2 });
    },
    enter(data) {
      gsap.fromTo(".chapter-page-title", { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 2 });
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