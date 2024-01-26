import Experience from '../Experience.js'

export default class QuadrantTwo {

    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        //Setup
        this.resource = this.resources.items.QuadrantTwo

        this.setModelGroup()
    }

    setModelGroup() {
        this.modelGroup = this.resource.scene
        this.scene.add(this.modelGroup)
        
    }

}