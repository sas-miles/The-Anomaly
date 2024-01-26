uniform sampler2D tDiffuse;
varying vec2 vUv;

float inverseLerp(float v, float minValue, float maxValue) {
    return (v - minValue) / (maxValue - minValue);
}
float remap(float v, float inMin, float inMax, float outMin, float outMax) {
    float t = inverseLerp(v, inMin, inMax);
    return mix(outMin, outMax, t);
}

void main()
{
    vec2 coords = fract(vUv * vec2(2.0, 1.0));
    vec3 color = texture2D(tDiffuse, vUv).xyz;

    vec2 vignetteCoords = fract(vUv);

    float v1 = smoothstep(0.6, 0.08, abs(vignetteCoords.x - 0.5));
    float v2 = smoothstep(0.6, 0.08, abs(vignetteCoords.y - 0.5));
    float vignetteAmount = (v1 * v2);
    // color = vec3(v1);
    // color *= vec3(v2);
    color *= vignetteAmount * 2.0;

    // color *= vignetteAmount * 2.0;

    gl_FragColor = vec4(color, 1.0);
}
