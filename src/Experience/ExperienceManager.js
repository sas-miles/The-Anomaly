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
import cameraAnimate from './Animations/CameraAnimate.js'
// import UIAnimation from './Animations/UIAnimations.js'


export default class ExperienceManager{

    constructor(){
        this.experience = new Experience();
        this.camera = this.experience.camera;
        this.worldInterface = this.experience.world.worldInterface;
        this.anomaly = this.experience.world.anomaly;
        this.plane = this.experience.world.plane;
        this.animation = this.experience.animation
        this.animationConfig = this.experience.animationConfig
        this.cameraAnimate = new cameraAnimate()
        this.resources = this.experience.resources

        // this.UIAnimation = new UIAnimation()  
        this.chapterParams = {
            'intro': {
                anomalyParams: {
                    count: 23000,
                    size: 300,
                    radius: 36,
                    branches: 4,
                    spin: 1,
                    randomness: 4.5,
                    randomnessPower:2,
                    insideColor: '#ffc994',
                    outsideColor: '#373c81',
                    offsetX: -50.25,
                    offsetY: 60.13,
                    offsetZ: 10.56,
                    vertexShader: galaxyVertexShader,
                    fragmentShader: galaxyFragmentShader
                }
            },
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
        
        // this.ExperienceTransitions()
        // this.UITransitions()
        
        this.setPageAnimation()
        this.setAnomalyParams()
        
    }


    setPageAnimation() {
        this.pageEnter = sessionStorage.getItem('pageEnter')
        

        /** 
            RUN ENTER  
        */

        switch (this.pageEnter)
        {
            case 'intro':
                this.cameraAnimate.IntroCamera()
                
            break

            case 'chapter1':
                this.cameraAnimate.ChapterOneCamera()

                
            break

            case 'chapter2':
                this.cameraAnimate.ChapterTwoCamera()
                
            break
            
        }
    }


    setAnomalyParams(){
        let pageEnter = sessionStorage.getItem('pageEnter');

        switch (pageEnter) 
        {
            case 'intro':
                this.anomaly.updateParameters(this.chapterParams.intro.anomalyParams)

            break

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
        this.setPageAnimation()
        this.setAnomalyParams() 
    }

}