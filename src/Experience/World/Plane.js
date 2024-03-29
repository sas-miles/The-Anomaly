import * as THREE from 'three'
import Experience from '../Experience.js'


export default class Plane {

    constructor() {

        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        

        //Setup
        this.resource = this.resources.items.Ground
        this.setTextures()
        this.setMaterial()

        this.setModel()

    }

    setTextures(){
        this.textures = {}
        this.textures.color = this.resources.items.GroundTexture
        this.textures.color.colorSpace = THREE.SRGBColorSpace
        this.textures.color.flipY = false
        this.textures.normal = this.resources.items.GroundNormal

    }

    setMaterial(){
        this.material = new THREE.MeshStandardMaterial({
            map: this.textures.color,
            normalMap: this.textures.normal,
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