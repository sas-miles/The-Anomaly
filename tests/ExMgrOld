import { gsap } from 'gsap';

import Experience from './Experience.js'

import planeVertexShader1 from './shaders/plane/1/vertex.glsl'
import planeFragmentShader1 from './shaders/plane/1/fragment.glsl'
import planeVertexShader2 from './shaders/plane/2/vertex.glsl'
import planeFragmentShader2 from './shaders/plane/2/fragment.glsl'
import galaxyVertexShader from './shaders/anomaly/galaxy/vertex.glsl'
import galaxyFragmentShader from './shaders/anomaly/galaxy/fragment.glsl'
import wormholeVertexShader from './shaders/anomaly/wormhole/vertex.glsl'
import wormholeFragmentShader from './shaders/anomaly/wormhole/fragment.glsl'



export default class ExperienceManager{

    constructor(anomaly){
        this.experience = new Experience();
        this.anomaly = this.experience.world.anomaly;
        this.plane = this.experience.world.plane;
        
        this.chapters = [
            {
                anomalyParams: { 
                    count: 619000,
                    size: 53,
                    radius: 14,
                    branches: 8,
                    spin: 2,
                    randomness: 2,
                    randomnessPower:3,
                    insideColor: '#ffc994',
                    outsideColor: '#373c81',
                    offsetX: 16,
                    offsetY: 50,
                    offsetZ: 0,
                    vertexShader: galaxyVertexShader,
                    fragmentShader: galaxyFragmentShader
                },

                // planeShaders: {
                //    vertexShader: planeVertexShader1,
                //    fragmentShader: planeFragmentShader1,
                // },
                
            },

            {
                anomalyParams: { 
                    count: 410000,
                    size: 13,
                    radius: 30,
                    branches: 13,
                    spin: 1,
                    randomness: 0.476,
                    randomnessPower: 4.579,
                    insideColor: '#e5ad76',
                    outsideColor: '#9ba2d9',
                    offsetX: 4,
                    offsetY: 30,
                    offsetZ: 40,
                    vertexShader: wormholeVertexShader,
                    fragmentShader: wormholeFragmentShader
                    
                },
                // planeShaders: {
                //     vertexShader: planeVertexShader2, 
                //     fragmentShader: planeFragmentShader2, 
                // },
                
            },

            {
                anomalyParams: { 
                    count: 225700,
                    size: 55.748,
                    radius: 6.578,
                    branches: 7,
                    spin: 1,
                    randomness: 0.033,
                    randomnessPower: 10,
                    insideColor: '#e5ad76',
                    outsideColor: '#9ba2d9',
                    offsetX: 1.322,
                    offsetY: 8.759,
                    offsetZ: 40,
                },
                // planeShaders: {
                //     vertexShader: planeVertexShader2, 
                //     fragmentShader: planeFragmentShader2, 
                // },
                
            },
        ];

        const chapterIndex = this.determineChapterIndexFromURL();
        this.setChapter(chapterIndex);

        this.currentButton = null;
        this.setupChapterButtons();

    }

    setupChapterButtons() {
        this.chapters.forEach((_, index) => {
            const buttonId = `chapter${index + 1}`;
            const button = document.getElementById(buttonId);
    
            if (button) {
                // Initialize the first button as the current button
                if (index === 0) {
                    button.classList.add('is-active');
                    this.currentButton = button;
                }
    
                const handleButtonClick = () => {
                    console.log(`Chapter ${index + 1} button clicked`);
    
                    // Remove 'is-active' class from the previous button
                    if (this.currentButton) {
                        this.currentButton.classList.remove('is-active');
                    }
    
                    // Add 'is-active' class to the clicked button
                    button.classList.add('is-active');
    
                    // Update the reference to the current button
                    this.currentButton = button;
    
                    // Set the chapter
                    this.setChapter(index);
                };
    
                // Handle click events (mouse and touch)
                button.addEventListener('click', handleButtonClick);
    
                // Optionally handle touchstart or touchend events for better mobile support
                button.addEventListener('touchend', handleButtonClick);
            } else {
                console.warn(`Button with ID '${buttonId}' was not found.`);
            }
        });
    }
    
    
    determineChapterIndexFromURL() {
        const url = window.location.pathname; // Get the current URL path
        const chapterPattern = /chapter-(\d+)/; // Regex to extract chapter number
        const match = url.match(chapterPattern);
    
        if (match && match[1]) {
            const chapterIndex = parseInt(match[1], 10) - 1; // Convert to 0-based index
            return chapterIndex >= 0 ? chapterIndex : 0; // Ensure the index is not negative
        }
    
        return 0; // Default to the first chapter if no chapter number found in URL
    }
    

    setChapter(index) {
        // Create a timeline
        let tl = gsap.timeline();
    
        // Fade out the current content
        tl.to(this.experience.canvas, {
            duration: .5, // Duration of the fade out
            opacity: 0,
            ease: 'power2.inOut',
            onComplete: () => {
                // Change the chapter
                const chapter = this.chapters[index];
                if (chapter.anomalyParams) {
                    this.anomaly.updateParameters(chapter.anomalyParams);
                }
                if (chapter.planeShaders) {
                    this.plane.updateShader(chapter.planeShaders.vertexShader, chapter.planeShaders.fragmentShader);
                }
    
                // Update button state
                this.updateButtonState(index);
            }
        });
    
        // Fade the content back in
        tl.to(this.experience.canvas, {
            duration: 0.5, // Duration of the fade in
            opacity: 1,
            delay: 0.5 // Add a delay here if needed to wait for chapter content to be ready
        });
    }
    
    
    updateButtonState(index) {
        // Remove 'is-active' class from the previous button
        if (this.currentButton) {
            this.currentButton.classList.remove('is-active');
        }
    
        // Find the new current button and add 'is-active' class
        const newButtonId = `chapter${index + 1}`;
        const newButton = document.getElementById(newButtonId);
        if (newButton) {
            newButton.classList.add('is-active');
            this.currentButton = newButton;
        }
    }

}