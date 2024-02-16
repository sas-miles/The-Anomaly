import * as three from 'three';
import gsap from 'gsap';

import experience from '../Experience.js'
import loadVertexShader from '../shaders/loader/vertex.glsl'
import loadFragmentShader from '../shaders/loader/fragment.glsl'

export default class Loader{
    constructor(){
        this.experience = new experience()
        this.resources = this.experience.resources
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.debug = this.experience.debug

        this.loaderDiv = document.querySelector('.loader-wrapper')

        this.setupGeometry()
        this.setupMaterial()
        this.setupPlane()

        this.setupLoad()
    }

    setupGeometry(){
        this.overlayGeometry = new three.PlaneGeometry(2, 2, 1, 1)
    }

    setupMaterial() {
        this.overlayMaterial = new three.ShaderMaterial({ 
            transparent: true,
            uniforms: {
                uAlpha: { value: 1 },
                uTime: { value: 0 }
            },
            vertexShader: loadVertexShader,
            fragmentShader: loadFragmentShader
        });
    }

    setupPlane() {

        this.overlay = new three.Mesh(this.overlayGeometry, this.overlayMaterial);
        this.experience.scene.add(this.overlay);
    }

    setupLoad(){
        
            this.resources.on('ready', () => {
                gsap.timeline({
                    onComplete: () => {
                        this.scene.remove(this.overlay)
                        this.loaderDiv.style.display = 'none'
                    }
                })
                .to(this.overlayMaterial.uniforms.uAlpha, {
                    value: 0,
                    duration: 2,
                    ease: 'power2.out'
                })
        })    
    }


}