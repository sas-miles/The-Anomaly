import * as THREE from 'three'

import Experience from '../Experience.js'

import galaxyVertexShader from '../shaders/anomaly/galaxy/vertex.glsl'
import galaxyFragmentShader from '../shaders/anomaly/galaxy/fragment.glsl'


export default class Anomaly {   
    constructor(renderer) {
        this.experience = new Experience()
        this.renderer = renderer
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.debug = this.experience.debug
        
        

        //Debug
        if(this.debug.active){
            this.debugFolder = this.debug.gui.addFolder('The Anomaly')
        }

        //Set up
        this.anomalyVertexShader = galaxyVertexShader
        this.anomalyFragmentShader = galaxyFragmentShader

        this.parameters = {
            count: 619000,
            size: 53,
            radius: 45.914,
            branches: 2,
            spin: 1,
            randomness: 0.5,
            randomnessPower:4.579,
            insideColor: '#ffc994',
            outsideColor: '#373c81',
            offsetX: 19,
            offsetY: 41,
            offsetZ: -28,
            vertexShader: galaxyVertexShader,
            fragmentShader: galaxyFragmentShader
        }

        this.points = null;
        this.setGeometry()
        this.setPoints()
        this.generateGalaxy()
        this.setDebug()

    }

    setGeometry(){
        this.geometry = new THREE.BufferGeometry()
    }

    setPoints(){

        this.material = new THREE.ShaderMaterial({
           
            blending: THREE.AdditiveBlending,
            depthTest: true,
            depthWrite: false,
            transparent: true,
            vertexColors: true,
            vertexShader: this.anomalyVertexShader,
            fragmentShader: this.anomalyFragmentShader,
            uniforms: {
                uSize: { value: this.parameters.size * this.renderer.getPixelRatio() },
                uTime: { value: 0 },
                uOffset: { value: new THREE.Vector3(this.parameters.offsetX, this.parameters.offsetY, this.parameters.offsetZ) },
            }
        })

    }

    generateGalaxy() {
        // console.log("generateGalaxy called with parameters:", this.parameters);

        if (this.points !== null) {
            this.geometry.dispose();
            this.material.dispose();
            this.scene.remove(this.points)
        }

        /**
         * Geometry
         */
        this.geometry = new THREE.BufferGeometry()

        const positions = new Float32Array(this.parameters.count * 3)
        const randomness = new Float32Array(this.parameters.count * 3)
        const colors = new Float32Array(this.parameters.count * 3)
        const scales = new Float32Array(this.parameters.count * 1)

        const insideColor = new THREE.Color(this.parameters.insideColor)
        const outsideColor = new THREE.Color(this.parameters.outsideColor)
        for(let i = 0; i < this.parameters.count; i++)
        {
            const i3 = i * 3
    
            // Position
            const radius = Math.random() * this.parameters.radius
    
            const branchAngle = (i % this.parameters.branches) / this.parameters.branches * Math.PI * 2
    
            const randomX = Math.pow(Math.random(), this.parameters.randomnessPower) * (Math.random() < 0.3 ? 1 : - 1) * this.parameters.randomness * radius
            const randomY = Math.pow(Math.random(), this.parameters.randomnessPower) * this.parameters.randomness * radius
            const randomZ = Math.pow(Math.random(), this.parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * this.parameters.randomness * radius
    
            positions[i3    ] = Math.cos(branchAngle) * radius
            positions[i3 + 1] = 0
            positions[i3 + 2] = Math.sin(branchAngle) * radius
        
            randomness[i3    ] = randomY
            randomness[i3 + 1] = randomX
            randomness[i3 + 2] = randomZ
    
            // Color
            const mixedColor = insideColor.clone()
            mixedColor.lerp(outsideColor, radius / this.parameters.radius)
    
            colors[i3    ] = mixedColor.r
            colors[i3 + 1] = mixedColor.g
            colors[i3 + 2] = mixedColor.b
    
            // Scale
            scales[i] = Math.random()
        }


        this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
        this.geometry.setAttribute('aRandomness', new THREE.BufferAttribute(randomness, 3))
        this.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
        this.geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1))

        this.points = new THREE.Points(this.geometry, this.material)
        
        this.scene.add(this.points)

    }

    setDebug(){
        if(this.debug.active){
            this.debugFolder.add(this.parameters, 'count').min(100).max(1000000).step(100).onFinishChange(() => {
                this.generateGalaxy()
            })
            this.debugFolder.add(this.parameters, 'size').min(0).max(1000).step(1.0).onFinishChange(() => {
                this.material.uniforms.uSize.value = this.parameters.size * this.renderer.getPixelRatio();
                // Potentially re-render or regenerate the galaxy if necessary.
            })
            this.debugFolder.add(this.parameters, 'radius').min(0).max(100).step(0.001).onFinishChange(() => {
                this.generateGalaxy()
            })
            this.debugFolder.add(this.parameters, 'branches').min(0).max(100).step(1).onFinishChange(() => {
                this.generateGalaxy()
            })
            this.debugFolder.add(this.parameters, 'spin').min(- 5).max(5).step(0.001).onFinishChange(() => {
                this.generateGalaxy()
            })
            this.debugFolder.add(this.parameters, 'randomness').min(0).max(2).step(0.001).onFinishChange(() => {
                this.generateGalaxy()
            })
            this.debugFolder.add(this.parameters, 'randomnessPower').min(1).max(10).step(0.001).onFinishChange(() => {
                this.generateGalaxy()
            })
            this.debugFolder.addColor(this.parameters, 'insideColor').onFinishChange(() => {
                this.generateGalaxy()
            })
            this.debugFolder.addColor(this.parameters, 'outsideColor').onFinishChange(() => {
                this.generateGalaxy()
            })
            this.debugFolder.add(this.parameters, 'offsetX').min(-100).max(100).step(1).onFinishChange(() => {
                this.updateParameters({ offsetX: this.parameters.offsetX });
            })
            this.debugFolder.add(this.parameters, 'offsetY').min(-100).max(100).step(1).onFinishChange(() => {
                this.updateParameters({ offsetY: this.parameters.offsetY });
            })
            this.debugFolder.add(this.parameters, 'offsetZ').min(-100).max(100).step(1).onFinishChange(() => {
                this.updateParameters({ offsetZ: this.parameters.offsetZ });
            })
        }
    }
    
    updateParameters(newParams) {
        // Flag to check if galaxy needs regeneration
        let regenerateGalaxy = false;
    
        // Update parameters and check if galaxy regeneration is needed
        for (const [key, value] of Object.entries(newParams)) {
            if (key in this.parameters) {
                this.parameters[key] = value;
    
                // Check if this parameter requires regenerating the galaxy
                if (['count', 'radius', 'branches', 'randomness', 'randomnessPower', 'insideColor', 'outsideColor', 'vertexShader', 'fragmentShader'].includes(key)) {
                    regenerateGalaxy = true;
                }
    
                // Update material-related uniforms directly if they are changed
                if (['size', 'offsetX', 'offsetY', 'offsetZ'].includes(key)) {
                    switch (key) {
                        case 'size':
                            this.material.uniforms.uSize.value = this.parameters.size * this.renderer.getPixelRatio();
                            break;
                        case 'offsetX':
                        case 'offsetY':
                        case 'offsetZ':
                            this.material.uniforms.uOffset.value = new THREE.Vector3(this.parameters.offsetX, this.parameters.offsetY, this.parameters.offsetZ);
                            break;
                        default:
                            break;
                    }
                }
            } else {
                console.warn(`Parameter ${key} is not recognized.`);
            }
        }
    
        // Regenerate the galaxy if needed
        if (regenerateGalaxy) {
            this.generateGalaxy();
        }
    }
    
    
    
    
    update() {
        this.material.uniforms.uTime.value = this.time.elapsed * 0.001
    }
}