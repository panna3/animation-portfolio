#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;
uniform sampler2D u_texture;  // The fog texture
uniform float u_fogOffset;    // Horizontal offset for fog movement

varying vec2 vTexCoord; // Texture coordinates from vertex shader

void main() {
    vec2 st = vTexCoord;
    st.y += 0.1;
  
    // Apply horizontal movement
    st.x -= u_fogOffset;

    // Sample the fog texture with the modified coordinates
    vec4 fogColor = texture2D(u_texture, st);

    // Edge fading: Softly fade out the fog at the edges to avoid harsh lines
    float fadeLeft = smoothstep(0.0, 0.2, st.x);
    float fadeRight = smoothstep(1.0, 0.8, st.x);
    float edgeFade = fadeLeft * fadeRight;

    // Combine the fog color with edge fading
    fogColor.a *= edgeFade;

    // Blend fog color based on its alpha
    gl_FragColor = vec4(fogColor.rgb * fogColor.a, fogColor.a * 0.3); // Adjust alpha for the overall fog effect
}
