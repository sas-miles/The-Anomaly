import * as THREE from 'three'
import Experience from '../Experience.js'


export default class Structures {

    constructor() {
        if (Structures.instance) {
            return Structures.instance;
        }

        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        

        //Setup
        this.resource = this.resources.items.Full

        this.setModel()

        Structures.instance = this;

    }

    setModel() {
        this.model = this.resource.scene
        this.scene.add(this.model)
        
    }

}