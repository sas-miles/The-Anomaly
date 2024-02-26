
import Experience from '../Experience.js'
import Environment from './Environment.js'
import Plane from './Plane.js'
import CentralCommand from './CentralCommand.js'
import PowerStation from './PowerStation.js'
import Anomaly  from './Anomaly.js'
import ExperienceManager from '../ExperienceManager.js'
import Loader from './Loader.js'
import EventEmitter from '../Utils/EventEmitter.js'
import AudioManager from './AudioManager.js'
import GreenHouse from './GreenHouse.js'


export default class World extends EventEmitter{
    constructor(renderer) {
        super()
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.loader = new Loader()
        this.renderer = renderer
        this.eventEmitter = new EventEmitter()
        

        
        this.resources.on('ready', () => {
            console.log('Resources ready')
            this.plane = new Plane()
            this.audioManager = new AudioManager()
            this.anomaly = new Anomaly(this.renderer)
            this.centralCommand = new CentralCommand()
            this.powerStation = new PowerStation()
            this.greenHouse = new GreenHouse()
            this.experienceManager = new ExperienceManager();
            this.environment = new Environment()    

            this.trigger('ready');

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
