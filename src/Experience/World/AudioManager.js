import gsap from "gsap";
import * as THREE from "three";
import Experience from "../Experience";
export default class AudioManager {
    constructor() {
        console.log("AudioManager initialized");
        this.experience = new Experience();
        this.resources = this.experience.resources;
        this.camera = this.experience.camera.instance;
        this.audioLoader = new THREE.AudioLoader();

        this.isPlaying = false;
        this.currentSound = null;
        this.soundEnabled = true; // Sound is enabled by default

        this.audioFiles = {
            'home': this.experience.resources.items.IntroAudio,
            'intro': this.experience.resources.items.IntroAudio,
            'chapter1': this.experience.resources.items.Chapter1Audio,
            'chapter2': this.experience.resources.items.Chapter2Audio,
        };

        this.initEvents();
    }

    initEvents() {
        // Attach the event listener to the body
        document.body.addEventListener('click', (event) => {
            // Check if the clicked element is the play button
            if (event.target.classList.contains('play-sound')) {
                // Logic to handle play button click
                const namespace = this.currentNamespace || 'home'; // Adjust based on your logic
                this.playSound(namespace);
            } 
            // Check if the clicked element is the stop button
            else if (event.target.classList.contains('stop-sound')) {
                // Logic to handle stop button click
                if (this.currentSound) {
                    this.stopSound(this.currentNamespace); // Adjust based on your implementation
                }
            }
        });
    }

    updateGlobalSoundState() {
        if (!this.soundEnabled && this.currentSound) {
            // If sound is currently playing, stop it
            this.currentSound.stop();
            this.isPlaying = false;
        } else if (this.soundEnabled && this.currentNamespace) {
            // Optionally, resume playback for the current namespace if sound is re-enabled
            this.playSound(this.currentNamespace);
        }
        this.updateSoundButtonState(); // Reflect the change in UI
    }

    playSound(namespace) {
        if (!this.soundEnabled) return; // Do not play if sound is globally disabled

        const sound = this.audioFiles[namespace];
        if (sound) {
            if (this.currentSound) {
                this.currentSound.stop(); // Stop currently playing sound
            }
            sound.play(); // Start the new sound
            this.isPlaying = true;
            this.currentSound = sound;
            this.currentNamespace = namespace; // Track the current namespace
        }
    }

    transitionAudio(newNamespace) {
        console.log(`Transitioning audio for namespace: ${newNamespace}`);
        const newSound = this.audioFiles[newNamespace];
        if (newSound) {
            // If there is a currently playing sound, stop it
            if (this.currentSound) {
                this.currentSound.stop();
            }
    
            // If sound is enabled, start the new sound
            if (this.soundEnabled) {
                newSound.play();
                this.isPlaying = true;
                this.currentSound = newSound;
            } else {
                this.isPlaying = false;
                this.currentSound = null;
            }
        }
        this.updateSoundButtonState(); // Update button visibility based on audio state
    }

    updateSoundButtonState() {
        console.log(`Updating sound button state, isPlaying: ${this.isPlaying}`);

        const soundOnButton = document.body.querySelector('.play-sound.sound-button_on');
        const soundOffButton = document.body.querySelector('.stop-sound.sound-button_off');
    
        // Use gsap to animate the visibility of sound buttons based on the isPlaying state
        gsap.to(this.isPlaying ? soundOnButton : soundOffButton, {
            opacity: 0,
            onComplete: () => {
                (this.isPlaying ? soundOnButton : soundOffButton).style.display = 'none';
                (this.isPlaying ? soundOffButton : soundOnButton).style.display = 'block';
                gsap.to(this.isPlaying ? soundOffButton : soundOnButton, { opacity: 1 });
            },
        });
    }
    
}
