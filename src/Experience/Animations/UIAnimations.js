import { gsap } from 'gsap';
import Experience from '../Experience.js'

export default class UIAnimations{
    constructor(){
        this.experience = new Experience()
        this.camera = this.experience.camera;
    }

    IntroUI() {
        console.log('Intro ENTER timeline')
    }

    ChapterTitle() {

        console.log('UI ENTER timeline')
        
        const chapterTitle = document.querySelector('.chapter-page-title')
        console.log(chapterTitle)
        const chapterTitleTL = gsap.timeline({
            paused: true
        })

        .to(chapterTitle, {
            y: 10, 
            opacity: 0,
            duration: 2,
            ease: 'power2.out',
        })
        .to(chapterTitle, {
            y: 0, 
            opacity: 1,
            duration: 2,
            ease: 'power2.out',
        })
 
        chapterTitleTL.play()
    }

    

}