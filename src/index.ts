import barba from '@barba/core';
import { gsap } from 'gsap';
import { restartWebflow } from '@finsweet/ts-utils';

import Experience from './Experience/Experience';



sessionStorage.setItem('key', 'value');
let experience = new Experience(document.querySelector('canvas.webgl'));


window.Webflow ||= [];
window.Webflow.push(async () => {

  // Define a clear function to handle DOM cleanup and Experience reset
  function clearPageContent() {
    document.querySelectorAll('.sphere-container').forEach(el => el.remove());
    
    // Call the reset method on the interface to clear Three.js related content
    if (experience && experience.interface) {
      experience.interface.reset();
      console.log("Experience interface reset.");
    }

    // Additional cleanup actions can be placed here if needed
  }
  
  // Initialize Barba.js
  barba.init({
    prevent: ({ el }) => el.classList && el.classList.contains('barba-ignore'),
    
    transitions: [{
      name: 'fade',
      sync: false,

      once() {
        gsap.to(".label-marker-heading", {
          opacity: 1, 
          y: -20,
          duration: 1,
          delay: 2,
          ease: "power2.inOut"
        })
      },
      
      leave(data) {
        gsap.fromTo(".chapter-page-title", 
        { opacity: 1, x: 0 }, { opacity: 0, x: -20, duration: 2 });

        gsap.to(".label-marker-heading", {
          opacity: 0, 
          duration: 1,
          ease: "power2.inOut"
        })
        
      },

      beforeLeave(data) {
        clearPageContent();
      },

      afterLeave(data) {
      },

      beforeEnter(data) {
        const canvas = document.querySelector('canvas.webgl');
      if (!experience || !canvas) {
        experience = new Experience(canvas);
        
      } else {
        // Assuming you have an updateScene method or similar to adjust the scene
        experience.updateScene();
      }
      },
      
      enter(data) {
        gsap.fromTo(".chapter-page-title", { opacity: 0, y: 20, ease: "power4.out" }, { opacity: 1, y: 0, duration: 1, delay: 2 });
        gsap.fromTo(".chapter-main", { opacity: 0, x: -100, ease: "power4.out" }, { opacity: 1, x: 0, duration: 1, delay: 1});
        gsap.to(".label-marker-heading", {
          opacity: 1, 
          duration: 1,
          ease: "power2.inOut"
        })
      },

      after(data) {
        restartWebflow();
        

      },
    }],

    views: [
      {
        namespace: 'home',
        beforeEnter() {
          sessionStorage.setItem('page', 'home');
        }
      },
      {
        namespace: 'chapter1',
        beforeEnter() {
          sessionStorage.setItem('page', 'chapter1');
        }
      },
      {
        namespace: 'chapter2',
        beforeEnter() {
          sessionStorage.setItem('page', 'chapter2')
        }
      },
      {
        namespace: 'chapter3',
        beforeEnter() {
          sessionStorage.setItem('page', 'chapter3')
        }
      },
      {
        namespace: 'chapter4',
        beforeEnter() {
          sessionStorage.setItem('page', 'chapter4')
        }
      },
      {
        namespace: 'chapter5',
        beforeEnter() {
          sessionStorage.setItem('page', 'chapter5')
        }
      },
  ]
  });

});

