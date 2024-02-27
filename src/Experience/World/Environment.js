import * as THREE from 'three'
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';
import plane from './Plane.js'
import worldLightVertex from '../shaders/lights/world/vertex.glsl'
import worldLightFragment from '../shaders/lights/world/fragment.glsl'

import Experience from '../Experience.js'

export default class Environment{
    constructor(){
        RectAreaLightUniformsLib.init();
        this.experience = new Experience()
        this.scene = this.experience.scene 
        this.resources = this.experience.resources
        this.debug = this.experience.debug
        this.plane = plane.instance

        //Debug
        if(this.debug.active){
            this.debugFolder = this.debug.gui.addFolder('Rect Light')
        }

        this.setSunLight()
        // this.setAmbientLight()
        // this.setDebug()

    }

    setAmbientLight(){
        this.ambientLight = new THREE.AmbientLight('#FFFFFF', 1)
        this.scene.add(this.ambientLight)
    }

    setSunLight(){
        this.sunLight = new THREE.RectAreaLight('#FFD2B3', 8, 30, 30)
        this.sunLight.position.set(-13, 40, -37)
        this.sunLight.rotation.x = -1.9;
        

        this.sunLightHelper = new RectAreaLightHelper(this.sunLight)
        this.scene.add(this.sunLight)
    }

    setDebug() {
        if(this.debug.active){
            this.debugFolder
                .add(this.sunLight, 'intensity')
                .min(0).max(10).step(0.001)
                .name('Sun Light Intensity')

            this.debugFolder
                .add(this.sunLight.position, 'x')
                .min(-100).max(100).step(0.001)
                .name('Sun X')

            this.debugFolder
                .add(this.sunLight.position, 'y')
                .min(10).max(100).step(0.001)
                .name('Sun Y')

            this.debugFolder
                .add(this.sunLight.position, 'z')
                .min(-100).max(100).step(0.001)
                .name('Sun Z')
        }
    }


}