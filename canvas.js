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

document.addEventListener('mousemove', e => {
  const w = window.innerWidth;
  const h = window.innerHeight;
  offsetYTarget = (1.-(e.pageY/h)-.5)*offsetMult;
})

const u_time = gl.getUniformLocation(program, "u_time");
// const seed = Math.random() * 99999
// let bonus = 0
const nav = performance.getEntriesByType("navigation")[0];
const bonus = nav.type === "reload" ? 5 : 0;

function render(time) {
  // if (bonus < 500) bonus += 1 / (Math.pow(time, 1.4)*0.001);
  gl.uniform1f(u_time, time * 0.001 + bonus);

  offsetY += (offsetYTarget - offsetY)/300
  gl.uniform2f(u_offset, 0, offsetY);

  gl.drawArrays(gl.TRIANGLES, 0, 6);
  requestAnimationFrame(render);
}
requestAnimationFrame(render);

