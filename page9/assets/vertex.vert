#ifdef GL_ES
precision mediump float;
#endif

attribute vec3 aPosition;
attribute vec2 aTexCoord;

varying vec2 vTexCoord; // Pass texture coordinates to the fragment shader

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

void main() {
    vTexCoord = aTexCoord;  // Set varying texture coordinates
    gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aPosition, 1.0);
}
