import Experience from '../Experience.js'
import Environment from './Environment.js'
import Plane from './Plane.js'
import Islands from './Islands.js'
import Roads from './Roads.js'
import Buildings from './Buildings.js'
import Anomaly  from './Anomaly.js'

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
            this.islands = new Islands()
            this.roads = new Roads()
            this.buildings = new Buildings()
            this.anomaly = new Anomaly(this.renderer)
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