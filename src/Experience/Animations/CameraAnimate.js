import { gsap } from 'gsap';
import Experience from '../Experience.js';

export default class CameraAnimate {
  constructor() {
    this.experience = new Experience();
    this.camera = this.experience.camera;
  }

  ChapterOneCamera() {
    this.experience.eventEmitter.trigger('controls:disable');
    const chapterOneTL = gsap
      .timeline({
        paused: true,
        onComplete: () => {
          // console.log('Controls enabled for animation');
          this.experience.eventEmitter.trigger('controls:enable');
        },
      })

      .to(
        this.experience.camera.instance.position,
        {
          x: 0,
          y: 20,
          z: 150,
          duration: 4,
          ease: 'power2.out',
        },
        'sync1'
      )
      .to(
        this.experience.camera.instance.rotation,
        {
          x: 0,
          y: 0,
          z: 0,
        },
        'sync1'
      );

    chapterOneTL.play();
  }

  ChapterTwoCamera() {
    this.experience.eventEmitter.trigger('controls:disable');
    const chapterTwoTL = gsap
      .timeline({
        paused: true,
        onComplete: () => {
          this.experience.eventEmitter.trigger('controls:enable');
          this.experience.controls.currentRotationY = this.experience.camera.instance.rotation.y;
        },
      })
      .to(
        this.experience.camera.instance.position,
        {
          x: -100,
          y: 18.87,
          z: 83.72,
          duration: 3,
          ease: 'power2.out',
        },
        'sync1'
      )
      .to(
        this.experience.camera.instance.rotation,
        {
          x: 0,
          y: Math.PI / -4, // 45 degrees in radians
          z: 0,
        },
        'sync1'
      );

    chapterTwoTL.play();
  }

  ChapterThreeCamera() {
    this.experience.eventEmitter.trigger('controls:disable');
    const chapterThreeTL = gsap
      .timeline({
        paused: true,
        onComplete: () => {
          // console.log('Controls enabled for animation');
          this.experience.eventEmitter.trigger('controls:enable');
        },
      })

      .to(
        this.experience.camera.instance.position,
        {
          x: 0,
          y: 20,
          z: 200,
          duration: 3,
          ease: 'power2.out',
        },
        'sync1'
      )
      .to(
        this.experience.camera.instance.rotation,
        {
          x: 0,
          y: 0,
          z: 0,
        },
        'sync1'
      );

    chapterThreeTL.play();
  }

  ChapterFourCamera() {
    this.experience.eventEmitter.trigger('controls:disable');
    const chapterFourTL = gsap
      .timeline({
        paused: true,
        onComplete: () => {
          this.experience.eventEmitter.trigger('controls:enable');
          this.experience.controls.currentRotationY = this.experience.camera.instance.rotation.y;
        },
      })

      .to(
        this.experience.camera.instance.position,
        {
          x: 100,
          y: 18.88,
          z: 32.15,
          duration: 3,
          ease: 'power2.out',
        },
        'sync1'
      )

      .to(
        this.experience.camera.instance.rotation,
        {
          x: 0,
          y: Math.PI / 3,
          z: 0,
          duration: 2,
        },
        'sync1'
      );

    chapterFourTL.play();
  }

  ChapterFiveCamera() {
    this.experience.eventEmitter.trigger('controls:disable');
    const chapterFiveTL = gsap
      .timeline({
        paused: true,
        onComplete: () => {
          // console.log('Controls enabled for animation');
          this.experience.eventEmitter.trigger('controls:enable');
        },
      })

      .to(
        this.experience.camera.instance.position,
        {
          x: 0,
          y: 20,
          z: 300,
          duration: 3,
          ease: 'power2.out',
        },
        'sync1'
      )
      .to(
        this.experience.camera.instance.rotation,
        {
          x: 0,
          y: 0,
          z: 0,
        },
        'sync1'
      );

    chapterFiveTL.play();
  }
}
