import * as THREE from 'three'
import Experience from '../Experience.js'


export default class CentralCommand {

    constructor() {
        if (CentralCommand.instance) {
            return CentralCommand.instance;
        }

        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        

        //Setup
        this.resource = this.resources.items.CentralCommand
        this.setTextures()
        this.setMaterial()

        this.setModel()

    }

    setTextures(){
        this.textures = {}
        this.textures.color = this.resources.items.CentralCommandTexture
        this.textures.color.colorSpace = THREE.SRGBColorSpace
        this.textures.color.flipY = false

    }

    setMaterial(){
        this.material = new THREE.MeshBasicMaterial({
            map: this.textures.color
        })
    }

    setModel() {
        this.model = this.resource.scene
        this.model.material = this.material
        this.scene.add(this.model)
        this.model.traverse((child) => {
            child.material = this.material
        })
        
    }

}