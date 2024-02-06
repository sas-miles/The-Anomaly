import * as THREE from 'three'
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import Experience from './Experience.js';
import Controls from './Controls';

export default class Interface{
    constructor(eventEmitter){
        this.experience = new Experience()
        this.eventEmitter = eventEmitter;
        this.raycaster = new THREE.Raycaster()
        this.sizes = this.experience.sizes
        this.labelRenderer = new CSS2DRenderer()
        this.pointLabel = new CSS2DObject()
        this.mousePosition = new THREE.Vector2()
        this.controls = this.experience.controls
        this.debug = this.experience.debug
        this.group = new THREE.Group(); 
        this.experience.scene.add(this.group);

        

        this.labels = {}
        this.spheres = []

        this.labelOffsets = {
            'sphere1': new THREE.Vector3(0, 4, 0), // Adjust x, y, z as needed
            'sphere2': new THREE.Vector3(0, 2, 0), // Adjust x, y, z as needed
            'sphere3': new THREE.Vector3(0, 2, 0), // Adjust x, y, z as needed
            'sphere4': new THREE.Vector3(0, 2, 0)  // Adjust x, y, z as needed
        };

        const closeDivs = document.querySelectorAll('.marker-close');
        closeDivs.forEach(div => {
            div.addEventListener('click', () => {
                this.enableCustomControls();
            });
        });

        //Setup
        this.setLabelRenderer()
        this.setGroup()
        this.setLabels()
        this.setRaycaster()
        this.setCloseButtonListener();
        this.setupLabelClickListener();
    }

    setLabelRenderer() {
        this.labelRenderer.setSize(this.sizes.width, this.sizes.height)
        this.labelRenderer.domElement.style.position = 'absolute'
        this.labelRenderer.domElement.style.top = '0px'
        this.labelRenderer.domElement.style.pointerEvents = 'none'
        document.body.appendChild(this.labelRenderer.domElement)
    }   

    setMarkers(name, x, y, z) {
        const geo = new THREE.SphereGeometry(0.5)
        const mat = new THREE.MeshBasicMaterial({ color: 0xff0000 })
        const mesh = new THREE.Mesh(geo, mat)

        mesh.position.set(x, y, z)
        mesh.name = name

        return mesh
    }


    setGroup() {
        this.group.children.forEach(child => {
            this.group.remove(child);
        });
        this.spheres = [];
    
        const sphereContainers = document.querySelectorAll('.sphere-container');
        sphereContainers.forEach((container) => {
            const x = parseFloat(container.getAttribute('data-X'));
            const y = parseFloat(container.getAttribute('data-Y'));
            const z = parseFloat(container.getAttribute('data-Z'));
            const name = container.getAttribute('data-label'); // Get the name from data-label attribute
    
            // Create a new sphere and set its position and name
            const newSphere = this.createSphere(x, y, z, name); // Pass the name to createSphere
            this.group.add(newSphere);
            this.spheres.push(newSphere); // Store the sphere
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
                const label = new CSS2DObject(div);
                label.position.copy(sphere.position).add(this.labelOffsets[sphere.name] || new THREE.Vector3());
                this.labels[sphere.name] = label; // Store the label with reference to the sphere's name
                this.experience.scene.add(label);
            }
        });
    }
    

    setRaycaster() {
        window.addEventListener('click', this.onMouseClick.bind(this)); 
        window.addEventListener('mousemove', (event) => {
            // Convert the mouse position to normalized device coordinates (-1 to +1) for raycasting.
            this.mousePosition.x = (event.clientX / this.sizes.width) * 2 - 1;
            this.mousePosition.y = -(event.clientY / this.sizes.height) * 2 + 1;
    
            // Update the raycaster with the new mouse position.
            this.raycaster.setFromCamera(this.mousePosition, this.experience.camera.instance);
    
            // Calculate objects intersecting the picking ray. Check only children of the group.
            const intersects = this.raycaster.intersectObjects(this.group.children, true);
    
            // Hide all labels initially.
            Object.values(this.labels).forEach(label => {
                if (label.element) {
                    label.element.classList.remove('show');
                }
            });
    
            if (intersects.length > 0) {
                // Get the first intersected object.
                const name = intersects[0].object.name;
                const intersectedObject = intersects[0].object;
    
                // Retrieve the label associated with the intersected object.
                const label = this.labels[name];
    
                if (label && label.element) {
                    // Show the label and update its position based on the intersected object and the defined offset.
                    label.element.classList.add('show');
                    const offset = this.labelOffsets[name] || new THREE.Vector3();
                    label.position.copy(intersectedObject.position).add(offset);
                }
            }
        });
    }

    removeEventListeners() {
        window.removeEventListener('click', this.onMouseClickBound);
        window.removeEventListener('mousemove', this.onMouseMoveBound);
        // ... remove other event listeners
    }

    // This method is called after each Barba transition
    initializeDynamicEventListeners() {
        console.log('Initializing dynamic event listeners');
        this.removeEventListeners()
        this.setGroup();
        this.setCloseButtonListener();
        this.setupLabelClickListener();
        console.log('Dynamic event listeners initialized successfully');

        
    }

    setCloseButtonListener() {
        // Assuming '.dynamic-content' is the container of your dynamically loaded content
        const dynamicContent = document.querySelector('.dynamic-content');
        if (dynamicContent) {
            dynamicContent.addEventListener('click', (event) => {
                const isCloseButton = event.target.closest('.marker-close');
                if (isCloseButton) {
                    this.experience.camera.setIntroAnimation(); // Ensure you have implemented this
                    this.resetActiveContent();
                }
            });
        }
    }

    setupLabelClickListener() {
        // Assuming '.dynamic-content' is the container of your dynamically loaded content
        const dynamicContent = document.querySelector('.dynamic-content');
        if (dynamicContent) {
            dynamicContent.addEventListener('click', (event) => {
                const labelElement = event.target.closest('[data-label]');
                if (labelElement) {
                    const labelName = labelElement.getAttribute('data-label');
                    this.handleLabelClick(labelName);
                }
            });
        }
    }

    handleLabelClick(labelName) {
        console.log(`Label clicked: ${labelName}`);
        
        // Find the corresponding sphere or marker in your scene
        const sphere = this.group.children.find(child => child.name === labelName);
        if (!sphere) {
            console.error(`No sphere found with the name: ${labelName}`);
            return;
        }
    
        const intersectedMarker = sphere;
    
        const allContentDivs = document.querySelectorAll('[data-content]');
        allContentDivs.forEach(div => {
            div.classList.remove('is-active');
            this.enableCustomControls(intersectedMarker);
        });
    
        const activeContentDiv = document.querySelector(`[data-content="${intersectedMarker.name}"]`);
        if (activeContentDiv) {
            activeContentDiv.classList.add('is-active');
        }
    
        this.experience.camera.animateToMarker(intersectedMarker.name);
        this.controls.disableCustomControls();
        this.eventEmitter.trigger('labelClicked', [labelName]);
    }
    
    onMouseClick(event) {
        this.mousePosition.x = (event.clientX / this.sizes.width) * 2 - 1;
        this.mousePosition.y = -(event.clientY / this.sizes.height) * 2 + 1;
        this.raycaster.setFromCamera(this.mousePosition, this.experience.camera.instance);
    
        const intersects = this.raycaster.intersectObjects(this.group.children);
    
        if (intersects.length > 0) {
            const intersectedMarker = intersects[0].object;
            
            // Reuse the handleLabelClick method to handle the rest of the logic
            this.handleLabelClick(intersectedMarker.name);
        }
    }
    
    
    resetActiveContent() {
        const allContentDivs = document.querySelectorAll('.marker-content_item');
        allContentDivs.forEach(div => {
            div.classList.remove('is-active');
        });
    }

    enableCustomControls(marker) {
        if (marker && marker.position) {
            this.controls.enableCustomControls(marker.position);
            this.experience.camera.animateToMarker(marker.name);
        } else {
            console.error("Invalid marker passed to enableCustomControls");
        }
    }

    update() {
        this.labelRenderer.render(this.experience.scene, this.experience.camera.instance);
    }

    resize() {
        this.labelRenderer.setSize(this.sizes.width, this.sizes.height);
    }
}