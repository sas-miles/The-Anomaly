uniform float uTime;
uniform vec3 uColor;

varying vec2 vUv;

void main() {


    gl_FragColor = vec4(vec3(uColor), 1.0);

    #include <colorspace_fragment>
}

