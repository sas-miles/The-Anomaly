import barba from '@barba/core';
import { gsap } from 'gsap';
import { restartWebflow } from '@finsweet/ts-utils';


import Experience from './Experience/Experience'

const experience = new Experience(document.querySelector('canvas.webgl'));

window.Webflow ||= [];
window.Webflow.push(async () => {

 // Initialize Barba.js
barba.init({
  prevent: ({ el }) => el.classList && el.classList.contains('barba-ignore'),
  transitions: [{
    name: 'fade',
    
    leave(data) {
      gsap.fromTo(".chapter-page-title", 
      { opacity: 1, x: 0 }, { opacity: 0, x: -20, duration: 2, });
      
    },
    enter(data) {
      gsap.fromTo(".chapter-page-title", { opacity: 0, y: 20, ease: "power4.out" }, { opacity: 1, y: 0, duration: 1, delay: 2 });
      gsap.fromTo(".chapter-main", { opacity: 0, x: -100, ease: "power4.out" }, { opacity: 1, x: 0, duration: 1, delay: 2});
    },
    after(data) {
      restartWebflow();
    }
  }],
});

});