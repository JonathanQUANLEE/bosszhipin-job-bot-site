(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,22655,e=>{"use strict";var t=e.i(43476),o=e.i(71645);let i=[.486,.227,.929],r=[.133,.827,.933],a=[.043,.035,.078],n=1,u=1.9,l=4,c=2,f=!1,s=`#version 300 es
in vec2 aPosition;
void main() { gl_Position = vec4(aPosition, 0.0, 1.0); }`,m=`#version 300 es
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
}`,d=(e,t,o)=>Math.min(o,Math.max(t,e)),h=(e,t,o)=>{let i=e.createShader(t);return i?(e.shaderSource(i,o),e.compileShader(i),e.getShaderParameter(i,e.COMPILE_STATUS))?i:(e.deleteShader(i),null):null};e.s(["default",0,function(){let e=(0,o.useRef)(null),v=(0,o.useRef)(null);return(0,o.useEffect)(()=>{let t,o,x,p=e.current,g=v.current,y=g?.getContext("webgl2",{alpha:!1,antialias:!1,depth:!1,stencil:!1,powerPreference:"high-performance"});if(!p||!g||!y)return;let A=(t=h(y,y.VERTEX_SHADER,s),o=h(y,y.FRAGMENT_SHADER,m),x=y.createProgram(),t&&o&&x?(y.attachShader(x,t),y.attachShader(x,o),y.bindAttribLocation(x,0,"aPosition"),y.linkProgram(x),y.deleteShader(t),y.deleteShader(o),y.getProgramParameter(x,y.LINK_STATUS))?x:(y.deleteProgram(x),null):null);if(!A)return;let w=y.createBuffer(),b=y.createVertexArray();y.bindVertexArray(b),y.bindBuffer(y.ARRAY_BUFFER,w),y.bufferData(y.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),y.STATIC_DRAW),y.enableVertexAttribArray(0),y.vertexAttribPointer(0,2,y.FLOAT,!1,0,0);let R=y.getUniformLocation(A,"uResolution"),M=y.getUniformLocation(A,"uTime"),C=y.getUniformLocation(A,"uMouse"),P=y.getUniformLocation(A,"uIntensity"),S=y.getUniformLocation(A,"uGrain"),T=y.getUniformLocation(A,"uColorA"),B=y.getUniformLocation(A,"uColorB"),L=y.getUniformLocation(A,"uBase"),U=window.matchMedia?.("(prefers-reduced-motion: reduce)").matches??!1,E={x:.5,y:.5,tx:.5,ty:.5},F=0,I=0,_=0,O=!0,G=1,N=()=>{y.viewport(0,0,g.width,g.height),y.useProgram(A),y.uniform2f(R,g.width,g.height),y.uniform1f(M,_),y.uniform2f(C,E.x,E.y),y.uniform1f(P,u),y.uniform1f(S,l),y.uniform3fv(T,i),y.uniform3fv(B,r),y.uniform3fv(L,a),y.drawArrays(y.TRIANGLES,0,3)},V=e=>{if(F=0,!O||document.hidden)return;let t=I?Math.min(.05,(e-I)/1e3):1/60;I=e,U||(_+=t*n);let o=1-Math.exp(-(3*t));E.x+=(E.tx-E.x)*o,E.y+=(E.ty-E.y)*o,N();let i=Math.abs(E.tx-E.x)+Math.abs(E.ty-E.y)>.001;(U||f)&&!i?I=0:F=requestAnimationFrame(V)},D=()=>{F||!O||document.hidden||(F=requestAnimationFrame(V))},H=()=>{G=Math.min(window.devicePixelRatio||1,c);let e=Math.max(1,p.clientWidth),t=Math.max(1,p.clientHeight);g.width=Math.max(1,Math.round(e*G)),g.height=Math.max(1,Math.round(t*G)),N(),D()},j=e=>{let t=p.getBoundingClientRect();E.tx=d((e.clientX-t.left)/Math.max(t.width,1),0,1),E.ty=d(1-(e.clientY-t.top)/Math.max(t.height,1),0,1),D()},K=new ResizeObserver(H);K.observe(p);let Y=new IntersectionObserver(e=>{(O=e.some(e=>e.isIntersecting))&&(I=0,D())});return Y.observe(p),window.addEventListener("pointermove",j,{passive:!0}),H(),()=>{cancelAnimationFrame(F),K.disconnect(),Y.disconnect(),window.removeEventListener("pointermove",j),y.deleteProgram(A),y.deleteBuffer(w),y.deleteVertexArray(b)}},[]),(0,t.jsx)("div",{ref:e,className:"absolute inset-0 overflow-hidden",children:(0,t.jsx)("canvas",{ref:v,className:"absolute inset-0 block h-full w-full","aria-hidden":"true"})})}],22655)},77811,function(e){e.n(e.i(22655))}]);