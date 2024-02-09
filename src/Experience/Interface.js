import * as THREE from 'three'
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import Experience from './Experience.js';
import Controls from './Controls';
import Renderer from './Renderer.js';

export default class Interface{
    constructor(){

        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.time = this.experience.time
        this.renderer = this.experience.renderer


        this.group = new THREE.Group()
        this.experience.scene.add(this.group);

        
        this.spheres = []

        this.labels = {};
        this.labelOffsets = {};
        
        this.mousePosition = new THREE.Vector2()
        this.raycaster = new THREE.Raycaster()

        
        this.setLabelRenderer();
        this.setLabels()
        this.updateScene()
    }

    setSphereGroup() {
        // Find all sphere containers from DOM
        const sphereContainers = document.querySelectorAll('.sphere-container');
        
    
        sphereContainers.forEach((item, index) => { // Correctly declare index here
            const x = parseFloat(item.getAttribute('data-x'));
            const y = parseFloat(item.getAttribute('data-y'));
            const z = parseFloat(item.getAttribute('data-z'));
    
            const name = item.getAttribute('data-label');
    
            // Create the sphere and set position and name 
            const newSphere = this.createSphere(x, y, z, name);
            this.group.add(newSphere);
            this.spheres.push(newSphere);
    
        });
    }
    

    createSphere(x, y, z, name) {
        const geo = new THREE.SphereGeometry(0.5);
        const mat = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(x, y, z);
        mesh.name = name; // Set the name of the mesh
        return mesh;
    }

    setLabels() {
        this.group.children.forEach((sphere) => {
            const div = document.querySelector(`[data-label="${sphere.name}"]`);
    
            if (div) {
                const yOffset = parseFloat(div.getAttribute('labelY-offset')) || 0;
                const label = new CSS2DObject(div);
                label.position.set(0, yOffset + 2.0, 0); // Adjust label position relative to the sphere
    
                sphere.add(label); // Attach the label to the sphere
                this.labels[sphere.name] = label;
            }
        });
    }
    
    

    setLabelRenderer() {
    
        // Initialize a new CSS2DRenderer
        this.labelRenderer = new CSS2DRenderer();
        this.labelRenderer.setSize(this.sizes.width, this.sizes.height);
        this.labelRenderer.domElement.style.position = 'absolute';
        this.labelRenderer.domElement.style.top = '0';
        this.labelRenderer.domElement.style.display = 'block';
        this.labelRenderer.domElement.style.pointerEvents = 'none';
        document.body.appendChild(this.labelRenderer.domElement);
    }

    setRaycaster() {   
        window.addEventListener('mousemove', (event) => {
            this.mousePosition.x = (event.clientX / this.sizes.width) * 2 - 1;
            this.mousePosition.y = -(event.clientY / this.sizes.height) * 2 + 1;
        
            this.raycaster.setFromCamera(this.mousePosition, this.experience.camera.instance)
    
            const intersects = this.raycaster.intersectObjects(this.group.children)
        
             // Hide all labels initially
            Object.values(this.labels).forEach(label => {
                if (label.element) {
                    label.element.style.display = 'none'; // Hide the label
                }
            });
    
            // Show only the labels for intersected spheres
            if (intersects.length > 0) {
                intersects.forEach(intersect => {
                    const name = intersect.object.name;
                    const label = this.labels[name];
                    if (label && label.element) {
                        label.element.style.display = 'block'; // Show the label
                        // Optional: Update label position here if needed
                    }
                });
            }
        
        })


        window.addEventListener('click', (event) => {
            this.mousePosition.x = (event.clientX / this.sizes.width) * 2 - 1;
            this.mousePosition.y = -(event.clientY / this.sizes.height) * 2 + 1;
        
            this.raycaster.setFromCamera(this.mousePosition, this.experience.camera.instance);
            const intersects = this.raycaster.intersectObjects(this.group.children);
        
            if (intersects.length > 0) {
                const name = intersects[0].object.name;
        
                // Find the div with data-content attribute matching the sphere's name
                const targetDiv = document.querySelector(`div[data-content="${name}"]`);
                if (targetDiv) {
                    // Add the is-active class to the div
                    targetDiv.classList.add('is-active');
                    
                }
            }
        });
        
    }

    closeModal() {
        document.querySelectorAll('.marker-close').forEach((closeButton) => {
            closeButton.addEventListener('click', (event) => {
                // Prevent the event from propagating to avoid triggering other click events
                event.stopPropagation();
    
                // Access the parent div of the clicked close button
                const parentDiv = event.currentTarget.closest('div[data-content]');
                
                if (parentDiv) {
                    // Remove the is-active class from the parent div
                    parentDiv.classList.remove('is-active');
                }
    
            });
        });
    }
    
    

    reset() {
    
        // Remove spheres from the Three.js scene and dispose of their resources
        this.spheres.forEach(sphere => {
            this.group.remove(sphere);
            if (sphere.geometry) sphere.geometry.dispose();
            if (sphere.material) sphere.material.dispose();
        });
        this.spheres = []; // Clear the spheres array
    
        // For each label, remove the CSS2DObject from its parent and the corresponding DOM element
        Object.keys(this.labels).forEach(name => {
            const label = this.labels[name];
            if (label && label.element) {
                // Remove the label from the parent in the Three.js scene
                if (label.parent) label.parent.remove(label);
    
                // Remove the DOM element from its parent node
                if (label.element.parentNode) {
                    label.element.parentNode.removeChild(label.element);
                }
            }
        });
    
        this.labels = {}; // Clear the labels object

        
    
    }
    
    
    

    updateScene() {
        // Properly setup or reset the CSS2DRenderer
        // this.setLabelRenderer();
        
        // Clear previous spheres and labels to prepare for new content
        // this.reset(); 

        // Re-setup spheres and labels based on new content
        this.setSphereGroup();
        this.setLabels();

        // Re-setup event listeners for interaction
        this.setRaycaster();
        this.closeModal();

    }
    

    update() {
        if (this.labelRenderer) {
            this.labelRenderer.render(this.experience.scene, this.experience.camera.instance);
        }
    }

    resize() {
        this.labelRenderer.setSize(this.sizes.width, this.sizes.height);
    }

}
