import Experience from '../Experience.js'

export default class Central {

    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources


        //Setup
        this.resource = this.resources.items.Central
        this.setModel()
    }

    setModel() {
        this.model = this.resource.scene
        this.scene.add(this.model)
        
    }

}