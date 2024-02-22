import gsap from "gsap";
import barba from "@barba/core";
import * as THREE from "three";
import Experience from "../Experience";
export default class AudioManager {
    constructor() {
        this.experience = new Experience();
        this.resources = this.experience.resources;
        this.camera = this.experience.camera.instance;
        this.audioLoader = new THREE.AudioLoader();

        this.soundEnabled = true

        this.audioFiles = {
            'home': this.experience.resources.items.IntroAudio,
            'intro': this.experience.resources.items.IntroAudio,
            'chapter1': this.experience.resources.items.Chapter1Audio,
            'chapter2': this.experience.resources.items.Chapter2Audio,
        };

        
        this.isPlaying = false;
        this.currentSound = null;

        this.bindButtonEvents()

        this.initBarbaHooks();

        
    }

    initBarbaHooks() {
        console.log('initBarbaHooks called');
        barba.hooks.afterEnter((data) => {
            this.bindButtonEvents();
            // Optionally, also check and update the button visibility state here
            this.updateButtonVisibility();
        });
    }

    setCurrentNamespace(namespace) {
        this.currentNamespace = namespace;
    }

    bindButtonEvents() {
    // This method should be safe to call multiple times
    const playButton = document.querySelector('.play-sound');
    const stopButton = document.querySelector('.stop-sound');

    // Clear existing listeners to avoid duplicates
    playButton?.removeEventListener('click', this.handlePlayClick);
    stopButton?.removeEventListener('click', this.handleStopClick);

    // Bind listeners
    this.handlePlayClick = () => this.updateGlobalSoundState(true); // Assuming this method starts playing
    this.handleStopClick = () => this.updateGlobalSoundState(false); // Assuming this method stops playing

    playButton?.addEventListener('click', this.handlePlayClick);
    stopButton?.addEventListener('click', this.handleStopClick);
  }

    
    

      updateGlobalSoundState() {
        console.log('updateGlobalSoundState called');
    
        // Update UI buttons first based on soundEnabled state
        const playButton = document.querySelector('.play-sound');
        const stopButton = document.querySelector('.stop-sound');
    
        if (this.soundEnabled) {
            // Sound is enabled
            if (playButton) playButton.style.display = 'none';
            if (stopButton) stopButton.style.display = 'block';
            // Check if there's a sound already playing, if not, attempt to play the currentNamespace sound
            if (!this.isPlaying && this.currentNamespace) {
                console.log('Attempting to play sound for namespace', this.currentNamespace);
                this.playSound(this.currentNamespace);
            }
        } else {
            // Sound is disabled
            if (playButton) playButton.style.display = 'block';
            if (stopButton) stopButton.style.display = 'none';
            if (this.currentSound && this.isPlaying) {
                // Stop the current sound if it's playing
                this.currentSound.stop();
                this.isPlaying = false;
                this.currentSound = null;
            }
        }
    }
    
    playSound(namespace) {
        // Immediately update UI to reflect action intention
        this.updateSoundButtonState(true); // Assume playing
        if (!this.soundEnabled) return;
    
        const sound = this.audioFiles[namespace];
        if (sound) {
            if (this.currentSound) {
                this.currentSound.stop();
            }
            sound.play();
            this.isPlaying = true;
            this.currentSound = sound;
            this.currentNamespace = namespace;
        } else {
            // If sound not found or failed to play, revert UI state
            this.updateSoundButtonState(false);
        }
    }
    
    stopSound() {
        if (this.currentSound) {
            this.currentSound.stop();
        }
        this.isPlaying = false;
        this.currentSound = null;
        this.updateSoundButtonState(); // Reflect this change immediately in UI
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

    updateButtonVisibility() {
        console.log('updateButtonVisibility called');
        const isPlaying = this.isPlaying;
        const playButton = document.querySelector('.play-sound');
        const stopButton = document.querySelector('.stop-sound');
    
        if (playButton && stopButton) {
            playButton.style.display = isPlaying ? 'none' : 'block';
            stopButton.style.display = isPlaying ? 'block' : 'none';
        }
    }
    
    updateSoundButtonState(isPlaying = this.isPlaying) {
        const playButton = document.querySelector('.play-sound');
        const stopButton = document.querySelector('.stop-sound');
    
        if (isPlaying) {
            playButton.style.display = 'none';
            stopButton.style.display = 'block';
        } else {
            playButton.style.display = 'block';
            stopButton.style.display = 'none';
        }
    }
    
    
}
