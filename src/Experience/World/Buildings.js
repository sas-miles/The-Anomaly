import * as THREE from 'three'

import Experience from '../Experience.js'

export default class Buildings {

    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.debug = this.experience.debug

        //Debug
        if(this.debug.active){
            this.debugFolder = this.debug.gui.addFolder('Buildings')
        }


        //Setup
        this.buildings = [
            this.resources.items.building1,
            this.resources.items.building2,
            this.resources.items.building3,
        ]
        this.setModel()
        
    }

    setModel() {
        this.buildings.forEach((buildingResource) => {

            const buildingModel = buildingResource.scene
            this.scene.add(buildingModel)

            buildingModel.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                    child.castShadow = true
                    child.receiveShadow = true
                }
            })

        })
    }

}