import Experience from '../Experience.js'
import Environment from './Environment.js'
import Plane from './Plane.js'
import Central from './Central.js'
import QuadrantOne from './QuadrantOne.js'
import QuadrantTwo from './QuadrantTwo.js'
import QuadrantFour from './QuadrantFour.js'
import Anomaly  from './Anomaly.js'
import ExperienceManager from '../ExperienceManager.js'

export default class World {
    constructor(renderer) {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.renderer = renderer
        

        this.resources.on('ready', () => {
            console.log('Resources ready')

            //Setup
            
            
            this.plane = new Plane()
            this.central = new Central()
            this.quandrantOne = new QuadrantOne()
            this.quandrantTwo = new QuadrantTwo()
            this.quandrantFour = new QuadrantFour()
            this.anomaly = new Anomaly(this.renderer)
            this.experienceManager = new ExperienceManager();
            this.environment = new Environment()
            
        }) 

        

    }

    update() {
        if(this.plane)
        this.plane.update()
        if(this.anomaly)
        this.anomaly.update()
    }   
}