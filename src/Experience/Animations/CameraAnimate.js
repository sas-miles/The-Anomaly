import { gsap } from 'gsap';
import Experience from '../Experience.js'

export default class CameraAnimate{
    constructor(){
        this.experience = new Experience()
        this.camera = this.experience.camera;
    }

    IntroCamera() {
        console.log('Intro ENTER timeline')
    }

    ChapterOneCamera() {

        console.log('chapter 1 ENTER timeline')
        this.experience.eventEmitter.trigger('controls:disable');
        const chapterOneTL = gsap.timeline({
            paused: true,
            onComplete: () => {
                console.log('Controls enabled for animation');
                this.experience.eventEmitter.trigger('controls:enable');
            }
        })

        .to(this.experience.camera.instance.position, {
            x: 0, 
            y: 20, 
            z: 150,
            duration: 3,
            ease: 'power2.out',
        }, "sync1")
        .to(this.experience.camera.instance.rotation, {
            x: 0, 
            y: 0, 
            z: 0,
        }, "sync1")
 
        chapterOneTL.play()
    }

    ChapterTwoCamera(){
        console.log('chapter 2 ENTER timeline')
        this.experience.eventEmitter.trigger('controls:disable');
        const chapterTwoTL = gsap.timeline({
            paused: true,
            onComplete: () => {
                console.log('Controls enabled for animation');
                this.experience.eventEmitter.trigger('controls:enable');
            }
        })

        .to(this.experience.camera.instance.position, {
            x: 36.09, 
            y: 20, 
            z: 63.57,
            duration: 3,
            ease: 'power2.out',
        }, "=")
        .to(this.experience.camera.instance.rotation, {
            x: 0, 
            y: 0, 
            z: 0,
        }, "=")

        chapterTwoTL.play()
    }

}