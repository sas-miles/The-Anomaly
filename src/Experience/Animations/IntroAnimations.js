import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Experience from "../Experience";


export default class IntroAnimations {
    constructor() {
        this.experience = new Experience()
        this.gsap = gsap
        this.cameraPosition = this.experience.camera.instance.position
        this.cameraRotation = this.experience.camera.instance.rotation
        this.gsap.registerPlugin(ScrollTrigger);

    this.cameraPositions = [
    { x: 0, y: 100, z: 700 }, // Starting position
    { x: 0, y: 100, z: 400 },  
    { x: 0, y: 100, z: 300 }   // Ending position
    ];
        
    this.track = document.querySelector('.intro-track');
        this.setContentScroller()
        this.setCameraAnimation()
    }

    setContentScroller() {
        
    
        // Select all .intro-text elements
        const introTextElements = document.querySelectorAll(".intro-text");
    
        // Iterate over each .intro-text element
        introTextElements.forEach((element) => {
            // Create a ScrollTrigger for the pinning and the fade in animation
            ScrollTrigger.create({
                trigger: element,
                start: "center center", // Start when the center of the element hits the center of the viewport
                end: "bottom -100%", // End when the bottom of the element hits the top of the viewport
                pin: true,
                // markers: true,
                onEnter: () => this.gsap.to(element, { opacity: 1, duration: 2, ease: "power2.out", overwrite: "auto"}),
                onLeaveBack: () => this.gsap.to(element, { opacity: 0, duration: 1, ease: "power2.out", overwrite: "auto"}),
            });
    
            // Create a ScrollTrigger for the fade out animation
            ScrollTrigger.create({
                trigger: element,
                start: "center bottom", // Start when the prop1 of the element hits the prop2 of the viewport
                end: "bottom top", // End when the center of the element hits the top of the viewport
                onEnterBack: () => this.gsap.to(element, { opacity: 1, duration: 1,ease: "power2.out", overwrite: "auto" }),
                onLeave: () => this.gsap.to(element, { opacity: 0, duration: .5, ease: "power2.out", overwrite: "auto"}),
                // markers: true
            });
        });
    }

    setCameraAnimation() {
        ScrollTrigger.create({
            trigger: this.track,
            start: "top top",
            end: () => `+=${this.track.offsetHeight}px`, // Adjusted to track's full height
            scrub: true,
            onUpdate: (self) => {
                const progress = self.progress; // Progress from 0 to 1
    
                const totalSegments = this.cameraPositions.length - 1;
                const segmentProgress = progress * totalSegments;
    
                const currentSegment = Math.min(Math.floor(segmentProgress), totalSegments - 1);
                const localProgress = segmentProgress - currentSegment;
    
                const startPos = this.cameraPositions[currentSegment];
                const endPos = this.cameraPositions[currentSegment + 1];
    
                // Interpolating camera positions based on the current scroll progress
                this.cameraPosition.x = gsap.utils.interpolate(startPos.x, endPos.x, localProgress);
                this.cameraPosition.y = gsap.utils.interpolate(startPos.y, endPos.y, localProgress);
                this.cameraPosition.z = gsap.utils.interpolate(startPos.z, endPos.z, localProgress);
            },
            // markers: true
        });
    }
    

    
}