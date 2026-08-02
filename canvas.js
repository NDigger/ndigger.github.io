const canvas = document.getElementById("glcanvas");
const gl = canvas.getContext("webgl");

// ===================== SHADERS =====================

const vertexShaderSource = `
attribute vec2 a_position;
varying vec2 v_uv;

void main() {
    v_uv = (a_position + 1.0) * 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const fragmentShaderSource = `
precision highp float;
varying vec2 v_uv;
uniform float u_time;

#define PI 3.14159265

const float starLayers = 8.;

uniform vec2 u_resolution;
uniform vec2 u_offset;
uniform float u_zoom;
uniform float u_seed;

const float t = 0.25;
const vec3 backgroundColorNight = vec3(0.12, 0.15, 0.18);

float random (in vec2 st) {
    return fract(sin(dot(st.xy,
                        vec2(12.9898,78.233)))*
        43758.5453123);
}

float sin1(in float v) {
    return sin(v) * .5 + .5;
}

float drawStars(in vec2 st, in vec2 ast, in float layer) {
    float time = u_time * t * .5;
    float speed = layer/2.;
    float scale = 5.;
    vec2 fst = fract(ast * scale * speed + vec2(0, random(vec2(speed)) * 10.) + u_offset);
    vec2 ist = floor(ast * scale * speed + vec2(0, random(vec2(speed)) * 10.) + u_offset);
    float rnd = random(ist + layer + u_seed);

    if (rnd > .6) {
        return 0.;
    } else {
        float size = 30. * (rnd + .4) * (1. - sin1(time * (rnd * 10. + 5.) + rnd) * .2);
        vec2 pos = vec2(.5) + vec2(random(ist.xy + layer), random(ist)) * .1 +
                   vec2(sin(time * rnd * 2.), cos(time * rnd * 3.)) * .1;

        float circle = 1.-smoothstep(distance(fst, pos) * size, .0, .15);
        float star = circle / starLayers / float(layer * .1);
        float disap = clamp(sin1(time * 2. + rnd * 50.) * 10. - 5., 0., 1.);

        return clamp(star * disap * .3, 0., .3);
    }
}

vec2 getCenterSquareResolution(in vec2 uv) {
    vec2 st = uv / u_resolution;
    st = (st - 0.5) * 2.0;

    float aspect = u_resolution.x / u_resolution.y;

    if (aspect > 1.0)
        st.x *= aspect;
    else
        st.y /= aspect;

    return st * 0.5 + 0.5;
}

float easeOut(float t) {
    float v = clamp(t, 0., 1.);
    return 1.0 - pow((1.0 - v), 3.);
}

const float startDistance = 1.;

void main() {

    vec2 st = getCenterSquareResolution(v_uv * u_resolution);

    st -= .5;

    vec2 ast = st;

    st *= u_zoom;
    st.x += u_seed * 500.;

    vec3 color = vec3(backgroundColorNight);

    float time = u_time * .2;

    st.y += startDistance;
    st.y -= easeOut(pow(u_time, .5) / 2.) * startDistance;

    ast.y += startDistance;
    ast.y -= easeOut(pow(u_time, .5) / 2.) * startDistance;

    st += u_offset;

    for (int i = 1; i < int(starLayers + 1.); i++) {
        color += vec3(drawStars(st, (ast + vec2(0., 1.)) * u_zoom, float(i)));
    }

    st.x *= 1.2;

    ast *= clamp(u_zoom, 1., 2.);

    float distanceNightCircle =
        clamp(1.65-length(ast) * 0.9, 0., 1.) +
        backgroundColorNight.r;

    distanceNightCircle -= random(ast) * .03;

    color = clamp(color, vec3(0.), vec3(1.));
    color *= clamp(distanceNightCircle, 0., 1.);

    color = mix(color, vec3(backgroundColorNight), clamp(st.y/50., 0., 1.));

    gl_FragColor = vec4(color,1.0);
}
`;

// ===================== SHADER COMPILER =====================

function createShader(type, source) {
    const shader = gl.createShader(type);

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }

    return shader;
}

const vs = createShader(gl.VERTEX_SHADER, vertexShaderSource);
const fs = createShader(gl.FRAGMENT_SHADER, fragmentShaderSource);

const program = gl.createProgram();

gl.attachShader(program, vs);
gl.attachShader(program, fs);
gl.linkProgram(program);

if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(program));
}

gl.useProgram(program);

// ===================== FULLSCREEN RECT =====================

const vertices = new Float32Array([
    -1, -1,
     1, -1,
    -1,  1,
    -1,  1,
     1, -1,
     1,  1
]);

const buffer = gl.createBuffer();

gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

const pos = gl.getAttribLocation(program, "a_position");

gl.enableVertexAttribArray(pos);
gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

// ===================== UNIFORMS =====================

const u_resolution = gl.getUniformLocation(program, "u_resolution");

function setUniformRes() {
    gl.uniform2f(u_resolution, window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", setUniformRes);

const u_offset = gl.getUniformLocation(program, "u_offset");
const u_time = gl.getUniformLocation(program, "u_time");
const u_seed = gl.getUniformLocation(program, "u_seed");
const u_zoom = gl.getUniformLocation(program, "u_zoom");

// ===================== CAMERA =====================

const offsetMult = .5;

function getShaderZoom() {
    return 1 / (
        Math.round((window.outerWidth / window.innerWidth) * 100) / 100
    );
}

window.addEventListener("resize", () => {
    gl.uniform1f(u_zoom, getShaderZoom());
});

window.addEventListener('load', () => {
    gl.uniform1f(u_zoom, getShaderZoom());
    setUniformRes();
    gl.uniform2f(u_offset, 0, 0);
    gl.uniform1f(u_seed, Math.random());
})

// ===================== RENDER =====================

const body = document.querySelector('body');
function render(time) {
    gl.uniform1f(u_time, time / 1000);
    gl.uniform2f(u_offset, performance.now() * 0.00003,  body.scrollTop * -0.002);
    gl.drawArrays(gl.TRIANGLES, 0, 6);

    requestAnimationFrame(render);
}

requestAnimationFrame(render);