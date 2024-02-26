import * as THREE from "three";
import Experience from "../Experience";
export default class AudioManager {
    constructor() {
        this.experience = new Experience();
        this.resources = this.experience.resources;
        this.camera = this.experience.camera.instance;
        this.soundEnabled = false;
        this.isPlaying = false;
        this.lastAudioKey = null; // Add this line


        this.audioFiles = {
            'home': this.experience.resources.items.HomeAudio,
            'intro': this.experience.resources.items.IntroAudio,
            'chapter1': this.experience.resources.items.Chapter1Audio,
            'chapter2': this.experience.resources.items.Chapter2Audio,
            'chapter3': this.experience.resources.items.Chapter1Audio,
            'chapter4': this.experience.resources.items.Chapter2Audio,
            'chapter5': this.experience.resources.items.Chapter1Audio,
        };

        

        this.setupEventDelegation()
        this.setAudioFromSession();
        this.checkAudioStateAndPlay()

        
    }

    checkAudioStateAndPlay() {
        const soundState = sessionStorage.getItem('soundState');
        if(soundState === 'playing') {
            this.playSound();
            this.updateButtonState();
        } else if(soundState === 'stopped') {
            this.updateButtonState();
            // Optionally handle stopped state explicitly, if needed
        }
        
    }

    enableSound() {
        this.soundEnabled = true;
    }


    setupEventDelegation() {
        document.addEventListener('click', (event) => {
    
            // Don't follow the link
            event.preventDefault();
    
            // Call the appropriate function
            if (event.target.matches('.play-sound')) {
                this.enableSound();
                console.log('Play sound clicked');
                this.playSound()
            } else if (event.target.matches('.stop-sound')) {
               this.stopSound()
            }
        }, false);
    }

    setAudioFromSession() {
        this.pageEnter = sessionStorage.getItem('pageEnter')
    
        switch (this.pageEnter)
        {
            case 'intro':
                this.setAudio('intro');
                break;
    
            case 'chapter1':
                this.setAudio('chapter1');
                break;
    
            case 'chapter2':
                this.setAudio('chapter2');
                break;
    
            case 'chapter3':
                this.setAudio('chapter3');
                break;
    
            case 'chapter4':
                this.setAudio('chapter4');
                break;
    
            case 'chapter5':
                this.setAudio('chapter5');
                break;
        }
    }
    
    setAudio(audioKey) {
        // Access the audio resource through the audioFiles mapping
        const audioResource = this.audioFiles[audioKey];
        
        if (!audioResource) {
            console.log(`Audio key '${audioKey}' not found in audioFiles or is undefined.`);
            return;
        }
        
        // Assign the retrieved audio resource to currentSound
        this.currentSound = audioResource;
        console.log(`Audio set for key '${audioKey}':`, this.currentSound);
    }


    playSound() {
        // Set the audio based on session before attempting to play
        this.setAudioFromSession();
    
        console.log('Current Sound:', this.currentSound);
        if (!this.soundEnabled || this.isPlaying || !this.currentSound) {
            return;
        }
    
        // Play the audio
        this.currentSound.play();
    
        this.isPlaying = true;
        this.updateButtonState();
        console.log('Play Method: Play sound clicked');
        sessionStorage.setItem('soundState', 'playing');
    }

    stopSound() {
        // Log the attempt to stop all sounds
        console.log('Attempting to stop all sounds');
    
        // Iterate over all audio keys in the audioFiles object
        Object.keys(this.audioFiles).forEach((key) => {
            const audio = this.audioFiles[key];
            if (audio && typeof audio.stop === 'function') {
                // Stop the audio if it has a stop method
                audio.stop();
                console.log(`Stopped sound for key: ${key}`);
            }
        });
    
        // After stopping all sounds, update the state accordingly
        this.isPlaying = false;
        this.currentSound = null; // Consider if you need to reset this
        sessionStorage.setItem('soundState', 'stopped'); // Optionally update session storage
        this.updateButtonState(); // Update the button state to reflect changes
    }
    

    updateButtonState() {
        // Re-query the elements to ensure fresh references
        const playButton = document.querySelector('.play-sound.sound-button_on');
        const stopButton = document.querySelector('.stop-sound.sound-button_off');
    
        // Check if elements exist before attempting to update state
        if (playButton && stopButton) {
            if (this.isPlaying) {
                playButton.style.display = 'none';
                stopButton.style.display = 'block';
            } else {
                playButton.style.display = 'block';
                stopButton.style.display = 'none';
            }
        } else {
            console.log('Button elements not found, may need to re-query or the page does not contain audio controls.');
        }
    }
    
    
}
