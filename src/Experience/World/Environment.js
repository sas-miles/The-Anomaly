import * as THREE from 'three'
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';
import structures from './Structures.js'
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
        this.structures = structures.instance
        this.plane = plane.instance
        this.setSunLight()
    }

    setSunLight(){
        this.sunLight = new THREE.RectAreaLight('#FFD2B3', 7, 140, 50)
        this.sunLight.position.set(0, 50, -33)
        this.sunLight.rotation.x = -1.9;
        
        this.scene.add(this.sunLight)
    }
}