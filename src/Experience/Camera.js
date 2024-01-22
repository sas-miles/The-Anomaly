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
    }

    setInstance() {
        this.instance = new THREE.PerspectiveCamera(75, this.sizes.width / this.sizes.height, 0.1, 1000)
        this.instance.position.set(0, 8, 40)
        this.scene.add(this.instance)

        //Debug
        if(this.debug.active){
            this.debugFolder.add(this.instance.position, 'x').step(0.01).min(-100).max(100).name('positionX')
            this.debugFolder.add(this.instance.position, 'y').step(0.01).min(-100).max(100).name('positionY')
            this.debugFolder.add(this.instance.position, 'z').step(0.01).min(-100).max(100).name('positionZ')


            this.debugFolder.add(this.instance.rotation, 'x').step(0.01).min(-Math.PI).max(Math.PI).name('rotationY').onChange(() => {
                this.experience.eventEmitter.trigger('camera.rotationChanged', [this.instance.rotation]);
            });

            this.debugFolder.add(this.instance.rotation, 'y').step(0.01).min(-Math.PI).max(Math.PI).name('rotationY').onChange(() => {
                this.experience.eventEmitter.trigger('camera.rotationChanged', [this.instance.rotation]);
            });

            this.debugFolder.add(this.instance.rotation, 'z').step(0.01).min(-Math.PI).max(Math.PI).name('rotationY').onChange(() => {
                this.experience.eventEmitter.trigger('camera.rotationChanged', [this.instance.rotation]);
            });

        }
    }

    setIntroAnimation() {

        const startPosition = {
            x: 0, 
            y: 32, 
            z: 60
        }

        this.instance.position.set(startPosition.x, startPosition.y, startPosition.z)

        this.animation.addAnimation(this.instance.position, {
            duration: this.animationConfig.defaultDuration, 
            ease: this.animationConfig.defaultEase,
            x: 0, 
            y: 2, 
            z: 40
        }, 
        { emitEvents: true })

    }

    resize() {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    update() {
      
    }
}