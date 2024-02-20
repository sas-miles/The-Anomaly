import barba from '@barba/core';
import { gsap } from 'gsap';

import Nav from "$utils/Nav";

import Experience from './Experience/Experience';
import ChapterAnimations from './Animations/ChapterAnimations';
import ChapterUI from '$utils/ChapterUI';


sessionStorage.setItem('key', 'value');




let experience = new Experience(document.querySelector('canvas.webgl'));

let chapterUI = new ChapterUI()

import IntroAnimations from './Animations/IntroAnimations';


const chapterAnimation = new ChapterAnimations()


const nav = new Nav()




// Define a clear function to handle DOM cleanup and Experience reset
function clearPageContent() {
  document.querySelectorAll('.sphere-container').forEach(el => el.remove());
  document.querySelectorAll('.label-container').forEach(el => el.remove());
  
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
    experience.world.audio.initEvents()
    console.log('Experience set');
    
    } else {
      // Assuming you have an updateScene method or similar to adjust the scene
      experience.updateScene();
      experience.world.audio.initEvents()
      console.log('Experience updated');
      
    }

}


// Initialize Barba.js
barba.init({
  prevent: ({ el }) => el.classList && el.classList.contains('barba-ignore'),
  
  transitions: [
    {
      name: 'home',
      to: {
        namespace: ['home'],
      },
        once(data) {
          
          gsap.set(".home-logo", { opacity: 0 });
          gsap.set(".home-cta_text", { opacity: 0 });
          gsap.set(".home-intro_enter-line", { height: 0 });
          gsap.set(".intro-sound_button-container", { opacity: 0 });
          gsap.to(".home-intro", {
            opacity: 1,
          })
          gsap.to(".home-logo", {
            opacity: 1,
            duration: 3,
            ease: "power1.out",
            delay: 1
          })
          gsap.timeline()
          .to(".home-cta_text", {
            opacity: 1,
            duration: .5,
            ease: "power2.out",
            delay: 1.25
          })
          .to(".home-intro_enter-line", {
            height: "4vh",
            duration: .5,
            ease: "power2.out"
          })
          .to(".intro-sound_button-container", {
            opacity: 1,
            duration: .1,
            ease: "power4.in",
            delay: -.1
          })

      }
    },
    {
      name: 'webglCanvas Intro Page',
      // from: {
      //   namespace: ['home', 'chapter1', 'chapter2'],
      // },
      to: {
        namespace: ['intro'],
      },
      once() {
        gsap.timeline()
        .to(".webgl", {
          opacity: 1,
          duration: 3,
          ease: "power2.out", 
          delay: 1.5
        })
      },
      enter(data) {
        gsap.timeline()
        .to(".webgl", {
          opacity: 1,
          duration: 3,
          ease: "power2.out", 
          delay: 1.5
        })
      }
    },
    {
      name: 'intro',
      from: {
        namespace: [
          'chapter1', 
          'chapter2'
        ]
      },
      to: {
        namespace: ['intro']
      },
      beforeEnter(data) {
        gsap.timeline()
        .to(".webgl", {
          opacity: 1,
          duration: 3,
          ease: "power2.out", 
          delay: 1.5
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
      },
      async beforeLeave(data){
       await chapterAnimation.setChapterLeave(data)
      }
    },
    {
      name: 'WebglChapterCanvasIntro',
      to: {
        namespace: [
          'chapter1',
          'chapter2'
        ]
      },
      once(data) {
        chapterAnimation.setChapterEnter(data)
        chapterAnimation.setLabels()
      },
      enter(data) {
        chapterAnimation.setChapterEnter(data)
        chapterAnimation.setLabels()
      },
      async beforeLeave(data) {
        await chapterAnimation.setChapterLeave(data)
        clearPageContent();
      }
      
    },

    {
      name: 'chapterEnter',
      from: {
        namespace: ['intro']
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
      beforeEnter(data) {
        sessionStorage.setItem('pageEnter', 'home');
        const namespace = data.next.namespace;
        experience.world.audio.playSound(namespace);
      },
      beforeLeave(data) {
        const namespace = data.current.namespace;
        experience.world.audio.stopSound(namespace);
      }
    },
    {
      namespace: 'intro',
      beforeEnter(data) {
        sessionStorage.setItem('pageEnter', 'intro');
        setExperience();
        const introAnimations = new IntroAnimations(experience);

        experience.world.audio.transitionAudio('intro');
      },
      beforeLeave(data) {
        const namespace = data.current.namespace;
        experience.world.audio.stopSound(namespace);
        clearPageContent();
      }
    },
    {
      namespace: 'chapter1',
      beforeEnter(data) {
        sessionStorage.setItem('pageEnter', 'chapter1');
        setExperience();
        experience.world.audio.transitionAudio('chapter1');
        const introAnimations = new IntroAnimations(experience);
        console.log('Intro page loaded');
      }, 
      afterEnter(data){
        chapterUI = new ChapterUI();
      }

    },
    {
      namespace: 'chapter2',
      beforeEnter(data) {
        sessionStorage.setItem('pageEnter', 'chapter2');
        setExperience();
        experience.world.audio.transitionAudio('chapter2');

      },
      afterEnter(){
        chapterUI = new ChapterUI();
      }

    }
  ]

});

barba.hooks.once((data) => {
  if (data.next.namespace === 'intro') {
    // Code to run when the 'intro' namespace is loaded for the first time
    console.log("Entering the 'intro' namespace for the first time.");
    const introAnimations = new IntroAnimations(experience);
        console.log('Intro page loaded');
  }
});

barba.hooks.beforeEnter((data) => {
  if (data.next.namespace === 'intro') {
    // Code to run when the 'intro' namespace is loaded for the first time
    console.log("Entering the 'intro' namespace for the first time.");
    const introAnimations = new IntroAnimations(experience);
        console.log('Intro page loaded');
  }
});