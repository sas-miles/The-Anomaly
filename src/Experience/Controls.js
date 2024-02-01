import * as THREE from 'three';
import Experience from './Experience'

export default class Controls {
    constructor() {
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.time = this.experience.time;
        this.renderer = this.experience.renderer.instance;
        this.camera = this.experience.camera.instance;

        // Define variables here
        this.isDragging = false;
        this.dragStart = { x: 0, y: 0 };
        this.moveSpeed = 0.003; // Speed of forward/backward movement
        this.rotateSpeed = 0.001; // Speed of rotation
        this.damping = 0.02; // Smoothing factor for damping
        this.rotationDeadzone = 5;

        // Define the current state
        this.currentRotationY = 0;
        this.currentTargetPositionZ = 0;

        this.experience.eventEmitter.on('camera.rotationChanged', (rotation) => {
            this.currentRotationY = rotation.y;
            // You might want to set a flag indicating manual adjustment to handle logic in update method
            this.isManuallyAdjusted = true;
        })
        
        this.setControls();
    }

    setControls() {
        const handleMouseDown = (clientX, clientY) => {
            this.isDragging = true;
            this.dragStart.x = clientX;
            this.dragStart.y = clientY;
        };
    
        const handleMouseMove = (clientX, clientY) => {
            if (this.isDragging) {
                const deltaX = clientX - this.dragStart.x;
                const deltaY = clientY - this.dragStart.y;
        
                // Apply deadzone for rotation
                if (Math.abs(deltaX) > this.rotationDeadzone) {
                    // Horizontal Rotation
                    this.currentRotationY += deltaX * this.rotateSpeed;
                }
        
                // Forward and Backward Movement
                this.currentTargetPositionZ += deltaY * this.moveSpeed; 
    
                // Update drag start positions for the next frame
                this.dragStart.x = clientX;
                this.dragStart.y = clientY;
            }
        };
    
        this.renderer.domElement.addEventListener('mousedown', (event) => {
            handleMouseDown(event.clientX, event.clientY);
        });
    
        window.addEventListener('mouseup', () => {
            this.isDragging = false;
            // Do not reset this.currentTargetPositionZ to maintain position
        });
    
        this.renderer.domElement.addEventListener('mousemove', (event) => {
            handleMouseMove(event.clientX, event.clientY);
        });
    
        // Touch events
        this.renderer.domElement.addEventListener('touchstart', (event) => {
            // Prevent the window from scrolling
            event.preventDefault();
    
            const touch = event.touches[0];
            handleMouseDown(touch.clientX, touch.clientY);
        }, { passive: false });
    
        this.renderer.domElement.addEventListener('touchmove', (event) => {
            // Prevent the window from scrolling
            event.preventDefault();
    
            const touch = event.touches[0];
            handleMouseMove(touch.clientX, touch.clientY);
        }, { passive: false });
    
        window.addEventListener('touchend', () => {
            this.isDragging = false;
        });
    }

    update() {
        if (this.isManuallyAdjusted) {
            // Handle manual adjustment, e.g., gradually blend manual and automatic controls
            this.isManuallyAdjusted = false; // Reset flag if needed
        } else {
            // Update rotation with damping
        this.camera.rotation.y += (this.currentRotationY - this.camera.rotation.y) * this.damping;
    
        // Get the forward direction of the camera
        const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(this.camera.quaternion);
    
        // Calculate the movement amount
        const movementAmount = forward.multiplyScalar(this.currentTargetPositionZ);
        
        // Apply movement to the camera position (with or without damping)
        this.camera.position.add(movementAmount);
    
        // Gradually reduce the movement speed when not dragging for smooth stopping
        if (!this.isDragging) {
            this.currentTargetPositionZ *= (1 - this.damping);
        }
        }
        
    }
    
}
