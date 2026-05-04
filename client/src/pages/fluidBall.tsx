import { useEffect, useRef } from "react";
import "../styles/global.css";

const updateVS = `#version 300 es
precision highp float;
layout(location=0) in vec2 a_pos;
layout(location=1) in vec2 a_vel;
out vec2 v_pos;
out vec2 v_vel;
uniform vec2  u_mouse;
uniform float u_down;
uniform float u_force;
uniform float u_radius;
uniform float u_damping;
void main() {
    vec2 vel = a_vel;
    vec2 pos = a_pos;
    if (u_down > 0.5) {
        vec2  diff = pos - u_mouse;
        float dist = length(diff);
        if (dist < u_radius && dist > 0.001) {
            float strength = (1.0 - dist / u_radius) * u_force;
            vel += normalize(diff) * strength;
        }
    }
    vel *= u_damping;
    pos += vel;
    if (pos.x >  1.0) { pos.x =  1.0; vel.x *= -0.5; }
    if (pos.x < -1.0) { pos.x = -1.0; vel.x *= -0.5; }
    if (pos.y >  1.0) { pos.y =  1.0; vel.y *= -0.5; }
    if (pos.y < -1.0) { pos.y = -1.0; vel.y *= -0.5; }
    v_pos = pos;
    v_vel = vel;
}`;

const updateFS = `#version 300 es
precision highp float;
out vec4 o;
void main() { o = vec4(0.0); }`;

const renderVS = `#version 300 es
precision highp float;
layout(location=0) in vec2 a_pos;
layout(location=1) in vec2 a_vel;
out float v_speed;
void main() {
    gl_Position  = vec4(a_pos, 0.0, 1.0);
    gl_PointSize = 4.0;
    v_speed = clamp(length(a_vel) * 40.0, 0.0, 1.0);
}`;

const renderFS = `#version 300 es
precision highp float;
in float v_speed;
out vec4 o;
void main() {
    vec2  uv   = gl_PointCoord * 2.0 - 1.0;
    float fade = 1.0 - smoothstep(0.6, 1.0, length(uv));
    vec3 slow = vec3(0.1, 0.4, 1.0);
    vec3 fast = vec3(1.0, 0.35, 0.05);
    vec3 col  = mix(slow, fast, v_speed);
    o = vec4(col, fade * 0.75);
}`;

const N = 30000;

export default function ParticleSim() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({
    force: 0.08,
    radius: 0.25,
    damping: 0.97,
    mx: 0,
    my: 0,
    down: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;

    function resize() {
      if (!canvas) return;
      canvas.width  = window.innerWidth  * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width  = window.innerWidth  + "px";
      canvas.style.height = window.innerHeight + "px";
    }
    resize();
    window.addEventListener("resize", resize);

    const gl = canvas.getContext("webgl2");
    if (!gl) { alert("WebGL2 not supported"); return; }

    function ndcX(clientX: number) {
      const rect = canvas!.getBoundingClientRect();
      return ((clientX - rect.left) / rect.width) * 2 - 1;
    }
    function ndcY(clientY: number) {
      const rect = canvas!.getBoundingClientRect();
      return -(((clientY - rect.top) / rect.height) * 2 - 1);
    }

    const onMouseDown  = (e: MouseEvent) => { stateRef.current.down = 1; stateRef.current.mx = ndcX(e.clientX); stateRef.current.my = ndcY(e.clientY); };
    const onMouseUp    = () => { stateRef.current.down = 0; };
    const onMouseMove  = (e: MouseEvent) => { stateRef.current.mx = ndcX(e.clientX); stateRef.current.my = ndcY(e.clientY); };
    const onTouchStart = (e: TouchEvent) => { e.preventDefault(); stateRef.current.down = 1; stateRef.current.mx = ndcX(e.touches[0].clientX); stateRef.current.my = ndcY(e.touches[0].clientY); };
    const onTouchEnd   = () => { stateRef.current.down = 0; };
    const onTouchMove  = (e: TouchEvent) => { e.preventDefault(); stateRef.current.mx = ndcX(e.touches[0].clientX); stateRef.current.my = ndcY(e.touches[0].clientY); };

    canvas.addEventListener("mousedown",  onMouseDown);
    canvas.addEventListener("mouseup",    onMouseUp);
    canvas.addEventListener("mouseleave", onMouseUp);
    canvas.addEventListener("mousemove",  onMouseMove);
    canvas.addEventListener("touchstart", onTouchStart, { passive: false });
    canvas.addEventListener("touchend",   onTouchEnd);
    canvas.addEventListener("touchmove",  onTouchMove,  { passive: false });

    function makeShader(type: number, src: string): WebGLShader {
      const s = gl!.createShader(type)!;
      gl!.shaderSource(s, src);
      gl!.compileShader(s);
      if (!gl!.getShaderParameter(s, gl!.COMPILE_STATUS))
        throw new Error(gl!.getShaderInfoLog(s) ?? "Shader error");
      return s;
    }

    function makeProgram(vsSrc: string, fsSrc: string, varyings?: string[]): WebGLProgram {
      const p = gl!.createProgram()!;
      gl!.attachShader(p, makeShader(gl!.VERTEX_SHADER,   vsSrc));
      gl!.attachShader(p, makeShader(gl!.FRAGMENT_SHADER, fsSrc));
      if (varyings) gl!.transformFeedbackVaryings(p, varyings, gl!.INTERLEAVED_ATTRIBS);
      gl!.linkProgram(p);
      if (!gl!.getProgramParameter(p, gl!.LINK_STATUS))
        throw new Error(gl!.getProgramInfoLog(p) ?? "Link error");
      return p;
    }

    function makeBuffer(fill: boolean): WebGLBuffer {
      const buf = gl!.createBuffer()!;
      gl!.bindBuffer(gl!.ARRAY_BUFFER, buf);
      if (fill) {
        const data = new Float32Array(N * 4);
        for (let i = 0; i < N; i++) {
          data[i * 4 + 0] = Math.random() * 2 - 1;
          data[i * 4 + 1] = Math.random() * 2 - 1;
          data[i * 4 + 2] = 0;
          data[i * 4 + 3] = 0;
        }
        gl!.bufferData(gl!.ARRAY_BUFFER, data, gl!.DYNAMIC_COPY);
      } else {
        gl!.bufferData(gl!.ARRAY_BUFFER, N * 16, gl!.DYNAMIC_COPY);
      }
      gl!.bindBuffer(gl!.ARRAY_BUFFER, null);
      return buf;
    }

    function makeVAO(buf: WebGLBuffer): WebGLVertexArrayObject {
      const vao = gl!.createVertexArray()!;
      gl!.bindVertexArray(vao);
      gl!.bindBuffer(gl!.ARRAY_BUFFER, buf);
      gl!.enableVertexAttribArray(0);
      gl!.vertexAttribPointer(0, 2, gl!.FLOAT, false, 16, 0);
      gl!.enableVertexAttribArray(1);
      gl!.vertexAttribPointer(1, 2, gl!.FLOAT, false, 16, 8);
      gl!.bindVertexArray(null);
      gl!.bindBuffer(gl!.ARRAY_BUFFER, null);
      return vao;
    }

    const updateProg = makeProgram(updateVS, updateFS, ["v_pos", "v_vel"]);
    const renderProg = makeProgram(renderVS, renderFS);

    let bufA = makeBuffer(true),  bufB = makeBuffer(false);
    let vaoA = makeVAO(bufA),     vaoB = makeVAO(bufB);
    let readVAO = vaoA, writeVAO = vaoB, writeBuf = bufB;

    const tf = gl.createTransformFeedback()!;

    const uMouse   = gl.getUniformLocation(updateProg, "u_mouse")!;
    const uDown    = gl.getUniformLocation(updateProg, "u_down")!;
    const uForce   = gl.getUniformLocation(updateProg, "u_force")!;
    const uRadius  = gl.getUniformLocation(updateProg, "u_radius")!;
    const uDamping = gl.getUniformLocation(updateProg, "u_damping")!;

    (canvas as any).__reset = () => {
      bufA = makeBuffer(true);  bufB = makeBuffer(false);
      vaoA = makeVAO(bufA);     vaoB = makeVAO(bufB);
      readVAO = vaoA; writeVAO = vaoB; writeBuf = bufB;
    };

    let rafId: number;

function frame() {
  if (!gl) return;
  rafId = requestAnimationFrame(frame);
  const { mx, my, down, force, radius, damping } = stateRef.current;

  gl.viewport(0, 0, canvas!.width, canvas!.height);

  gl.useProgram(updateProg);
  gl.uniform2f(uMouse,   mx, my);
  gl.uniform1f(uDown,    down);
  gl.uniform1f(uForce,   force);
  gl.uniform1f(uRadius,  radius);
  gl.uniform1f(uDamping, damping);

  gl.bindVertexArray(readVAO);
  gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, tf);
  gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, 0, writeBuf);
  gl.enable(gl.RASTERIZER_DISCARD);
  gl.beginTransformFeedback(gl.POINTS);
  gl.drawArrays(gl.POINTS, 0, N);
  gl.endTransformFeedback();
  gl.disable(gl.RASTERIZER_DISCARD);
  gl.bindVertexArray(null);
  gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, null);

  gl.clearColor(0.02, 0.02, 0.06, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.useProgram(renderProg);
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
  gl.bindVertexArray(writeVAO);
  gl.drawArrays(gl.POINTS, 0, N);
  gl.disable(gl.BLEND);
  gl.bindVertexArray(null);

  [readVAO, writeVAO] = [writeVAO, readVAO];
  [bufA,    bufB]     = [bufB,     bufA];
  writeBuf = bufB;
}

    frame();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousedown",  onMouseDown);
      canvas.removeEventListener("mouseup",    onMouseUp);
      canvas.removeEventListener("mouseleave", onMouseUp);
      canvas.removeEventListener("mousemove",  onMouseMove);
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchend",   onTouchEnd);
      canvas.removeEventListener("touchmove",  onTouchMove);
    };
  }, []);

  return (
    <div className="particle-wrapper">
      <canvas ref={canvasRef} className="particle-canvas" />
      <div className="particle-controls">
        <label>
          Force
          <input type="range" min="0.01" max="0.3" step="0.01" defaultValue="0.08"
            onChange={e => { stateRef.current.force = +e.target.value; }} />
        </label>
        <label>
          Radius
          <input type="range" min="0.05" max="0.6" step="0.01" defaultValue="0.25"
            onChange={e => { stateRef.current.radius = +e.target.value; }} />
        </label>
        <label>
          Damping
          <input type="range" min="0.9" max="0.999" step="0.001" defaultValue="0.97"
            onChange={e => { stateRef.current.damping = +e.target.value; }} />
        </label>
        <button onClick={() => (canvasRef.current as any)?.__reset?.()}>
          Reset
        </button>
      </div>
    </div>
  );
}