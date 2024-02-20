
import Experience from '../Experience.js'
import Environment from './Environment.js'
import Plane from './Plane.js'
import Central from './Central.js'
import QuadrantOne from './QuadrantOne.js'
import QuadrantTwo from './QuadrantTwo.js'
import QuadrantFour from './QuadrantFour.js'
import Structures from './Structures.js'
import Anomaly  from './Anomaly.js'
import ExperienceManager from '../ExperienceManager.js'
import AudioManager from './AudioManager.js'
import Loader from './Loader.js'

export default class World {
    constructor(renderer) {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.loader = new Loader()
        this.renderer = renderer
        

        this.resources.on('ready', () => {
            console.log('Resources ready')
            this.plane = new Plane()
            this.anomaly = new Anomaly(this.renderer)
            this.structures = new Structures()
            this.experienceManager = new ExperienceManager();
            this.environment = new Environment()    
            this.audio = new AudioManager();
        }) 
    }

    updateScene(){
        this.experienceManager.updateScene()
    }

    update() {
        // if(this.plane)
        // this.plane.update()
        if(this.anomaly)
        this.anomaly.update()
    }   
}