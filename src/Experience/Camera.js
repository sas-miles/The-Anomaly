import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import Experience from './Experience.js'

export default class Camera{
    constructor() {
        this.experience = new Experience()
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

        this.markerTargets = {
            'sphere1': { position: new THREE.Vector3(10, 5, 10), lookAt: new THREE.Vector3(0, 4, 0) },
            'sphere2': { position: new THREE.Vector3(-25, 5, -9), lookAt: new THREE.Vector3(-20, 2, -4) },
        };
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
            y: 200, 
            z: 600
        }

        this.instance.position.set(startPosition.x, startPosition.y, startPosition.z)

        this.animation.addAnimation(this.instance.position, {
            duration: this.animationConfig.defaultDuration, 
            ease: this.animationConfig.defaultEase,
            x: 0, 
            y: 15, 
            z: 200
        }, 
        { emitEvents: true })

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
    

    resize() {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    update() {
      
    }
}