import barba from '@barba/core';
import { gsap } from 'gsap';
import { restartWebflow } from '@finsweet/ts-utils';

import Experience from './Experience/Experience';

import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
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
  }

  
  // Initialize Barba.js
  barba.init({
    prevent: ({ el }) => el.classList && el.classList.contains('barba-ignore'),
    
    transitions: [{
      name: 'fade',
      sync: false,

      once() {
        
        gsap.to(".webgl", {
          opacity: 1, 
          duration: 1,
          ease: "power2.inOut"
        })
      },
      
      leave(data) {
        
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
      },

      after(data) {
        restartWebflow();
        console.log("Webflow restarted.");

      },
    }],

    views: [
      {
        namespace: 'home',
        beforeEnter() {
          experience.updateScene();
          console.log('home BEFORE ENTER');
          sessionStorage.setItem('pageEnter', 'home');
          

        }
      },
      
      {
        namespace: 'chapter1',
        beforeEnter() {
          console.log('chapter 1 BEFORE ENTER');
          sessionStorage.setItem('pageEnter', 'chapter1');
        }
      },
      {
        namespace: 'chapter2',

        beforeEnter() {
          console.log('chapter 2 BEFORE ENTER');
          sessionStorage.setItem('pageEnter', 'chapter2')
        }

      }
  ]
  });

});