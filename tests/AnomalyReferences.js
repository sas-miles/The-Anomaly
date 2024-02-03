    // Wormhole 1
    const radius = Math.random() * this.parameters.radius;
    const maxDropHeight = 200; // How much the points can drop based on radius

    const branchAngle = (i % this.parameters.branches) / this.parameters.branches * Math.PI * 2;

    const randomX = Math.pow(Math.random(), this.parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * radius;
    const randomY = Math.pow(Math.random(), this.parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * this.parameters.randomness * radius;
    const randomZ = Math.pow(Math.random(), this.parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * this.parameters.randomness * radius;

    positions[i3    ] = Math.cos(branchAngle) * radius;

    // Apply falloff effect to Y position based on radius
    const falloff = 1.0 / (1.0 + radius); // Simple inverse falloff
    positions[i3 + 1] = falloff * maxDropHeight; // maxDropHeight controls how much the points can drop
    
    positions[i3 + 2] = Math.sin(branchAngle) * radius;
    
    randomness[i3    ] = randomX;
    randomness[i3 + 1] = randomY;
    randomness[i3 + 2] = randomZ;