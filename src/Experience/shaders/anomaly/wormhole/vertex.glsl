uniform float uTime;
uniform float uSize;
uniform vec3 uOffset;

attribute vec3 aRandomness;
attribute float aScale;

varying vec3 vColor;

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    // Rotate
    float angle = atan(modelPosition.x, modelPosition.z);
    float distanceToCenter = length(modelPosition.xz);
    float angleOffset = (1.0 / distanceToCenter) * uTime * 1.0; // Added a scaling factor to slow down the rotation effect.
    angle += angleOffset;
    modelPosition.x = cos(angle) * distanceToCenter;
    modelPosition.z = sin(angle) * distanceToCenter;

    // float angle = modelPosition.x * modelPosition.z;
    // float distanceToCenter = length(modelPosition.xyz);

    // angle += uTime * 0.1;
    // modelPosition.x = cos(angle) * distanceToCenter;
    // modelPosition.z = sin(angle) * distanceToCenter;

    // Apply the randomness
    modelPosition.xyz += aRandomness;

    // Apply the offset after the rotation and randomness to avoid moving with the galaxy's rotation
    modelPosition.xyz += uOffset;

    // Convert the modelPosition to view space
    vec4 viewPosition = viewMatrix * modelPosition;

    // Project the viewPosition to clip space
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;

    // Calculate size with perspective correction
    float perspectiveSize = uSize * aScale * (4.0 / -viewPosition.z);
    perspectiveSize = clamp(perspectiveSize, 0.0, uSize); // Add clamping to avoid over-scaling

    gl_PointSize = perspectiveSize;

    vColor = color;
}
