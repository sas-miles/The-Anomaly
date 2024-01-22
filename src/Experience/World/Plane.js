import * as THREE from 'three'

import Experience from '../Experience.js'

import planeVertexShader from '../shaders/plane/vertex.glsl'
import planeFragmentShader from '../shaders/plane/fragment.glsl'


export default class Plane {   
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.debug = this.experience.debug

        //Debug
        if(this.debug.active){
            this.debugFolder = this.debug.gui.addFolder('The Plane')
        }

        //Set up
        this.planeVertexShader = planeVertexShader
        this.planeFragmentShader = planeFragmentShader

        this.setGeometry()
        this.planeParameters = {
            planeColor: '#363535',
        }
        this.setMaterial()
        
        this.setMesh()
        

    }

    setGeometry(){
        this.geometry = new THREE.PlaneGeometry(100, 100, 200, 200)
    }

    setMaterial(){
        this.material = new THREE.ShaderMaterial({
            vertexShader: planeVertexShader,
            fragmentShader: planeFragmentShader,
            uniforms: {
                tDiffuse: { value: null }, 
                uTime: { value: 0 },
                uColor: { value: new THREE.Color(this.planeParameters.planeColor) }
            },
        })

        //Debug
        if(this.debug.active){
            this.debugFolder.addColor(this.planeParameters, 'planeColor').onChange(() => {
                this.material.uniforms.uColor.value.set(this.planeParameters.planeColor)
            })
        }

    }

    setMesh(){
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.rotation.x = - Math.PI * 0.5
        this.mesh.receiveShadow = true
        this.scene.add(this.mesh)
    }

    update() {
        this.material.uniforms.uTime.value = this.time.elapsed * 0.001;
    }
}