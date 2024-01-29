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
      gsap.fromTo(".chapter-title-wrapper", { opacity: 1, y: 20 }, { opacity: 0, y: 0, duration: 2 });
    },
    enter(data) {
      gsap.fromTo(".chapter-title-wrapper", { opacity: 0, y: 0 }, { opacity: 1, y: 20, duration: 2 });
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