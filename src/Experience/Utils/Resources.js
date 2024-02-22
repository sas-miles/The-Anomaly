import * as THREE from 'three';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import Experience from '../Experience.js';
import EventEmitter from './EventEmitter.js';

export default class Resources extends EventEmitter {
  constructor(sources) {
    super();

    this.sources = sources;
    this.experience = new Experience();

    this.items = {};
    this.toLoad = this.sources.length;
    this.loaded = 0;

    
    this.setLoaders();
    this.startLoading();

  }

  setLoaders() {
    this.loaders = {};
    this.loaders.gltfLoader = new GLTFLoader();
    this.DRACOLoader = new DRACOLoader();
    this.DRACOLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/');
  

    this.loaders.gltfLoader.setDRACOLoader(this.DRACOLoader);
    this.loaders.textureLoader = new THREE.TextureLoader();
    this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader();
    this.loaders.audioLoader = new THREE.AudioLoader();
  }

  startLoading() {
    
    // const isMobileOrTablet = window.innerWidth <= 768;
    for (const source of this.sources) {

      // if (isMobileOrTablet && source.type === 'audio') {
      //   console.log('Skipping audio load for mobile/tablet device.');
      //   this.loaded++; // Increment the loaded count to maintain the progress calculation
      //   continue; // Skip the current loop iteration
      // }

      switch (source.type) {
        case 'gltfModel':
          this.loaders.gltfLoader.load(source.path, (file) => {
            this.sourceLoaded(source, file);
          });
          break;

        case 'texture':
          this.loaders.textureLoader.load(source.path, (file) => {
            this.sourceLoaded(source, file);
          });
          break;

        case 'cubeTexture':
          this.loaders.cubeTextureLoader.load(source.path, (file) => {
            this.sourceLoaded(source, file);
          });
          break;
          
        case 'audio':
          this.loaders.audioLoader.load(source.path, (buffer) => {
            this.audio = new THREE.Audio(this.experience.camera.listener);
        this.audio.setBuffer(buffer);
        this.sourceLoaded(source, this.audio);
        });
        break;

        default:
          console.log('Unknown type');
          break;
      }
    }
  }

  sourceLoaded(source, file) {
    this.items[source.name] = file;
    this.loaded++;

    // Calculate the loading progress as a percentage
    const progress = this.loaded / this.toLoad;
    
    // Emit a progress event with the calculated progress
    this.trigger('progress', [progress]);

    if (this.loaded === this.toLoad) {
        this.trigger('ready');
        
    }
}

}