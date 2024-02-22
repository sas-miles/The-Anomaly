import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default class IntroAnimations {
    constructor(experience) {
        window.scrollTo(0, 0);
        this.cameraPosition = experience.camera.instance.position
        this.cameraRotation = experience.camera.instance.rotation
        console.log(this.cameraPosition, this.cameraRotation)
        gsap.registerPlugin(ScrollTrigger);

        

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
          
        console.log('scroll animation here...')
        
       
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