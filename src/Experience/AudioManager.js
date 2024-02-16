import gsap from "gsap";
import Experience from "./Experience";
export default class AudioManager {
    constructor() {
        this.experience = new Experience();
        this.audio = new Audio(); // Placeholder - ensure this aligns with how you're managing audio contexts.
        this.resources = this.experience.resources;
        this.resources.on('ready', () => {
            this.initAudioFiles(); // Corrected method name
          });

        this.initEvents();
        this.isPlaying = false;
      }
      
      initAudioFiles() {
        this.audioFiles = {
          'home': this.experience.resources.items.HomeAudio,
          'chapter1': this.experience.resources.items.Chapter1Audio,
          'chapter2': this.experience.resources.items.Chapter2Audio,
        };
      }

  initEvents() {
      document.querySelector('.sound-button_on').addEventListener('click', () => this.toggleAudio());
      document.querySelector('.sound-button_off').addEventListener('click', () => this.toggleAudio());
  }

  loadAudioForNamespace(namespace) {
      if (this.audioFiles[namespace]) {
          this.audio.src = this.audioFiles[namespace];
          this.audio.load();
      }
  }

  toggleAudio() {
      if (this.isPlaying) {
          this.audio.pause();
      } else {
          // Handle play promise to comply with modern browser restrictions
          const playPromise = this.audio.play();
          if (playPromise !== undefined) {
              playPromise.then(_ => {
                  // Playback started successfully
              }).catch(error => {
                  console.error('Playback failed:', error);
                  // Handle user interaction requirement for playback
              });
          }
      }
      this.isPlaying = !this.isPlaying; // Toggle the playing state
      this.updateSoundButtonState(); // Update the button visibility based on audio state
  }

  updateSoundButtonState() {
      const soundOnButton = document.querySelector('.sound-button_on');
      const soundOffButton = document.querySelector('.sound-button_off');

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
