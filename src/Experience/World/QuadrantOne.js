import Experience from '../Experience.js'

export default class QuadrantOne {

    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.debug = this.experience.debug

        //Setup
        this.resource = this.resources.items.QuadrantOne

        this.setModelGroup()
    }

    setModelGroup() {
        this.modelGroup = this.resource.scene
        this.scene.add(this.modelGroup)
        
    }

}