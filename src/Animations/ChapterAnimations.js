import { gsap } from 'gsap';
export default class ChapterAnimations {
    constructor() {
        this.gsap = gsap;
    }

    setChapterEnter (data){
        gsap.timeline({ease: "power2.out"})
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
        x: 0,
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
    }

    async setChapterLeave(data){
       
       await gsap.timeline({ ease: "power2.out",})
        .to(".webgl", {
            opacity: 0, 
            duration: 2,
        }, "sync1")
        .to(data.current.container.querySelectorAll('.main-content_container'), {
            opacity: 0,
            x: -20,
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
        .to(data.current.container.querySelectorAll('.chapter-page-title'), {
            opacity: 0,
            y: 20,
            duration: 1
        }, "sync1")
        
       
    }
}