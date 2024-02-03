import * as THREE from 'three'
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';


import Experience from '../Experience.js'

export default class Environment{
    constructor(){
        RectAreaLightUniformsLib.init();
        this.experience = new Experience()
        this.scene = this.experience.scene 
        this.resources = this.experience.resources
        // this.debug = this.experience.debug

        //Debug
        // if(this.debug.active){
        //     this.debugFolder = this.debug.gui.addFolder('Environment')
        // }

        this.setSunLight()
        //this.setEnvironmentMap()
    }

    setSunLight(){
        this.sunLight = new THREE.RectAreaLight('#FFD5C2', 1.45, 140, 50)
        this.sunLight.position.set(1.642, 40, -33)
        this.sunLight.rotation.x = -1.89;
        this.scene.add(this.sunLight)
        
        // const sunLightHelper = new RectAreaLightHelper(this.sunLight)
        // this.scene.add(sunLightHelper)

        //Debug
        // if(this.debug.active){
        //     this.debugFolder
        //         .add(this.sunLight, 'intensity')
        //         .min(0).max(50).step(0.01)
        //         .name('Sun Light Intensity')

        //     this.debugFolder
        //         .add(this.sunLight.position, 'x')
        //         .min(-50).max(50).step(0.1)
        //         .name('Sun X')

        //     this.debugFolder
        //         .add(this.sunLight.position, 'y')
        //         .min(0).max(50).step(0.1)
        //         .name('Sun Y')

        //     this.debugFolder
        //         .add(this.sunLight.position, 'z')
        //         .min(-40).max(60).step(1)
        //         .name('Sun Z')

        //         this.debugFolder
        //     .add(this.sunLight.rotation, 'x')
        //     .min(-Math.PI).max(Math.PI).step(0.01)
        //     .name('Sun Rotation X')
        
        // this.debugFolder
        //     .add(this.sunLight.rotation, 'y')
        //     .min(-Math.PI).max(Math.PI).step(0.01)
        //     .name('Sun Rotation Y')

        // this.debugFolder
        //     .add(this.sunLight.rotation, 'z')
        //     .min(-Math.PI).max(Math.PI).step(0.01)
        //     .name('Sun Rotation Z')

        //     // Add width control
        // this.debugFolder
        // .add(this.sunLight, 'width')
        // .min(0).max(200).step(1)
        // .name('Sun Light Width')
        // .onChange(() => sunLightHelper.update());

    // Add height control
    // this.debugFolder
    //     .add(this.sunLight, 'height')
    //     .min(0).max(200).step(1)
    //     .name('Sun Light Height')
    //     .onChange(() => sunLightHelper.update());

    //     }

    //     // this.debugFolder
    //     //     .add({ helperVisible: true }, 'helperVisible')
    //     //     .name('Toggle Helper')
    //     //     .onChange((value) => {
    //     //         sunLightHelper.visible = value;
    //     //     });
    // }

    // setEnvironmentMap(){
    //     this.environmentMap = {}
    //     this.environmentMap.intensity = 0.4
    //     this.environmentMap.texture = this.resources.items.environmentMapTexture
    //     this.environmentMap.texture.colorSpace = THREE.SRGBColorSpace

    //     this.scene.environment = this.environmentMap.texture

    //     this.environmentMap.updateMaterial = () => {
    //         this.scene.traverse(child => {
    //             if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial){
    //                 child.material.envMap = this.environmentMap.texture
    //                 child.material.envMapIntensity = this.environmentMap.intensity
    //                 child.material.needsUpdate = true
    //             }
    //         })
    //     }

    //     this.environmentMap.updateMaterial()

    //     //Debug
    //     if(this.debug.active){
    //         this.debugFolder
    //             .add(this.environmentMap, 'intensity')
    //             .min(0).max(4).step(0.001)
    //             .name('Intensity')
    //             .onChange(this.environmentMap.updateMaterial)
    //     }
    }
}