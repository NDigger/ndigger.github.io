const canvas = document.getElementById("glcanvas");
const gl = canvas.getContext("webgl");

function getShader(id, type) {
  const src = document.getElementById(id).textContent;
  const shader = gl.createShader(type);
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
  }
  return shader;
}

const vs = getShader("vs", gl.VERTEX_SHADER);
const fs = getShader("fs", gl.FRAGMENT_SHADER);

const program = gl.createProgram();
gl.attachShader(program, vs);
gl.attachShader(program, fs);
gl.linkProgram(program);
gl.useProgram(program);

// Fullscreen Rect
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

gl.drawArrays(gl.TRIANGLES, 0, 6);


const u_resolution = gl.getUniformLocation(program, "u_resolution");
const setUniformRes = () => gl.uniform2f(u_resolution, window.innerWidth, window.innerHeight);
setUniformRes()
window.addEventListener('resize', setUniformRes)

const u_offset = gl.getUniformLocation(program, "u_offset");
gl.uniform2f(u_offset, 0, 0);

const offsetMult = .5;
let offsetYTarget = -.5*offsetMult;
let offsetY = -.5*offsetMult;

document.addEventListener('pointermove', e => {
  const w = window.innerWidth;
  const h = window.innerHeight;
  offsetYTarget = (1.-(e.pageY/h)-.5)*offsetMult;
})

const u_time = gl.getUniformLocation(program, "u_time");
const nav = performance.getEntriesByType("navigation")[0];
const bonus = nav.type === "reload" ? 5 : 0;

const u_seed = gl.getUniformLocation(program, "u_seed");
gl.uniform1f(u_seed, Math.random())

// catgpt
let scrollPosX = 0;
let targetPosX = 0;
let velocityX = 0;
let isDragging = false;
let lastMouseX = 0;
let lastTime = 0;

const body = document.querySelector('body');
body.addEventListener('mousedown', (e) => {
  if (e.target !== body) return
  isDragging = true;
  lastMouseX = e.clientX;
  lastTime = performance.now();
});

body.addEventListener('mousemove', (e) => {
  if (isDragging) {
    let now = performance.now();
    let deltaX = e.clientX - lastMouseX;
    let deltaTime = (now - lastTime) / 1000;
    velocityX = deltaX / deltaTime;

    targetPosX += deltaX;
    lastMouseX = e.clientX;
    lastTime = now;
  }
});

body.addEventListener('mouseup', () => {
  isDragging = false;
});

function animate() {
  if (!isDragging) {
    velocityX *= 0.98;
    targetPosX += velocityX * 0.016;
  }

  scrollPosX += (targetPosX - scrollPosX) * 0.1;
  requestAnimationFrame(animate);
}

animate();
//

const u_zoom = gl.getUniformLocation(program, "u_zoom");
let offsetX = 0;
let lasttime = performance.now();
function render(time) {
  gl.uniform1f(u_time, time/1000 + bonus);

  const dt = time - lasttime;
  lasttime = time;

  offsetX += dt/10000 * (velocityX <= 0 ? 1 : -1);
  offsetY += (offsetYTarget - offsetY)/300
  gl.uniform2f(u_offset, offsetX, offsetY);
  gl.uniform2f(gl.getUniformLocation(program, "u_scrollOffset"), -scrollPosX/3000, 0);

  const zoom = Math.round((window.outerWidth / window.innerWidth) * 100) / 100;
  gl.uniform1f(u_zoom, 1/zoom);

  gl.drawArrays(gl.TRIANGLES, 0, 6);
  requestAnimationFrame(render);
}
requestAnimationFrame(render);

