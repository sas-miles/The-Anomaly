import * as THREE from 'three'

import Experience from '../Experience.js'

import planeVertexShader1 from '../shaders/plane/1/vertex.glsl'
import planeFragmentShader1 from '../shaders/plane/1/fragment.glsl'



export default class Plane {   
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.resources = this.experience.resources 
        // this.debug = this.experience.debug

        //Debug
        // if(this.debug.active){
        //     this.debugFolder = this.debug.gui.addFolder('The Plane')
        // }

        //Set up
        this.planeVertexShader = planeVertexShader1
        this.planeFragmentShader = planeFragmentShader1

        this.resource = this.resources.items.Ground

        this.setModel()
        

    }

    setModel() {
        this.model = this.resource.scene
        this.scene.add(this.model)
        
    }

    setMaterial(){
        this.material = new THREE.ShaderMaterial({
            vertexShader: planeVertexShader1,
            fragmentShader: planeFragmentShader1,
            uniforms: {
                tDiffuse: { value: null }, 
                uTime: { value: 0 },
                uColor: { value: new THREE.Color(this.planeParameters.planeColor) }
            },
        })

        //Debug
        // if(this.debug.active){
        //     this.debugFolder.addColor(this.planeParameters, 'planeColor').onChange(() => {
        //         this.material.uniforms.uColor.value.set(this.planeParameters.planeColor)
        //     })
        // }

    }

    setMesh(){
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.rotation.x = - Math.PI * 0.5
        this.mesh.receiveShadow = true
        this.scene.add(this.mesh)
    }

    updateShader(vertexShader, fragmentShader) {
        // Preserve the old uniforms' values
        const oldUniforms = this.material.uniforms;
    
        // Dispose the old material
        this.material.dispose();
    
        // Create a new material with the new shaders and old uniform values
        this.material = new THREE.ShaderMaterial({
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            uniforms: {
                tDiffuse: { value: oldUniforms.tDiffuse.value },
                uTime: { value: oldUniforms.uTime.value },
                uColor: { value: oldUniforms.uColor.value },
                // Add other uniforms here if needed
            },
        });
    
        // Reassign the material to the mesh
        this.mesh.material = this.material;
    }

    update() {
        this.material.uniforms.uTime.value = this.time.elapsed * 0.001;
    }
}