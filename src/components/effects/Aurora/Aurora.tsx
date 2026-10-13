/**
 * Aurora — 极光流动背景（裸 WebGL2 shader）。
 *
 * 参考：React Bits `Aurora` / `Soft Aurora` 的视觉语言。
 * 与 Beams 的区别：Beams 是**直线光束**沿固定角度扫过；Aurora 是**多层竖直光帘**
 * 被噪声横向推挤、缓慢起伏 —— 更像真实极光，也更柔。
 *
 * ⚠️ 豁免说明（CODE_STYLE.md R1）：与 Beams 同属单一职责的渲染管线，
 * 内聚性高，拆开反而更难维护。已登记 docs/CODE_STYLE.md 豁免清单。
 *
 * 技术：raw WebGL2（零 npm 依赖），单 pass，无 framebuffer。
 * @see src/config/effects.ts EFFECT_REGISTRY.heroBackground
 */

'use client';

import { useEffect, useRef } from 'react';
import { auroraConfig } from './aurora.config';

const QUAD_VERTEX = `#version 300 es
in vec2 aPosition;
void main() { gl_Position = vec4(aPosition, 0.0, 1.0); }`;

const FRAGMENT = `#version 300 es
precision highp float;

uniform vec2  uResolution;
uniform float uTime;
uniform vec2  uMouse;
uniform float uIntensity;
uniform float uGrain;
uniform vec3  uColorA;
uniform vec3  uColorB;
uniform vec3  uBase;

out vec4 outColor;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) { v += a * noise(p); p *= 2.03; a *= 0.5; }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  float aspect = uResolution.x / max(uResolution.y, 1.0);
  vec2 p = vec2(uv.x * aspect, uv.y);

  float t = uTime * 0.05;
  vec2 pointer = (uMouse - 0.5) * 0.10;

  // ── 多层竖直光帘：噪声决定每一层光带在水平方向的位置 ──
  float acc = 0.0;
  float warm = 0.0;
  for (int i = 0; i < 5; i++) {
    float fi = float(i);
    float speed = 0.55 + fi * 0.22;
    float scale = 1.15 + fi * 0.55;

    vec2 np = vec2(p.x * scale + fi * 13.7 + pointer.x, p.y * 1.7 - t * speed * 2.2 + pointer.y);
    float n = fbm(np);

    // 光带中心：随噪声在水平方向漂移；整体偏右，把左半屏留给标题
    float center = 0.62 + (n - 0.5) * 0.78;
    float d = abs(uv.x - center);
    // 指数适中 → 光帘有宽度、能看清形状，又不至于糊成一团
    float band = exp(-d * d * 45.0);

    // 竖直方向：上下都淡出，形成"悬挂的光帘"
    float vfade = smoothstep(0.0, 0.26, uv.y) * smoothstep(1.15, 0.60, uv.y);

    float w = 0.35 + 0.65 * n;
    acc += band * vfade * w;
    warm += band * vfade * w * smoothstep(0.45, 1.0, uv.y);
  }
  // ⚠️ 必须归一化：5 层叠加不除会直接过曝成白团
  acc /= 5.0;
  warm /= 5.0;

  // ── 上色：低处偏紫，高处偏青 ──
  float g = clamp(uv.y * 1.15 - 0.05, 0.0, 1.0);
  vec3 tint = mix(uColorA, uColorB, g);

  vec3 col = uBase;
  col += tint * acc * uIntensity;
  col += mix(uColorA, uColorB, 0.7) * warm * 0.5 * uIntensity;

  // ── 左侧压暗：Hero 标题在左边，必须保证文字可读 ──
  col *= mix(0.14, 1.0, smoothstep(0.0, 0.72, uv.x));

  // ── 暗角 ──
  vec2 vc = (uv - 0.5) * vec2(1.0, 1.15);
  col *= 1.0 - 0.45 * dot(vc, vc);

  // ── 胶片颗粒 ──
  col -= (hash(gl_FragCoord.xy + uTime) - 0.5) / 255.0 * uGrain;

  outColor = vec4(max(col, 0.0), 1.0);
}`;

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

const compile = (gl: WebGL2RenderingContext, type: number, source: string) => {
  const s = gl.createShader(type);
  if (!s) return null;
  gl.shaderSource(s, source);
  gl.compileShader(s);
  if (gl.getShaderParameter(s, gl.COMPILE_STATUS)) return s;
  gl.deleteShader(s);
  return null;
};

const link = (gl: WebGL2RenderingContext) => {
  const vs = compile(gl, gl.VERTEX_SHADER, QUAD_VERTEX);
  const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
  const p = gl.createProgram();
  if (!vs || !fs || !p) return null;
  gl.attachShader(p, vs);
  gl.attachShader(p, fs);
  gl.bindAttribLocation(p, 0, 'aPosition');
  gl.linkProgram(p);
  gl.deleteShader(vs);
  gl.deleteShader(fs);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
    gl.deleteProgram(p);
    return null;
  }
  return p;
};

export default function Aurora() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const gl = canvas?.getContext('webgl2', {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: 'high-performance',
    });
    if (!container || !canvas || !gl) return undefined;

    const program = link(gl);
    if (!program) return undefined;

    const buffer = gl.createBuffer();
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    const u = (name: string) => gl.getUniformLocation(program, name);
    const uResolution = u('uResolution');
    const uTime = u('uTime');
    const uMouse = u('uMouse');
    const uIntensity = u('uIntensity');
    const uGrain = u('uGrain');
    const uColorA = u('uColorA');
    const uColorB = u('uColorB');
    const uBase = u('uBase');

    const cfg = auroraConfig;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    const pointer = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    let raf = 0;
    let last = 0;
    let clock = 0;
    let visible = true;
    let dpr = 1;

    const draw = () => {
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.useProgram(program);
      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.uniform1f(uTime, clock);
      gl.uniform2f(uMouse, pointer.x, pointer.y);
      gl.uniform1f(uIntensity, cfg.intensity);
      gl.uniform1f(uGrain, cfg.grain);
      gl.uniform3fv(uColorA, cfg.colorA);
      gl.uniform3fv(uColorB, cfg.colorB);
      gl.uniform3fv(uBase, cfg.base);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const frame = (now: number) => {
      raf = 0;
      if (!visible || document.hidden) return;
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 1 / 60;
      last = now;

      if (!reduce) clock += dt * cfg.speed;

      const follow = 1 - Math.exp(-dt * 3);
      pointer.x += (pointer.tx - pointer.x) * follow;
      pointer.y += (pointer.ty - pointer.y) * follow;

      draw();

      const settling =
        Math.abs(pointer.tx - pointer.x) + Math.abs(pointer.ty - pointer.y) > 0.001;
      if ((!reduce && !cfg.paused) || settling) raf = requestAnimationFrame(frame);
      else last = 0;
    };

    const wake = () => {
      if (!raf && visible && !document.hidden) raf = requestAnimationFrame(frame);
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, cfg.maxDpr);
      const w = Math.max(1, container.clientWidth);
      const h = Math.max(1, container.clientHeight);
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      draw();
      wake();
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      pointer.tx = clamp((e.clientX - rect.left) / Math.max(rect.width, 1), 0, 1);
      pointer.ty = clamp(1 - (e.clientY - rect.top) / Math.max(rect.height, 1), 0, 1);
      wake();
    };

    const resizeObs = new ResizeObserver(resize);
    resizeObs.observe(container);
    const intersectObs = new IntersectionObserver((entries) => {
      visible = entries.some((e) => e.isIntersecting);
      if (visible) {
        last = 0;
        wake();
      }
    });
    intersectObs.observe(container);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    resize();

    return () => {
      cancelAnimationFrame(raf);
      resizeObs.disconnect();
      intersectObs.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      gl.deleteProgram(program);
      gl.deleteBuffer(buffer);
      gl.deleteVertexArray(vao);
      // 同 Beams：不调用 loseContext，避免 StrictMode 二次挂载拿到已丢失的上下文
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full" aria-hidden="true" />
    </div>
  );
}
