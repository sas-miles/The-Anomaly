uniform sampler2D tDiffuse;
uniform float uTime;
uniform vec3 uColor;

varying vec2 vUv;

void main() {
    // float color = vUv.x + vUv.y + sin(uTime) * 0.5;
    // color = 1.0 - color * 2.0;

    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);

    #include <colorspace_fragment>
}
