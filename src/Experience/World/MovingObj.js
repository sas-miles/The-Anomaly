import * as THREE from 'three'

import Experience from '../Experience.js'
import Time from '../Utils/Time.js'

export default class MovingObj {   
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = new Time()
        this.resources = this.experience.resources 
        this.renderer = this.experience.renderer 

        this.points = [
            new THREE.Vector3(30, 15, 120),
            new THREE.Vector3(30, 12, 0),
            new THREE.Vector3(30, 10, -20),
            new THREE.Vector3(30, 0, -100),
            new THREE.Vector3(30, 0, -100)
        ]

        this.path = new THREE.CatmullRomCurve3(this.points)
        this.duration = 20000
        this.resource = this.resources.items.Ship

        // this.setTextures()
        this.setMaterial()
        this.setModel()
        this.setPathAnimation()
        //Time Tick Event
        this.time.on('tick', () => {
        this.update();
      });
    }

    setMaterial(){
        this.material = new THREE.MeshStandardMaterial({
            color: 0xDEBB86
        })
    }

    setModel() {
        this.model = this.resource.scene
        this.model.position.set(50, 0, 0);
        this.scene.add(this.model)
        
    }

    setPathAnimation() {
        this.path = new THREE.CatmullRomCurve3(this.points)
        this.pathGeometry = new THREE.BufferGeometry().setFromPoints(this.path.getPoints(50))
        this.pathObject = new THREE.Line(this.pathGeometry, new THREE.LineBasicMaterial({color: 0xff0000})) 
        // this.scene.add(this.pathObject)

    }   

    update() {
        const t = this.time.elapsed / this.duration;
        const position = this.path.getPointAt(t % 1); // Use modulus to loop t between 0 and 1
        this.model.position.copy(position);
    }

    removeMovingObj() {
        this.scene.remove(this.model);
        this.scene.remove(this.pathObject);
    }
}

