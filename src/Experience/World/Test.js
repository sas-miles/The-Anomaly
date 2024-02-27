import * as THREE from 'three'
import Experience from '../Experience.js'


export default class Test{

    constructor() {

        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        

        //Setup
        this.resource = this.resources.items.Test
        this.setGH1()
        this.setMaterial()

        this.setModel()

    }

    setGH1(){
        this.textures = { }
        this.textures.color = this.resources.items.GH1
        this.textures.color.colorSpace = THREE.SRGBColorSpace
        this.textures.color.flipY = false

    }

    setMaterial(){
        this.material = new THREE.MeshBasicMaterial({
        //    wireframe: true,
           color: 0xDEBB86,
           opacity: 0.5,
        })
    }

    setModel() {
        this.model = this.resource.scene
        this.scene.add(this.model)
        // this.model.traverse((child) => {
        //         child.material = this.material
        // })
        console.log(this.model)
    }

}