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
            new THREE.Vector3(-10, 20, 100),
            new THREE.Vector3(0, 10, 0),
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(0, 0, 10)
        ]

        this.path = new THREE.CatmullRomCurve3(this.points)
        this.duration = 10000
        this.resource = this.resources.items.Ship

        // this.setTextures()
        this.setMaterial()
        this.setModel()
        this.setPathAnimation()
        console.log('MovingObj.js')
        //Time Tick Event
        this.time.on('tick', () => {
        this.update();
      });
    }

    

    // setTextures(){
    //     this.textures = {}
    //     this.textures.color = this.resources.items.grassColorTexture
    //     this.textures.color.colorSpace = THREE.SRGBColorSpace
    //     this.textures.color.repeat.set(1.5, 1.5)
    //     this.textures.color.wrapS = THREE.RepeatWrapping
    //     this.textures.color.wrapT = THREE.RepeatWrapping

    //     this.textures.normal = this.resources.items.grassNormalTexture
    //     this.textures.normal.repeat.set(1.5, 1.5)
    //     this.textures.normal.wrapS = THREE.RepeatWrapping
    //     this.textures.normal.wrapT = THREE.RepeatWrapping
    // }

    setMaterial(){
        this.material = new THREE.MeshStandardMaterial({
            color: 0x0000ff
        })
    }

    setModel() {
        this.model = this.resource.scene
        this.scene.add(this.model)
        this.model.traverse((child) => {
            child.material = this.material
        })

        
    }

    setPathAnimation() {
        this.path = new THREE.CatmullRomCurve3(this.points)
        this.pathGeometry = new THREE.BufferGeometry().setFromPoints(this.path.getPoints(50))
        this.pathObject = new THREE.Line(this.pathGeometry, new THREE.LineBasicMaterial({color: 0xff0000})) 
        this.scene.add(this.pathObject)

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