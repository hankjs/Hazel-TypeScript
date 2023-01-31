precision mediump float;
attribute vec3 a_Position;

varying vec3 v_Color;

void main() {
    gl_Position = vec4(a_Position, 1.0);
    v_Color = a_Position * 0.5 + 0.5;
}