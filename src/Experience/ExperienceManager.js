import Experience from './Experience.js'

import planeVertexShader1 from './shaders/plane/1/vertex.glsl'
import planeFragmentShader1 from './shaders/plane/1/fragment.glsl'
import planeVertexShader2 from './shaders/plane/2/vertex.glsl'
import planeFragmentShader2 from './shaders/plane/2/fragment.glsl'


export default class ExperienceManager{

    constructor(anomaly){
        this.experience = new Experience();
        this.anomaly = this.experience.world.anomaly;
        this.plane = this.experience.world.plane;
        
        this.chapters = [
            {
                anomalyParams: { 
                    count: 262500,
                    size: 69.269,
                    radius: 11.495,
                    branches: 0.328,
                    spin: 1,
                    randomness: 0.599,
                    randomnessPower: 6.46,
                    insideColor: '#ffc994',
                    outsideColor: '#373c81',
                    offsetX: -10,
                    offsetY: 18.224,
                    offsetZ: 0,
                },

                planeShaders: {
                    vertexShader: planeVertexShader1, 
                    fragmentShader: planeFragmentShader1, 
                },
                
            },

            {
                anomalyParams: { 
                    count: 709620,
                    size: 88.938,
                    radius: 30,
                    branches: 10,
                    spin: 1,
                    randomness: 0.451,
                    randomnessPower: 3.695,
                    insideColor: '#e5ad76',
                    outsideColor: '#9ba2d9',
                    offsetX: -10,
                    offsetY: 20,
                    offsetZ: 0,
                },
                planeShaders: {
                    vertexShader: planeVertexShader2, 
                    fragmentShader: planeFragmentShader2, 
                },
                
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
                planeShaders: {
                    vertexShader: planeVertexShader2, 
                    fragmentShader: planeFragmentShader2, 
                },
                
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
                    button.classList.add('is-current');
                    this.currentButton = button;
                }

                button.addEventListener('click', () => {
                    console.log(`Chapter ${index + 1} button clicked`);

                    // Remove 'is-current' class from the previous button
                    if (this.currentButton) {
                        this.currentButton.classList.remove('is-current');
                    }

                    // Add 'is-current' class to the clicked button
                    button.classList.add('is-current');

                    // Update the reference to the current button
                    this.currentButton = button;

                    // Set the chapter
                    this.setChapter(index);
                });
            } else {
                console.warn(`Button with ID '${buttonId}' was not found.`);
            }
        });
    }
    
    determineChapterIndexFromURL() {
        const url = window.location.pathname; // Get the current URL path
        const chapterPattern = /the-anomaly-experience-chapter-(\d+)/; // Regex to extract chapter number
        const match = url.match(chapterPattern);
    
        if (match && match[1]) {
            const chapterIndex = parseInt(match[1], 10) - 1; // Convert to 0-based index
            return chapterIndex >= 0 ? chapterIndex : 0; // Ensure the index is not negative
        }
    
        return 0; // Default to the first chapter if no chapter number found in URL
    }
    

    setChapter(index) {
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
    
    updateButtonState(index) {
        // Remove 'is-current' class from the previous button
        if (this.currentButton) {
            this.currentButton.classList.remove('is-current');
        }
    
        // Find the new current button and add 'is-current' class
        const newButtonId = `chapter${index + 1}`;
        const newButton = document.getElementById(newButtonId);
        if (newButton) {
            newButton.classList.add('is-current');
            this.currentButton = newButton;
        }
    }

}