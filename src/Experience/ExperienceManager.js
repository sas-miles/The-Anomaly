import { gsap } from 'gsap';

import Experience from './Experience.js'
import EventEmitter from './Utils/EventEmitter.js';


import planeVertexShader1 from './shaders/plane/1/vertex.glsl'
import planeFragmentShader1 from './shaders/plane/1/fragment.glsl'
import planeVertexShader2 from './shaders/plane/2/vertex.glsl'
import planeFragmentShader2 from './shaders/plane/2/fragment.glsl'
import galaxyVertexShader from './shaders/anomaly/galaxy/vertex.glsl'
import galaxyFragmentShader from './shaders/anomaly/galaxy/fragment.glsl'
import wormholeVertexShader from './shaders/anomaly/wormhole/vertex.glsl'
import wormholeFragmentShader from './shaders/anomaly/wormhole/fragment.glsl'



export default class ExperienceManager{

    constructor(){
        this.experience = new Experience();
        this.camera = this.experience.camera;
        this.worldInterface = this.experience.world.worldInterface;
        this.anomaly = this.experience.world.anomaly;
        this.plane = this.experience.world.plane;
        this.animation = this.experience.animation
        this.animationConfig = this.experience.animationConfig

        this.chapterParams = {
            'chapter1': {
                anomalyParams: {
                    count: 619000,
                    size: 53,
                    radius: 14,
                    branches: 8,
                    spin: 2,
                    randomness: 2,
                    randomnessPower:3,
                    insideColor: '#ffc994',
                    outsideColor: '#373c81',
                    offsetX: 16,
                    offsetY: 50,
                    offsetZ: 0,
                    vertexShader: galaxyVertexShader,
                    fragmentShader: galaxyFragmentShader
                }
            },
            
            'chapter2': {
                anomalyParams: {
                    count: 410000,
                    size: 13,
                    radius: 30,
                    branches: 13,
                    spin: 1,
                    randomness: 0.476,
                    randomnessPower: 4.579,
                    insideColor: '#e5ad76',
                    outsideColor: '#9ba2d9',
                    offsetX: 4,
                    offsetY: 30,
                    offsetZ: 40,
                    vertexShader: wormholeVertexShader,
                    fragmentShader: wormholeFragmentShader
                }
            }, 
    
            'chapter3': {
                anomalyParams: {
                    count: 225700,
                    size: 55.748,
                    radius: 6.578,
                    branches: 7,
                    spin: 1,
                    randomness: 0.033,
                    randomnessPower: 10,
                    insideColor: '#e5ad76',
                    outsideColor: '#9ba2d9',
                    offsetX: 1.322,
                    offsetY: 8.759,
                    offsetZ: 40,
                }
            },
    
            'chapter4': {
                anomalyParams: {
                    count: 225700,
                    size: 55.748,
                    radius: 6.578,
                    branches: 7,
                    spin: 1,
                    randomness: 0.033,
                    randomnessPower: 10,
                    insideColor: '#e5ad76',
                    outsideColor: '#9ba2d9',
                    offsetX: 1.322,
                    offsetY: 8.759,
                    offsetZ: 40,
                }
            },
    
            'chapter5': {
                anomalyParams: {
                    count: 225700,
                    size: 55.748,
                    radius: 6.578,
                    branches: 7,
                    spin: 1,
                    randomness: 0.033,
                    randomnessPower: 10,
                    insideColor: '#e5ad76',
                    outsideColor: '#9ba2d9',
                    offsetX: 1.322,
                    offsetY: 8.759,
                    offsetZ: 40,
                }
            },
        }
        

        this.setChapterCamera()
        this.setAnomalyParams()
       
    }


    setChapterCamera(){
        let page = sessionStorage.getItem('page')
        
        this.experience.eventEmitter.trigger('controls:disable');
        console.log('Controls disabled for animation');

        let chapter1Tl = gsap.timeline({
            paused: true,
            onComplete: () => {
                console.log('Controls enabled for animation');
                this.experience.eventEmitter.trigger('controls:enable');
            }
        })
        .to(this.experience.camera.instance.position, {
            x: 0, 
            y: 20, 
            z: 100,
            duration: 2,
            ease: 'power2.inOut'
        }, 0)
        .to(this.experience.camera.instance.rotation, {
            x: 0, 
            y: 0, 
            z: 0,
            duration: 2,
            ease: 'power2.inOut'
        }, 0);



        let chapter2Tl = gsap.timeline({paused: true, onComplete: () => {
            // This ensures controls are enabled only after the entire timeline completes
            console.log('Chapter 1 GSAP Timeline Completed');
            this.experience.eventEmitter.trigger('controls:enable');
        }})

        .to(this.experience.camera.instance.position, {
            x: 10,
            y: 20, 
            z: 100,
            duration: 2,
            ease: 'power2.inOut'
        }, 0)

        .to(this.experience.camera.instance.rotation, {
            x: 0, 
            y: 0, 
            z: 0,
            duration: 2,
            ease: 'power2.inOut'
        }, 0)

        


        switch (page)
        {
            case 'chapter1':
                console.log('chapter1 timeline')
                chapter1Tl.play()
            break

            case 'chapter2':
                console.log('chapter2 timeline')
                chapter2Tl.play()
            break

            case 'chapter3':
                console.log('chapter3 timeline')
                
            break

            case 'chapter4':
                console.log('chapter4 timeline')
                
            break

            case 'chapter5':
                console.log('chapter5 timeline')
                
            break
            
        }

    }

    

    setAnomalyParams(){
        let page = sessionStorage.getItem('page');

        switch (page) 
        {
            case 'chapter1':
                this.anomaly.updateParameters(this.chapterParams.chapter1.anomalyParams)
                
            break

            case 'chapter2':
                this.anomaly.updateParameters(this.chapterParams.chapter2.anomalyParams)
            break

            case 'chapter3':
                this.anomaly.updateParameters(this.chapterParams.chapter3.anomalyParams)
            break

            case 'chapter4':
                this.anomaly.updateParameters(this.chapterParams.chapter4.anomalyParams)
            break

            case 'chapter5':
                this.anomaly.updateParameters(this.chapterParams.chapter5.anomalyParams)
            break

        }
    }

    updateScene(){
        this.setChapterCamera()
        this.setAnomalyParams()
        
    }

}