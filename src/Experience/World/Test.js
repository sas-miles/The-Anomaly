import * as THREE from 'three';
import Experience from '../Experience.js';

export default class Test {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    //Setup
    this.resource = this.resources.items.Test;

    this.setMaterial();

    this.setModel();
  }

  setMaterial() {
    this.material = new THREE.MeshBasicMaterial({
      //    wireframe: true,
      color: 0xdebb86,
      opacity: 0.5,
    });
  }

  setModel() {
    this.model = this.resource.scene;
    this.scene.add(this.model);
    // this.model.traverse((child) => {
    //         child.material = this.material
    // })
  }
}
