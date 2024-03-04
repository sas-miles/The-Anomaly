import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Experience from '../Experience';

export default class IntroAnimations {
  constructor() {
    this.experience = new Experience();
    this.gsap = gsap;
    this.cameraPosition = this.experience.camera.instance.position;
    this.cameraRotation = this.experience.camera.instance.rotation;
    this.gsap.registerPlugin(ScrollTrigger);

    this.cameraAnimationTrigger = null;

    this.cameraPositions = [
      { x: 0, y: 100, z: 700 }, // Starting position
      { x: 0, y: 100, z: 400 },
      { x: 0, y: 100, z: 300 }, // Ending position
    ];

    this.track = document.querySelectorAll('.intro-track');
    this.introWrapper = document.querySelector('.intro-wrapper');
    this.canvas = document.querySelector('.webgl');
  }

  setContentScroller() {
    this.track.forEach((track, index) => {
      let introItem = track.querySelector('.intro-item');

      // Fade out the intro-item a bit before the intro-sticky reaches the end of intro-track
      ScrollTrigger.create({
        trigger: track,
        start: 'top -50%',
        end: 'bottom 200%', // Adjust this to control when the fade-out starts
        onEnter: () => gsap.to(introItem, { autoAlpha: 1, duration: 0.5 }),
        onLeave: () => gsap.to(introItem, { autoAlpha: 0, duration: 0.5 }), // Fades out before the end
        onEnterBack: () => gsap.to(introItem, { autoAlpha: 1, duration: 0.5 }),
        onLeaveBack: () => gsap.to(introItem, { autoAlpha: 0, duration: 0.5 }),
        // markers: true, // For debugging, remove in production
        // scrub: true,
      });
    });
  }

  setCameraAnimation() {
    this.experience.eventEmitter.trigger('controls:disable');
    this.cameraPosition.set(0, 100, 700); // Set the initial camera position
    this.canvas.style.opacity = 1;
    this.cameraAnimationTrigger = ScrollTrigger.create({
      trigger: this.introWrapper,
      start: 'top top',
      end: () => `+=${this.introWrapper.offsetHeight}px`, // Adjusted to introWrapper's full height
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress; // Progress from 0 to 1

        const totalSegments = this.cameraPositions.length - 1;
        const segmentProgress = progress * totalSegments;

        const currentSegment = Math.min(Math.floor(segmentProgress), totalSegments - 1);
        const localProgress = segmentProgress - currentSegment;

        const startPos = this.cameraPositions[currentSegment];
        const endPos = this.cameraPositions[currentSegment + 1];

        // Calculate the new camera positions
        const newX = gsap.utils.interpolate(startPos.x, endPos.x, localProgress);
        const newY = gsap.utils.interpolate(startPos.y, endPos.y, localProgress);
        const newZ = gsap.utils.interpolate(startPos.z, endPos.z, localProgress);

        // Animate the camera position over time
        gsap.to(this.cameraPosition, {
          x: newX,
          y: newY,
          z: newZ,
          duration: 1, // Adjust this to control the speed of the damping effect
          overwrite: 'auto',
        });
      },
      // markers: true
    });
  }

  // Add this method to clear the animations
  clearAnimations() {
    if (this.cameraAnimationTrigger) {
      this.cameraAnimationTrigger.kill();
      this.cameraAnimationTrigger = null;
    }
  }

  resetCamera() {
    this.cameraPosition.set(0, 100, 700); // Set the initial camera position
    this.cameraRotation.set(0, 0, 0); // Set the initial camera rotation
  }

  reinitializeAnimations() {
    this.resetCamera();
    this.setContentScroller();
    this.setCameraAnimation();
    console.log('Reinitialized');
  }
}
