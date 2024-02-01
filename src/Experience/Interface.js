import * as THREE from 'three'
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import Experience from './Experience.js';

export default class Interface{
    constructor(){
        this.experience = new Experience()
        this.raycaster = new THREE.Raycaster()
        this.sizes = this.experience.sizes
        this.labelRenderer = new CSS2DRenderer()
        this.pointLabel = new CSS2DObject()
        this.mousePosition = new THREE.Vector2()
        this.debug = this.experience.debug
        
        console.log(this.debug.active)

        if(this.debug.active){
            this.debugFolder = this.debug.gui.addFolder('Markers')
        }

        this.labels = {}

        // Define label offsets for each sphere
        this.labelOffsets = {
            'sphere1': new THREE.Vector3(0, 4, 0), // Adjust x, y, z as needed
            'sphere2': new THREE.Vector3(0, 2, 0), // Adjust x, y, z as needed
            'sphere3': new THREE.Vector3(0, 2, 0), // Adjust x, y, z as needed
            'sphere4': new THREE.Vector3(0, 2, 0)  // Adjust x, y, z as needed
        };

        //Setup
        this.setLabelRenderer()
        this.setGroup()
        this.setLabels()
        this.setRaycaster()
        this.setDebug()
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
        this.group = new THREE.Group()

        this.sphereMesh1 = this.setMarkers('sphere1', 0, 6.25, 0)
        this.group.add(this.sphereMesh1)

        this.sphereMesh2 = this.setMarkers('sphere2', -17, 14, -10)
        this.group.add(this.sphereMesh2)

        this.sphereMesh3 = this.setMarkers('sphere3', -16, 2, 12)
        this.group.add(this.sphereMesh3)

        this.sphereMesh4 = this.setMarkers('sphere4', 8, 2, -30)
        this.group.add(this.sphereMesh4)
        
        this.experience.scene.add(this.group)
    }

    setLabels() {
        this.group.children.forEach((sphere) => {
            const labelClass = `is-${sphere.name}`;
            const div = document.querySelector(`.label-container.${labelClass}`);

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

    onMouseClick(event) {
        // Update the mouse position for raycasting
        this.mousePosition.x = (event.clientX / this.sizes.width) * 2 - 1;
        this.mousePosition.y = -(event.clientY / this.sizes.height) * 2 + 1;
        this.raycaster.setFromCamera(this.mousePosition, this.experience.camera.instance);
    
        // Check for intersections with the markers
        const intersects = this.raycaster.intersectObjects(this.group.children);
    
        if (intersects.length > 0) {
            const intersectedMarker = intersects[0].object;
            this.experience.camera.animateToMarker(intersectedMarker.name);
        }
    }
    
    setDebug() {
        if(this.debug.active){
        this.debugFolder.add(this.sphereMesh2.position, 'x').step(0.01).min(-100).max(100).name('positionX')
        this.debugFolder.add(this.sphereMesh2.position, 'y').step(0.01).min(-100).max(100).name('positionY')    
        this.debugFolder.add(this.sphereMesh2.position, 'z').step(0.01).min(-100).max(200).name('positionZ')
        }
        
    }
    

    update() {
        this.labelRenderer.render(this.experience.scene, this.experience.camera.instance)
    }

    resize(){
        this.labelRenderer.setSize(this.sizes.width, this.sizes.height);
    }
}