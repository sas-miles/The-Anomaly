import barba from '@barba/core';
import { gsap } from 'gsap';

import Nav from "$utils/Nav";

import Experience from './Experience/Experience';
import ChapterAnimations from './Animations/ChapterAnimations';
import ChapterUI from '$utils/ChapterUI';


sessionStorage.setItem('key', 'value');


let experience = new Experience(document.querySelector('canvas.webgl'));


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
    console.log('Experience set');
    
    } else {
      // Assuming you have an updateScene method or similar to adjust the scene
      experience.updateScene();
      console.log('Experience updated');
      
    }
}


experience.world.on('ready', () => {

  barba.init({
    prevent: ({ el }) => el.classList && el.classList.contains('barba-ignore'),
    
    transitions: [
      {
        name: 'home',
        from: {
          namespace: ['intro']
        },
        to: {
          namespace: ['home'],
        },
        async leave(data) {
          await gsap.timeline()
          .to(".webgl", {
            opacity: 0,
            duration: .5,
            ease: "power2.out"
          })
          .to(".intro-track",{
            opacity: 0,
            duration: .5,
            ease: "power2.out"
          })
        },
        async enter(data) {
          gsap.set(".home-logo", { opacity: 0 });
            gsap.set(".home-cta_text", { opacity: 0 });
            gsap.set(".home-intro_enter-line", { height: 0 });
            gsap.set(".intro-sound_button-container", { opacity: 0 });
  
            
            gsap.timeline()
            .to(".home-intro", {
              opacity: 1,
            })
            .to(".home-logo", {
              opacity: 1,
              duration: 3,
              ease: "power1.out",
            })
            .to(".home-cta_text", {
              opacity: 1,
              duration: .5,
              ease: "power2.out",
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
        name: 'ChaptersToHome', 
        from: {
          route: ['chapter1', 'chapter2']
        },
        to: {
          namespace: ['home']
        },
        async beforeEnter(data) {
          await chapterAnimation.setChapterLeave(data)
        },
        async enter(data) {
          await gsap.timeline()
          .to(".webgl", {
            opacity: 0,
            duration: .5,
            ease: "power2.out"
          })
          .to(".home-intro", {
            opacity: 1,
          })
          .to(".home-logo", {
            opacity: 1,
            duration: 3,
            ease: "power1.out",
          })
          .to(".home-cta_text", {
            opacity: 1,
            duration: .5,
            ease: "power2.out",
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
        name: 'Home to Intro',
        from: {
          namespace: ['home']
        },
        to: {
          namespace: ['intro']
        },
        async beforeLeave(data) {
          await gsap.timeline()
          .to(".home-intro", {
            opacity: 0,
            duration: 1,
            ease: "power2.out"
          })
          
        },
        enter(data) {
          gsap.set(".intro-text_first", { y: 20 });
          gsap.timeline()
          .to(".intro-text_first", {
            opacity: 1, 
            y: 0,
            duration: 2,
            ease: "power2.out",
          })
          .to(".webgl", {
            opacity: 1, 
            duration: 2,
          })
          
        }
        
      },
      {
        name: 'Chapters to Intro',
        from: {
          namespace: [
            'chapter1', 
            'chapter2'
          ]
        },
        to: {
          namespace: ['intro']
        },
        async beforeLeave(data){
          await chapterAnimation.setChapterLeave(data)
          await gsap.timeline()
          .to(".webgl", {
            opacity: 0,
            duration: 3,
            ease: "power2.out"
          })
          
         },
        enter(data) {
          gsap.timeline()
          .to(".webgl", {
            opacity: 1,
            duration: 3,
            ease: "power2.out", 
            delay: 1
          })
          
            
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
        async enter(data) {
          await chapterAnimation.setChapterEnter(data)
          await chapterAnimation.setLabels()
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
          .to(".intro-last", {
            opacity: 0,
            duration: 1,
            y: 20,
            ease: "power2.out"
          })
          .to(".webgl", {
            opacity: 0,
            duration: .5,
            ease: "power2.out"
          })
        },
        enter(data) {
          chapterAnimation.setChapterEnter(data)
          chapterAnimation.setLabels()
        }
        
        
      }
  
    ],
  
    views: 
    [
      {
        namespace: 'home',
        beforeEnter(data) {
          sessionStorage.setItem('pageEnter', 'home');
          setExperience();
          const namespace = data.next.namespace;
          
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
          const namespace = data.next.namespace;
          experience.world.audio.playSound(namespace);
          ScrollTrigger.refresh();
          
        },
        beforeLeave(data) {
          const namespace = data.current.namespace;
        },
        afterEnter(data){
          // Now safe to initialize animations
          experience.world.audio.updateButtonVisibility();
          const introAnimations = new IntroAnimations(experience);
        }
      },
      {
        namespace: 'chapter1',
        beforeEnter(data) {
          sessionStorage.setItem('pageEnter', 'chapter1');
          setExperience();
          const namespace = data.next.namespace;
          experience.world.audio.playSound(namespace);
        }, 
        afterEnter(data){
          const chapterUI = new ChapterUI(data.next.container);
          experience.world.audio.updateButtonVisibility();
          experience.world.audio.bindButtonEvents();
        },
        beforeLeave(data) {
          const namespace = data.current.namespace;
          experience.world.audio.stopSound(namespace);
        }
  
      },
      {
        namespace: 'chapter2',
        beforeEnter(data) {
          sessionStorage.setItem('pageEnter', 'chapter2');
          setExperience();
          const namespace = data.next.namespace;
          experience.world.audio.playSound(namespace);
  
        },
        afterEnter(data){
          const chapterUI = new ChapterUI(data.next.container);
          experience.world.audio.updateButtonVisibility();
        },
        beforeLeave(data) {
          const namespace = data.current.namespace;
          experience.world.audio.stopSound(namespace);
        }
  
      }
    ]
  
  });
  
  barba.hooks.once((data) => {


    if (data.next.namespace === 'home') {
  
      gsap.set(".home-logo", { opacity: 0 });
            gsap.set(".home-cta_text", { opacity: 0 });
            gsap.set(".home-intro_enter-line", { height: 0 });
            gsap.set(".intro-sound_button-container", { opacity: 0 });
  
            
            gsap.timeline()
            .to(".home-intro", {
              opacity: 1,
            })
            .to(".home-logo", {
              opacity: 1,
              duration: 3,
              ease: "power1.out",
            })
            .to(".home-cta_text", {
              opacity: 1,
              duration: .5,
              ease: "power2.out",
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
    
  
    if (data.next.namespace === 'intro') {
  
      const introAnimations = new IntroAnimations(experience);
      
      gsap.set(".intro-text_first", { y: 20 });
      gsap.timeline()
      
      .to(".intro-text_first", {
        opacity: 1, 
        y: 0,
        duration: 2,
        ease: "power2.out",
        delay: 3
      })
      .to(".webgl", {
        opacity: 1, 
        duration: 2,
        delay: 1,
      })
  
    }
  
  });

})
