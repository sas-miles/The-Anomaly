import * as THREE from 'three';

import Camera from './Camera.js';
import animationConfig from './config.js';
import Controls from './Controls.js';
import PostProcessing from './PostProcessing.js';
import Renderer from './Renderer.js';
import sources from './sources.js';
import AnimationManager from './Utils/AnimationManager.js';
import Debug from './Utils/Debug.js';
import EventEmitter from './Utils/EventEmitter.js';
import Resources from './Utils/Resources.js';
import Sizes from './Utils/Sizes.js';
import Time from './Utils/Time.js';
import World from './World/World.js';
import Interface from './Interface.js';
// import AudioManager from './AudioManager.js'

let instance = null;

export default class Experience {
  constructor(canvas) {
    //Singleton
    if (instance) {
      return instance;
    }

    instance = this;

    //Options
    this.canvas = canvas;

    //Setup
    
    this.debug = new Debug();
    this.sizes = new Sizes();
    this.time = new Time();
    this.eventEmitter = new EventEmitter();
    this.animation = new AnimationManager();
    this.animationConfig = animationConfig;
    this.scene = new THREE.Scene();
    this.resources = new Resources(sources);
    
    this.camera = new Camera(this.eventEmitter);
    this.renderer = new Renderer();
    this.postProcessing = new PostProcessing();
    this.controls = new Controls(this);
    this.interface = new Interface();
    this.world = new World(this.renderer.instance);


    //Sizes Resize Event
    this.sizes.on('resize', () => {
      this.resize();
    });

    //Time Tick Event
    this.time.on('tick', () => {
      this.update();
    });
  }

  


  updateScene() {
    this.resize()
    this.update()
    this.interface.updateScene()
    this.world.updateScene()
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
    this.postProcessing.resize();
    this.interface.resize();
  }

  update() {
    this.camera.update();
    this.renderer.update();
    this.controls.update();
    this.world.update();
    
    this.animation.update();
    this.interface.update();
    this.postProcessing.update();
  }

  reInitializeComponents() {
    this.interface.reset()
  }



  //Ideally call this on each class
  destroy() {
    this.sizes.off('resize');
    this.time.off('tick');

    //Traverse the whole scene and dispose of all objects
    this.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();

        for (const texture of child.material) {
          const value = child.material[key];
          if (value && typeof value.dispose === 'function') {
            value.dispose();
          }
        }
        child.material.dispose();
      }
    });

    this.camera.controls.dispose();
    this.renderer.instance.dispose();

    if (this.debug.active) {
      this.debug.destroy();
    }

    this.animation.dispose();
  }
}
