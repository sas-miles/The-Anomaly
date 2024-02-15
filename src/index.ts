import barba from '@barba/core';
import { gsap } from 'gsap';

import Nav from "$utils/Nav";

import Experience from './Experience/Experience';
import ChapterAnimations from './Animations/ChapterAnimations';
import ChapterUI from '$utils/ChapterUI';

import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


sessionStorage.setItem('key', 'value');

let experience = new Experience(document.querySelector('canvas.webgl'));
let chapterUI = new ChapterUI()

const chapterAnimation = new ChapterAnimations()


const nav = new Nav()


// Define a clear function to handle DOM cleanup and Experience reset
function clearPageContent() {
  document.querySelectorAll('.sphere-container').forEach(el => el.remove());
  
  // Call the reset method on the interface to clear Three.js related content
  if (experience && experience.interface) {
    experience.interface.reset();
    console.log("Experience interface reset.");
  }
}

function setExperience () {
  const canvas = document.querySelector('canvas.webgl');

    if (!experience || !canvas) {
    experience = new Experience(canvas);
    console.log('Experience set');
    
    } else {
      // Assuming you have an updateScene method or similar to adjust the scene
      experience.updateScene();
      console.log('Experience updated');
      
    }
}

function homeScroll () {
  const trackHeight = document.querySelector('.intro-track').offsetHeight
  const containers = document.querySelectorAll(".intro-content_container")
  
  gsap.fromTo(".intro-content_container:first-child", 
    { opacity: 0, y: 20, ease: "power2.out" }, // Starting state
    { opacity: 1, duration: 1 } // Ending state and duration of the animation
  )


  containers.forEach((container, index) => {
    const portionHeight = trackHeight / containers.length;

    if (index === 0) { // Special handling for the first container
      gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "bottom bottom",
          end: () => "+=" + portionHeight,
          scrub: true,
          onEnterBack: () => gsap.to(container, { opacity: 1 }),
          onLeave: () => gsap.to(container, { opacity: 0 })
        }
      });
    } else {
      // General ScrollTrigger for other containers
      gsap.timeline({
        scrollTrigger: {
          trigger: ".intro-track",
          start: () => (portionHeight * index) + "px",
          end: () => (portionHeight * (index + 1)) + "px",
          scrub: true,
          //markers: true, // Helpful for debugging, remove for production
          onEnter: () => gsap.to(container, { opacity: 1 }),
          onLeave: () => gsap.to(container, { opacity: 0 }),
          onEnterBack: () => gsap.to(container, { opacity: 1 }),
          onLeaveBack: () => gsap.to(container, { opacity: 0 }),
        }
      })
    }
  })
}

 
// Initialize Barba.js
barba.init({
  prevent: ({ el }) => el.classList && el.classList.contains('barba-ignore'),
  
  transitions: [
    {
      name: 'homeIntro',
      to: {
        namespace: ['home']
      },
      beforeEnter(data) {
        gsap.timeline()
        .to(".webgl", {
          opacity: 0,
          duration: 1,
          ease: "power2.out"
        })
      },
      enter(data) {
        gsap.fromTo(".home-intro-text",{
          opacity: 0,
          y: 20,
          ease: "power2.out"
        },
        {
          opacity: 1,
          y: 0,
          duration: 2
        
        })
        
      }
    },
    {
      name: 'WebglCanvasIntro',
      to: {
        namespace: [
          'chapter1',
          'chapter2'
        ]
      },
      once(data) {
        chapterAnimation.setChapterEnter(data)
      },

      async leave(data) {
        await chapterAnimation.setChapterLeave(data)
      },
      enter(data) {
        chapterAnimation.setChapterEnter(data)
      }
      
    },

    {
      name: 'chapterEnter',
      from: {
        namespace: ['home']
      },
      to: {
        namespace: ['chapter1'],
      },
      async leave(data) {
        await gsap.timeline()
        .to(".home-last", {
          opacity: 0,
          duration: 1,
          y: 20,
          ease: "power2.out"
        })
      },
      enter(data) {
        chapterAnimation.setChapterEnter(data)
      }
      
      
    }

  ],

  views: 
  [
    {
      namespace: 'home',
      beforeEnter() {
        console.log('home BEFORE ENTER');
        sessionStorage.setItem('pageEnter', 'home');
        homeScroll()
        
      },
      beforeLeave() {
        clearPageContent();
      }
    },
    
    {
      namespace: 'chapter1',
      beforeEnter() {
        console.log('chapter 1 BEFORE ENTER');
        sessionStorage.setItem('pageEnter', 'chapter1')
        setExperience()
        
      }, 
      beforeLeave() {
        clearPageContent();
      },
      afterEnter(){
        chapterUI = new ChapterUI()
      }
    },

    {
      namespace: 'chapter2',

      beforeEnter() {
        console.log('chapter 2 BEFORE ENTER');
        sessionStorage.setItem('pageEnter', 'chapter2')
        setExperience()

      },
      beforeLeave() {
        clearPageContent();
      },
      afterEnter(){
        chapterUI = new ChapterUI()
      }
    }
  ]

});