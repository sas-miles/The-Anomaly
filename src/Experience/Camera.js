import * as THREE from 'three'

import Experience from './Experience.js'

export default class Camera{
    constructor(eventEmitter) {
        this.experience = new Experience()
        this.eventEmitter = eventEmitter;
        this.animation = this.experience.animation
        this.animationConfig = this.experience.animationConfig
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas
        this.debug = this.experience.debug

        
        //Debug
        if(this.debug.active){
            this.debugFolder = this.debug.gui.addFolder('Camera')
        }
        
        
        this.setInstance()
        this.setIntroAnimation()

        this.markerTargets = {};
        this.updateMarkerTargets();
    }

    setInstance() {

        //Camera Calculation
        const sensorSize = 36; // 36mm (full-frame)
        const focalLength = 50; // 50mm lens

        const fovRadians = 2 * Math.atan(sensorSize / (2 * focalLength));
        const fovDegrees = fovRadians * (180 / Math.PI);

        const aspectRatio = this.experience.sizes.width / this.experience.sizes.height;
        const nearPlane = 0.1;
        const farPlane = 1000;


        this.instance = new THREE.PerspectiveCamera(fovDegrees, aspectRatio, nearPlane, farPlane)
        this.scene.add(this.instance)

        //Debug
        if(this.debug.active){
            this.debugFolder.add(this.instance.position, 'x').step(0.01).min(-100).max(100).name('positionX')
            this.debugFolder.add(this.instance.position, 'y').step(0.01).min(-100).max(100).name('positionY')
            this.debugFolder.add(this.instance.position, 'z').step(0.01).min(-100).max(200).name('positionZ')


            this.debugFolder.add(this.instance.rotation, 'x').step(0.01).min(-Math.PI).max(Math.PI).name('rotationX').onChange(() => {
                this.experience.eventEmitter.trigger('camera.rotationChanged', [this.instance.rotation]);
            });

            this.debugFolder.add(this.instance.rotation, 'y').step(0.01).min(-Math.PI).max(Math.PI).name('rotationY').onChange(() => {
                this.experience.eventEmitter.trigger('camera.rotationChanged', [this.instance.rotation]);
            });

            this.debugFolder.add(this.instance.rotation, 'z').step(0.01).min(-Math.PI).max(Math.PI).name('rotationZ').onChange(() => {
                this.experience.eventEmitter.trigger('camera.rotationChanged', [this.instance.rotation]);
            });

        }
    }

    setIntroAnimation() {

        const startPosition = {
            x: 0, 
            y: 100, 
            z: 400
        }

        this.instance.position.set(startPosition.x, startPosition.y, startPosition.z)

        this.animation.addAnimation(this.instance.position, {
            duration: this.animationConfig.defaultDuration, 
            ease: this.animationConfig.defaultEase,
            x: 0, 
            y: 20, 
            z: 100
        }, 
        { emitEvents: true })

    }

    updateMarkerTargets() {
        console.log('Updating marker targets');

        this.markerTargets = {}; // Reset marker targets
        const sphereContainers = document.querySelectorAll('.sphere-container');
        sphereContainers.forEach(container => {
            const name = container.getAttribute('data-label'); // Ensure this attribute exists
            const x = parseFloat(container.getAttribute('data-X'));
            const y = parseFloat(container.getAttribute('data-Y'));
            const z = parseFloat(container.getAttribute('data-Z'));
    
            if (name) {
                this.markerTargets[name] = { position: new THREE.Vector3(x, y, z) };
            }
        });

        console.log('Marker targets updated successfully');

    }

    animateToMarker(markerName) {
        if (!this.markerTargets[markerName]) {
            console.warn(`No target set for marker ${markerName}`);
            return;
        }

        const target = this.markerTargets[markerName];

        // Animate the camera's position
        this.animation.addAnimation(this.instance.position, {
            duration: this.animationConfig.defaultDuration,
            ease: this.animationConfig.defaultEase,
            x: target.position.x,
            y: target.position.y,
            z: target.position.z
        }, { emitEvents: true });
    }

    animateToStartPosition() {
        this.setIntroAnimation();
    }
    

    resize() {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    update() {
      
    }
}