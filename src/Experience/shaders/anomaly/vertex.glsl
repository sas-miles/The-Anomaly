uniform float uTime;
uniform float uSize;
uniform vec3 uOffset;

attribute vec3 aRandomness;
attribute float aScale;

varying vec3 vColor;

void main()
{
    /**
     * Position
     */
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    
                
    // Rotate 1
    float angle = atan(modelPosition.x, modelPosition.z);
    float distanceToCenter = length(modelPosition.xz);
    float angleOffset = (1.0 / distanceToCenter) * uTime;
    angle += angleOffset;
    modelPosition.x = cos(angle) * distanceToCenter;
    modelPosition.z = sin(angle) * distanceToCenter;

    // Randomness
    modelPosition.xyz += aRandomness;

    // Offset in world space
    vec4 viewPosition = viewMatrix * modelPosition;

    viewPosition.xyz += uOffset;

    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;

    /**
     * Size
     */
    gl_PointSize = uSize * aScale;
    gl_PointSize *= (1.0 / - viewPosition.z);

    /**
     * Color
     */
    vColor = color;
}