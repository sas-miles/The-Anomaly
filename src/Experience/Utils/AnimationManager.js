import { gsap } from 'gsap'

import EventEmitter from "./EventEmitter";


export default class AnimationManager extends EventEmitter{
    constructor() {

        super()

        this.animations = [];

    }

     // Add a new animation
     addAnimation(target, params, { emitEvents = false } = {}) {
        const animation = gsap.to(target, params);
    
        if (emitEvents) {
            animation.eventCallback("onStart", () => {
                this.trigger('animationStart', [{ target, params }]);
            });
    
            animation.eventCallback("onComplete", () => {
                this.trigger('animationComplete', [{ target, params }]);
            });
        }
    
        this.animations.push(animation);
        return animation;
    }
    

    // Remove an animation
    removeAnimation(animation) {
        const index = this.animations.indexOf(animation);
        if (index > -1) {
            this.animations.splice(index, 1);
            animation.kill(); // GSAP method to stop the animation
        }
    }

    // Update method to be called on each frame (if needed)
    update() {
        // Update logic for animations (if needed)
    }

    // Clean up
    dispose() {
        this.animations.forEach(animation => animation.kill());
        this.animations.length = 0;
    }
}