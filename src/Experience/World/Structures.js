import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Structures {

    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        //Setup
        this.resource = this.resources.items.Full

        //Science Main
        // console.log(this.resource)

        this.setModel()

        this.setScienceMainMaterial()
    }

    setModel() {
        this.model = this.resource.scene
        this.scene.add(this.model)
        
    }

    setScienceMainMaterial() {
        // Ensure the model is loaded
        if (!this.model) {
            console.error('Model not loaded')
            return
        }

        

        const targetNames = ["ScienceMain", "OrbBackLeft", "OrbBackRight"]; // Add the names of the meshes you want to target

        this.model.traverse((child) => {
            if (child.isMesh && targetNames.includes(child.name)) {
                child.material = new THREE.MeshStandardMaterial({
                    
                    roughness: .2,
                    metalness: 1.1,
                });
    
                // Additional changes for these specific meshes can be done here
            }
        });

    }
}