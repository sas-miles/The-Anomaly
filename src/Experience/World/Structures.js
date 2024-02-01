import Experience from '../Experience.js'

export default class Structures {

    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources


        //Setup
        this.resource = this.resources.items.Full
        this.setModel()
    }

    setModel() {
        this.model = this.resource.scene
        this.scene.add(this.model)
        
    }

}