import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default class IntroAnimations {
    constructor(experience) {
        this.cameraPosition = experience.camera.instance.position
        this.cameraRotation = experience.camera.instance.rotation
        console.log(this.cameraPosition, this.cameraRotation)
        gsap.registerPlugin(ScrollTrigger);

        this.cameraPositions = [
            { x: 0, y: 100, z: 400 }, // Starting position
            { x: -10, y: 40, z: 90 },  
            { x: 0, y: 100, z: 400 }   // Ending position
        ];

        this.setContentScroller()
        this.setCameraAnimation()
    }

    setContentScroller() {
            const trackHeight = document.querySelector('.intro-track').offsetHeight
            const containers = document.querySelectorAll(".intro-content_container")
            const numPoints = this.cameraPositions.length - 1; // Number of segments
        
        
            gsap.fromTo(".intro-content_container:first-child", 
                { opacity: 0, y: 20, ease: "power2.out" }, // Starting state
                { opacity: 1, duration: 1 } // Ending state and duration of the animation
            )


            containers.forEach((container, index) => {
            const portionHeight = trackHeight / containers.length;

            if (index === 0) { // Special handling for the first container
            gsap.timeline({
                scrollTrigger: {
                trigger: container,
                start: "bottom bottom",
                end: () => "+=" + portionHeight,
                scrub: true,
                onEnterBack: () => gsap.to(container, { opacity: 1 }),
                onLeave: () => gsap.to(container, { opacity: 0 })
                }
            });
            } else {
            gsap.timeline({
                scrollTrigger: {
                trigger: ".intro-track",
                start: () => (portionHeight * index) + "px",
                end: () => (portionHeight * (index + 1)) + "px",
                scrub: true,
                onEnter: () => gsap.to(container, { opacity: 1 }),
                onLeave: () => gsap.to(container, { opacity: 0 }),
                onEnterBack: () => gsap.to(container, { opacity: 1 }),
                onLeaveBack: () => gsap.to(container, { opacity: 0 })
                }

            })
            }
        })
    }

    setCameraAnimation() {
    
        // Define the trigger element and the total scrollable height
        const track = document.querySelector('.intro-track');

        const updateEnd = () => {
            const trackHeight = track.offsetHeight - window.innerHeight;
            return "+=" + trackHeight.toString();
        };

        if (!track) {
            console.error('Track element not found');
            return;
        }
        const trackHeight = track.offsetHeight - window.innerHeight;
    
        // Create a ScrollTrigger instance for the entire scroll duration
        ScrollTrigger.create({
            trigger: track,
            start: "top top",
            end: "+=" + trackHeight,
            scrub: true,
            onUpdate: (self) => {
                // Calculate the current progress of the scroll
                const progress = self.progress; // Progress: 0 (start) to 1 (end)
    
                // Determine the total number of segments based on the cameraPositions length
                const totalSegments = this.cameraPositions.length - 1;
                const segmentProgress = progress * totalSegments;
    
                // Determine the current segment and the progress within that segment
                const currentSegment = Math.min(Math.floor(segmentProgress), totalSegments - 1);
                const localProgress = segmentProgress - currentSegment;
    
                // Calculate the interpolated camera positions
                const startPos = this.cameraPositions[currentSegment];
                const endPos = this.cameraPositions[currentSegment + 1];
                this.cameraPosition.x = gsap.utils.interpolate(startPos.x, endPos.x, localProgress);
                this.cameraPosition.y = gsap.utils.interpolate(startPos.y, endPos.y, localProgress);
                this.cameraPosition.z = gsap.utils.interpolate(startPos.z, endPos.z, localProgress);
            }
        });
    }
    


    
}