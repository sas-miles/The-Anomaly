import { gsap } from 'gsap';
export default class ChapterAnimations {
    constructor() {
        this.gsap = gsap;
    }

    async setChapterEnter (data){
     await gsap.timeline({ease: "power2.out"})
        .to(data.next.container.querySelectorAll('.chapter-page-title'), {
            opacity: 1,
            y: 0,
            delay: 1,
            duration: 1
        }, "sync1")
        .to(".webgl", {
        opacity: 1, 
        duration: 2,
        delay: 1,
        },  "sync1")
        .to(data.next.container.querySelectorAll('.main-content_container'), {
        opacity: 1,
        duration: 1
        }, "sync2")
        .to(data.next.container.querySelectorAll('.main-content-tab'), {
        opacity: 1,
        duration: 1
        }, "sync2")
        .to(data.next.container.querySelectorAll('.chapters-nav_list-layout'), {
            opacity: 1,
            duration: 1
        }, "sync2")
        .to('.sound-container', {
            opacity: 1,
            duration: 1
        }, "sync2")
    }

    async setChapterLeave(data){
       
       await gsap.timeline({ ease: "power2.out",})
        .to(".webgl", {
            opacity: 0,
            duration: 2,
            ease: "power2.out", 
        }, "sync1")
        .to(data.current.container.querySelectorAll('.main-content_container'), {
            opacity: 0,
            duration: 1
        }, "sync1")
        .to(data.current.container.querySelectorAll('.main-content-tab'), {
            opacity: 0,
            duration: 1
        }, "sync1")
        .to(data.current.container.querySelectorAll('.chapters-nav_list-layout'), {
            opacity: 0,
            duration: 1
        }, "sync1")
        .to('.sound-container', {
            opacity: 0,
            duration: 1
        }, "sync1")
        .to(data.current.container.querySelectorAll('.chapter-page-title'), {
            opacity: 0,
            y: 20,
            duration: 1
        }, "sync1")
        .to('.label-marker-heading', {
            opacity: 0,
            duration: 1,
        }, "sync1")
        .to('.label-container',{
            opacity: 0,
            duration: 1,
            ease: 'power2.out', 
        }, "sync1")
       
    }

   setLabels() {
        console.log('Setting labels...')
        gsap.set('.label-container', {
            opacity: 0,
        })
        gsap.set('.label-marker-heading', {
            opacity: 0,
            
        })
        gsap.timeline({delay: 2})
        .to('.label-container',{
            opacity: 1,
            duration: 1,
            ease: 'power2.out', 
        }, "sync1")
        .to('.label-marker-heading', {
            opacity: 1,
            duration: 1
        }, "sync1")
            
    }
}