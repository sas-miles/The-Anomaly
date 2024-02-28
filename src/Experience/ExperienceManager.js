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
import MovingObj from './World/MovingObj.js';

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
        this.time = this.experience.time
        
        this.resources = this.experience.resources
        
        // this.UIAnimation = new UIAnimation()  
        this.chapterParams = {
            'intro': {
                anomalyParams: {
                    count: 238000,
                    size: 742,
                    radius: 274.822,
                    branches: 19,
                    spin: -5,
                    randomness: 2,
                    randomnessPower:2.92,
                    insideColor: '#654622',
                    outsideColor: '#463623',
                    offsetX: 100,
                    offsetY: 231,
                    offsetZ: -200,
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
                    count: 582100,
                    size: 66,
                    radius: 85,
                    branches: 20,
                    spin: 1,
                    randomness: 1.5,
                    randomnessPower: 3,
                    insideColor: '#80643a',
                    outsideColor: '#891414',
                    offsetX: 14,
                    offsetY: 30,
                    offsetZ: 40,
                }
            },
    
            'chapter4': {
                anomalyParams: {
                    count: 827900,
                    size: 66,
                    radius: 913.962,
                    branches: 7,
                    spin: 1,
                    randomness: 0.23,
                    randomnessPower: 9.336,
                    insideColor: '#e5ad76',
                    outsideColor: '#373c81',
                    offsetX: 19,
                    offsetY: 15,
                    offsetZ: -28,
                }
            },
    
            'chapter5': {
                anomalyParams: {
                    count: 754200,
                    size: 176,
                    radius: 65.873,
                    branches: 100,
                    spin: 1,
                    randomness: 0.328,
                    randomnessPower: 5.796,
                    insideColor: '#e5ad76',
                    outsideColor: '#9ba2d9',
                    offsetX: 0,
                    offsetY: 0,
                    offsetZ: 19,
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
    
        if (this.MovingObj && this.pageEnter !== 'chapter1') {
            this.MovingObj.removeMovingObj();
            this.MovingObj = null;
        }
    
        switch (this.pageEnter)
        {
            case 'intro':
                this.cameraAnimate.IntroCamera()
            break
    
            case 'chapter1':
                
                this.cameraAnimate.ChapterOneCamera()
                if (!this.MovingObj) {
                    this.MovingObj = new MovingObj()
                }
            break
    
            case 'chapter2':
                
                this.cameraAnimate.ChapterTwoCamera()
            break
    
            case 'chapter3':
                this.cameraAnimate.ChapterThreeCamera()
            break
    
            case 'chapter4':
                this.cameraAnimate.ChapterFourCamera()
            break
    
            case 'chapter5':
                this.cameraAnimate.ChapterFiveCamera()
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