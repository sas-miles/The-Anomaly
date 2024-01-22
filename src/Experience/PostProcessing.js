import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'

import Experience from './Experience.js';

export default class PostProcessing {

    constructor() {
        this.experience = new Experience()
        this.time = this.experience.time
        this.sizes = this.experience.sizes
        this.renderer = this.experience.renderer
        this.effectComposer = new EffectComposer()
        this.gammaCorrection = new GammaCorrectionShader()
        this.bloomPass = new UnrealBloomPass()
        this.renderPass = new RenderPass()

        
        this.setVignette()
        this.setBloom()
        this.renderPass()

        this.effectComposer(this.renderer.instance)


    }

    setVignette() {
        this.vignette = {}
        this.vignette.active = true
        this.vignette.offset = 0.95
        this.vignette.darkness = 1.6
    }

    setBloom() {
        this.bloom = {}
        this.bloom.active = true
        this.bloom.strength = 1
        this.bloom.radius = 0
        this.bloom.threshold = 0
    }

    setEffectComposer() {
        this.effectComposer.setSize(this.sizes.width, this.sizes.height)
        this.effectComposer.setPixelRatio(this.sizes.pixelRatio)

    }

    setRenderPass() {
        this.renderPass = new RenderPass(this.experience.scene, this.experience.camera.instance)
    }


    update() {  
        this.effectComposer.render()
    }


}