import * as THREE from 'three'

import Experience from '../Experience.js'

export default class Roads {

    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.debug = this.experience.debug

        //Debug
        if(this.debug.active){
            this.debugFolder = this.debug.gui.addFolder('Roads')
        }


        //Setup
        this.resource = this.resources.items.Road1
        this.setModel()
    }

    setModel() {
        this.model = this.resource.scene
        this.scene.add(this.model)

        this.model.traverse((child) => {
            if(child instanceof THREE.Mesh){
                child.castShadow = true
                child.receiveShadow = true
            }
        })
        
    }

}