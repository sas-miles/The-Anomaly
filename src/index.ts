import barba from '@barba/core';
import { gsap } from 'gsap';
import Swiper from 'swiper';
import 'swiper/css';

import Nav from '$utils/Nav';

import Experience from './Experience/Experience';
import ChapterAnimations from './Animations/ChapterAnimations';
import ChapterUI from '$utils/ChapterUI';
import IntroAnimations from './Experience/Animations/IntroAnimations.js';

sessionStorage.setItem('key', 'value');

let experience = new Experience(document.querySelector('canvas.webgl'));
let introAnimations = new IntroAnimations();

const chapterAnimation = new ChapterAnimations();

const nav = new Nav();

// Define a clear function to handle DOM cleanup and Experience reset
function clearPageContent() {
  document.querySelectorAll('.sphere-container').forEach((el) => el.remove());
  document.querySelectorAll('.label-container').forEach((el) => el.remove());

  // Call the reset method on the interface to clear Three.js related content
  if (experience && experience.interface) {
    experience.interface.reset();
    console.log('Experience interface reset.');
  }
}

function setExperience() {
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
          namespace: ['intro'],
        },
        to: {
          namespace: ['home'],
        },
        async leave(data) {
          await gsap
            .timeline()
            .to('.webgl', {
              opacity: 0,
              duration: 0.5,
              ease: 'power2.out',
            })
            .to('.intro-track', {
              opacity: 0,
              duration: 0.5,
              ease: 'power2.out',
            });
        },
        async enter(data) {
          gsap.set('.home-logo', { opacity: 0 });
          gsap.set('.home-cta_text', { opacity: 0 });
          gsap.set('.home-intro_enter-line', { height: 0 });
          gsap.set('.intro-sound_button-container', { opacity: 0 });

          gsap
            .timeline()
            .to('.home-intro', {
              opacity: 1,
            })
            .to('.home-logo', {
              opacity: 1,
              duration: 3,
              ease: 'power1.out',
            })
            .to('.home-cta_text', {
              opacity: 1,
              duration: 0.5,
              ease: 'power2.out',
            })
            .to('.home-intro_enter-line', {
              height: '4vh',
              duration: 0.5,
              ease: 'power2.out',
            })
            .to('.intro-sound_button-container', {
              opacity: 1,
              duration: 0.1,
              ease: 'power4.in',
              delay: -0.1,
            });
        },
      },
      {
        name: 'ChaptersToHome',
        from: {
          route: ['chapter1', 'chapter2', 'chapter3', 'chapter4', 'chapter5'],
        },
        to: {
          namespace: ['home'],
        },
        async beforeEnter(data) {
          await chapterAnimation.setChapterLeave(data);
        },
        async enter(data) {
          await gsap
            .timeline()
            .to('.webgl', {
              opacity: 0,
              duration: 0.5,
              ease: 'power2.out',
            })
            .to('.home-intro', {
              opacity: 1,
            })
            .to('.home-logo', {
              opacity: 1,
              duration: 3,
              ease: 'power1.out',
            })
            .to('.home-cta_text', {
              opacity: 1,
              duration: 0.5,
              ease: 'power2.out',
            })
            .to('.home-intro_enter-line', {
              height: '4vh',
              duration: 0.5,
              ease: 'power2.out',
            })
            .to('.intro-sound_button-container', {
              opacity: 1,
              duration: 0.1,
              ease: 'power4.in',
              delay: -0.1,
            });
        },
      },
      {
        name: 'Home to Intro',
        from: {
          namespace: ['home'],
        },
        to: {
          namespace: ['intro'],
        },
        async beforeLeave(data) {
          await gsap
            .timeline()
            .to('.home-intro', {
              opacity: 0,
              duration: 1,
              ease: 'power2.out',
            })
            .to('.webgl', {
              opacity: 0,
              duration: 2,
            });
        },
        enter(data) {
          gsap.set('.webgl', { opacity: 0 });
          gsap
            .timeline()
            .to('.webgl', {
              opacity: 1,
              duration: 2,
            })
            .to('.sound-container', {
              opacity: 1,
              duration: 0.1,
              ease: 'power4.in',
            });
        },
      },
      {
        name: 'Chapters to Intro',
        from: {
          namespace: ['chapter1', 'chapter2', 'chapter3', 'chapter4', 'chapter5'],
        },
        to: {
          namespace: ['intro'],
        },
        async beforeLeave(data) {
          await chapterAnimation.setChapterLeave(data);
          await gsap.timeline().to('.webgl', {
            opacity: 0,
            duration: 3,
            ease: 'power2.out',
          });
        },
        enter(data) {
          console.log('entering intro');
          gsap
            .timeline()
            .to('.webgl', {
              opacity: 1,
              duration: 3,
              ease: 'power2.out',
              delay: 1,
            })
            .to('.sound-container', {
              opacity: 1,
              duration: 1,
            });
        },
      },
      {
        name: 'Chapters to Home',
        from: {
          namespace: ['chapter1', 'chapter2', 'chapter3', 'chapter4', 'chapter5'],
        },
        to: {
          namespace: ['home'],
        },
        async beforeLeave(data) {
          await chapterAnimation.setChapterLeave(data);
        },
        async enter(data) {
          gsap.set('.home-logo', { opacity: 0 });
          gsap.set('.home-cta_text', { opacity: 0 });
          gsap.set('.home-intro_enter-line', { height: 0 });
          gsap.set('.intro-sound_button-container', { opacity: 0 });

          gsap
            .timeline()
            .to('.home-intro', {
              opacity: 1,
            })
            .to('.home-logo', {
              opacity: 1,
              duration: 3,
              ease: 'power1.out',
            })
            .to('.home-cta_text', {
              opacity: 1,
              duration: 0.5,
              ease: 'power2.out',
            })
            .to('.home-intro_enter-line', {
              height: '4vh',
              duration: 0.5,
              ease: 'power2.out',
            })
            .to('.intro-sound_button-container', {
              opacity: 1,
              duration: 0.1,
              ease: 'power4.in',
              delay: -0.1,
            });
        },
      },

      {
        name: 'WebglChapterCanvasIntro',
        to: {
          namespace: ['chapter1', 'chapter2', 'chapter3', 'chapter4', 'chapter5'],
        },
        once(data) {
          chapterAnimation.setChapterEnter(data);
          chapterAnimation.setLabels();
        },
        async enter(data) {
          await chapterAnimation.setChapterEnter(data);
          chapterAnimation.setLabels();
        },
        async beforeLeave(data) {
          await chapterAnimation.setChapterLeave(data);
          clearPageContent();
        },
      },

      {
        name: 'chapterEnter',
        from: {
          namespace: ['intro'],
        },
        to: {
          namespace: ['chapter1'],
        },
        async leave(data) {
          await gsap
            .timeline()
            .to('.intro-last', {
              opacity: 0,
              duration: 1,
              y: 20,
              ease: 'power2.out',
            })
            .to('.webgl', {
              opacity: 0,
              duration: 0.5,
              ease: 'power2.out',
            });
        },
        enter(data) {
          chapterAnimation.setChapterEnter(data);
          chapterAnimation.setLabels();
        },
      },
    ],

    views: [
      {
        namespace: 'home',
        beforeEnter(data) {
          sessionStorage.setItem('pageEnter', 'home');
          setExperience();
          experience.world.audioManager.checkAudioStateAndPlay();
        },
        beforeLeave(data) {
          const namespace = data.current.namespace;
          console.log('Cleaning up listeners before leaving the current page.');
        },
      },
      {
        namespace: 'intro',
        beforeEnter(data) {
          sessionStorage.setItem('pageEnter', 'intro');

          setExperience();
          introAnimations = new IntroAnimations();
          introAnimations.resetCamera();
          introAnimations.reinitializeAnimations();

          experience.world.audioManager.checkAudioStateAndPlay();
          experience.world.audioManager.changeAudioByKey('intro');
        },
        beforeLeave(data) {
          introAnimations.clearAnimations();
        },
      },
      {
        namespace: 'chapter1',
        beforeEnter(data) {
          sessionStorage.setItem('pageEnter', 'chapter1');
          setExperience();
          experience.world.audioManager.checkAudioStateAndPlay();
          experience.world.audioManager.changeAudioByKey('chapter1');
        },
        afterEnter(data) {
          const chapterUI = new ChapterUI(data.next.container);
          experience.world.audioManager.updateButtonState();
        },
      },
      {
        namespace: 'chapter2',
        beforeEnter(data) {
          sessionStorage.setItem('pageEnter', 'chapter2');
          setExperience();
          experience.world.audioManager.checkAudioStateAndPlay();
          experience.world.audioManager.changeAudioByKey('chapter2');
        },
        afterEnter(data) {
          const chapterUI = new ChapterUI(data.next.container);
          experience.world.audioManager.updateButtonState();
        },
      },
      {
        namespace: 'chapter3',
        beforeEnter(data) {
          sessionStorage.setItem('pageEnter', 'chapter3');
          setExperience();
          experience.world.audioManager.checkAudioStateAndPlay();
          experience.world.audioManager.changeAudioByKey('chapter3'); //Change this when file is ready in s3
        },
        afterEnter(data) {
          const chapterUI = new ChapterUI(data.next.container);
          experience.world.audioManager.updateButtonState();
        },
      },
      {
        namespace: 'chapter4',
        beforeEnter(data) {
          sessionStorage.setItem('pageEnter', 'chapter4');
          setExperience();
          experience.world.audioManager.checkAudioStateAndPlay();
          experience.world.audioManager.changeAudioByKey('chapter4'); //Change this when file is ready in s3
        },
        afterEnter(data) {
          const chapterUI = new ChapterUI(data.next.container);
          experience.world.audioManager.updateButtonState();
        },
      },
      {
        namespace: 'chapter5',
        beforeEnter(data) {
          sessionStorage.setItem('pageEnter', 'chapter5');
          setExperience();
          experience.world.audioManager.checkAudioStateAndPlay();
          experience.world.audioManager.changeAudioByKey('chapter5'); //Change this when file is ready in s3
        },
        afterEnter(data) {
          const chapterUI = new ChapterUI(data.next.container);
          experience.world.audioManager.updateButtonState();
        },
      },
    ],
  });

  barba.hooks.once((data) => {
    if (data.next.namespace === 'home') {
      gsap.set('.home-logo', { opacity: 0 });
      gsap.set('.home-cta_text', { opacity: 0 });
      gsap.set('.home-intro_enter-line', { height: 0 });
      gsap.set('.intro-sound_button-container', { opacity: 0 });
      gsap.set('.webgl', { opacity: 0 });

      gsap
        .timeline()
        .to('.home-intro', {
          opacity: 1,
        })
        .to('.home-logo', {
          opacity: 1,
          duration: 3,
          ease: 'power1.out',
        })
        .to('.home-cta_text', {
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
        })
        .to('.home-intro_enter-line', {
          height: '4vh',
          duration: 0.5,
          ease: 'power2.out',
        })
        .to('.intro-sound_button-container', {
          opacity: 1,
          duration: 0.1,
          ease: 'power4.in',
          delay: -0.1,
        });
    }

    if (data.next.namespace === 'intro') {
      gsap.set('.webgl', { opacity: 0 });
      gsap
        .timeline()

        .to('.webgl', {
          opacity: 1,
          duration: 2,
          delay: 1,
        })
        .to('.sound-container', {
          opacity: 1,
          duration: 1,
        });
    }
  });
});
