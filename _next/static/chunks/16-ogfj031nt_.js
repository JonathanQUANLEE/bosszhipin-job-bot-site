(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,76513,e=>{"use strict";var t=e.i(43476),o=e.i(71645);let r="#5DCAA5",a=140,i=30,l=1,n=233,u=1,c=.6,f=0,m=.3,g=.6,d=1.6,v=0,h=.35,s=.75,x=!0,y=1,P=0,p=1,T=!1,E=`#version 300 es
in vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`,b=`#version 300 es
precision highp float;
uniform vec2 uView;
uniform vec2 uScale;
uniform vec2 uTurn;
uniform float uTime;
uniform float uWidth;
uniform float uWave;
uniform float uDepth;
uniform float uRough;
uniform float uSeed;
uniform float uTwist;
uniform vec3 uLight;
uniform float uFill;
uniform float uCamera;
uniform vec4 uPointer;
out vec4 outColor;

const float PI = 3.141592653589793;

vec4 permute(vec4 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
vec3 fade(vec3 t) { return t * t * t * (t * (t * 6.0 - 15.0) + 10.0); }

float cnoise(vec3 P) {
  vec3 Pi0 = floor(P); vec3 Pi1 = Pi0 + vec3(1.0);
  Pi0 = mod(Pi0, 289.0); Pi1 = mod(Pi1, 289.0);
  vec3 Pf0 = fract(P); vec3 Pf1 = Pf0 - vec3(1.0);
  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  vec4 iy = vec4(Pi0.yy, Pi1.yy);
  vec4 iz0 = Pi0.zzzz; vec4 iz1 = Pi1.zzzz;
  vec4 ixy = permute(permute(ix) + iy);
  vec4 ixy0 = permute(ixy + iz0); vec4 ixy1 = permute(ixy + iz1);
  vec4 gx0 = ixy0 / 7.0; vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5; gx0 = fract(gx0);
  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0); vec4 sz0 = step(gz0, vec4(0.0));
  gx0 -= sz0 * (step(0.0, gx0) - 0.5); gy0 -= sz0 * (step(0.0, gy0) - 0.5);
  vec4 gx1 = ixy1 / 7.0; vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5; gx1 = fract(gx1);
  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1); vec4 sz1 = step(gz1, vec4(0.0));
  gx1 -= sz1 * (step(0.0, gx1) - 0.5); gy1 -= sz1 * (step(0.0, gy1) - 0.5);
  vec3 g000 = vec3(gx0.x, gy0.x, gz0.x); vec3 g100 = vec3(gx0.y, gy0.y, gz0.y);
  vec3 g010 = vec3(gx0.z, gy0.z, gz0.z); vec3 g110 = vec3(gx0.w, gy0.w, gz0.w);
  vec3 g001 = vec3(gx1.x, gy1.x, gz1.x); vec3 g101 = vec3(gx1.y, gy1.y, gz1.y);
  vec3 g011 = vec3(gx1.z, gy1.z, gz1.z); vec3 g111 = vec3(gx1.w, gy1.w, gz1.w);
  vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
  g000 *= norm0.x; g010 *= norm0.y; g100 *= norm0.z; g110 *= norm0.w;
  vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
  g001 *= norm1.x; g011 *= norm1.y; g101 *= norm1.z; g111 *= norm1.w;
  float n000 = dot(g000, Pf0); float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z)); float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z)); float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz)); float n111 = dot(g111, Pf1);
  vec3 fade_xyz = fade(Pf0);
  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
  return 2.2 * mix(n_yz.x, n_yz.y, fade_xyz.x);
}

float laneHash(float lane) {
  return fract(sin(lane * 91.3458 + uSeed * 17.17) * 47453.5453);
}

float lobe(float nh, float nl, float nv, float vh, float roughness) {
  float a = roughness * roughness, a2 = a * a;
  float d = nh * nh * (a2 - 1.0) + 1.0;
  float distribution = a2 / (PI * d * d);
  float gv = nl * sqrt(nv * nv * (1.0 - a2) + a2);
  float gl = nv * sqrt(nl * nl * (1.0 - a2) + a2);
  float visibility = 0.5 / max(gv + gl, 0.0001);
  float fresnel = 0.028 + 0.972 * pow(1.0 - vh, 5.0);
  return distribution * visibility * fresnel * nl;
}

vec2 glint(float lane, vec2 local) {
  float along = local.y / uWave - laneHash(lane) * 60.0;
  float step = 0.01;
  float slope = (cnoise(vec3(0.0, along + step, uTime)) - cnoise(vec3(0.0, along - step, uTime))) / (2.0 * step);
  slope *= 0.2 * uDepth;
  float spin = laneHash(lane + 0.37);
  float tilt = ((spin - 0.5) * 0.5 + sin(uTime * 2.1 + spin * 6.2831) * 0.06) * uTwist;
  vec3 normal = normalize(vec3(tilt, -slope, 1.0));
  vec3 view = normalize(vec3(-local, uCamera));
  float nv = max(dot(normal, view), 0.0001);
  vec3 light = normalize(uLight);
  vec3 halfway = normalize(light + view);
  float core = lobe(max(dot(normal, halfway), 0.0), max(dot(normal, light), 0.0), nv, max(dot(view, halfway), 0.0), uRough);
  vec3 fill = normalize(vec3(0.0, -uLight.y * 1.25, uLight.z));
  vec3 fillHalf = normalize(fill + view);
  core += uFill * lobe(max(dot(normal, fillHalf), 0.0), max(dot(normal, fill), 0.0), nv, max(dot(view, fillHalf), 0.0), uRough);
  return vec2(core, core);
}

void main() {
  vec2 css = gl_FragCoord.xy * uScale;
  vec2 centered = css - uView * 0.5;
  vec2 local = mat2(uTurn.x, -uTurn.y, uTurn.y, uTurn.x) * centered;
  float across = local.x / uWidth + 0.5;
  float lane = floor(across); float u = across - lane;
  vec2 value = glint(lane, local);
  float pixel = max(uScale.x, uScale.y);
  float seam = min(u, 1.0 - u) * uWidth;
  if (seam < pixel * 1.5) {
    float other = u < 0.5 ? lane - 1.0 : lane + 1.0;
    float blend = 0.5 * (1.0 - smoothstep(0.0, pixel * 1.5, seam));
    value = mix(value, glint(other, local), blend);
  }
  vec2 toPointer = css - uPointer.xy;
  float near = exp(-dot(toPointer, toPointer) / (2.0 * uPointer.w * uPointer.w)) * uPointer.z;
  value *= 1.0 + near * 0.8;
  float hot = max(value.y - 0.18, 0.0);
  outColor = vec4(value.x, value.y, min(hot, 6.0), 1.0);
}`,w=`#version 300 es
precision highp float;
uniform sampler2D uField;
uniform vec2 uResolution;
uniform vec3 uColor;
uniform vec3 uInk;
uniform float uGain;
uniform float uGlow;
uniform float uPresence;
uniform float uGrain;
uniform float uFade;
uniform float uOpacity;
uniform float uLightMode;
out vec4 outColor;

float random(vec2 st) {
  return fract(sin(dot(st, vec2(12.9898, 78.233))) * 43758.5453123);
}
float grainNoise(vec2 st) {
  vec2 i = floor(st), f = fract(st);
  float a = random(i), b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0)), d = random(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}
vec3 acesFilmic(vec3 color) {
  const mat3 inputMatrix = mat3(vec3(0.59719, 0.07600, 0.02840), vec3(0.35458, 0.90834, 0.13383), vec3(0.04823, 0.01566, 0.83777));
  const mat3 outputMatrix = mat3(vec3(1.60475, -0.10208, -0.00327), vec3(-0.53108, 1.10813, -0.07276), vec3(-0.07367, -0.00605, 1.07602));
  color = inputMatrix * (color / 0.6);
  vec3 a = color * (color + 0.0245786) - 0.000090537;
  vec3 b = color * (0.983729 * color + 0.4329510) + 0.238081;
  color = outputMatrix * (a / b);
  return clamp(color, 0.0, 1.0);
}
vec3 toSrgb(vec3 color) {
  return mix(color * 12.92, 1.055 * pow(color, vec3(1.0 / 2.4)) - 0.055, step(vec3(0.0031308), color));
}
float feather(float x, float edge) {
  float t = clamp(x / max(edge, 0.0001), 0.0, 1.0);
  return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}
void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  float radiance = textureLod(uField, uv, 0.0).r;
  float bloom = 0.0;
  bloom += textureLod(uField, uv, 2.0).b * 0.3;
  bloom += textureLod(uField, uv, 3.0).b * 0.3;
  bloom += textureLod(uField, uv, 4.0).b * 0.22;
  bloom += textureLod(uField, uv, 5.0).b * 0.18;
  float hot = textureLod(uField, uv, 0.0).g;
  vec3 light = uColor * (radiance + bloom * uGlow) * uGain;
  light += mix(uColor, vec3(1.0), 0.7) * hot * hot * 0.12 * uGain;
  light *= uPresence;
  vec3 color = toSrgb(acesFilmic(light));
  color -= grainNoise(gl_FragCoord.xy) / 15.0 * uGrain;
  color = max(color, 0.0);
  float edge = uFade * 0.5;
  float mask = feather(uv.x, edge) * feather(1.0 - uv.x, edge) * feather(uv.y, edge) * feather(1.0 - uv.y, edge);
  mask *= uOpacity;
  float dither = (random(gl_FragCoord.yx + 31.7) - 0.5) / 255.0;
  if (uLightMode > 0.5) {
    float peak = max(color.r, max(color.g, color.b));
    float alpha = clamp(peak * 0.9 + dither, 0.0, 1.0) * mask;
    outColor = vec4(uInk * alpha, alpha);
  } else {
    color = clamp(color + dither, 0.0, 1.0) * mask;
    outColor = vec4(color, max(color.r, max(color.g, color.b)));
  }
}`,z=(e,t,o)=>{let r=e.createShader(t);return r?(e.shaderSource(r,o),e.compileShader(r),e.getShaderParameter(r,e.COMPILE_STATUS))?r:(e.deleteShader(r),null):null},R=(e,t)=>{let o=z(e,e.VERTEX_SHADER,E),r=z(e,e.FRAGMENT_SHADER,t),a=e.createProgram();if(!o||!r||!a)return null;if(e.attachShader(a,o),e.attachShader(a,r),e.bindAttribLocation(a,0,"aPosition"),e.linkProgram(a),e.deleteShader(o),e.deleteShader(r),!e.getProgramParameter(a,e.LINK_STATUS))return e.deleteProgram(a),null;let i={},l=e.getProgramParameter(a,e.ACTIVE_UNIFORMS);for(let t=0;t<l;t++){let o=e.getActiveUniform(a,t);o&&(i[o.name]=e.getUniformLocation(a,o.name))}return{program:a,uniforms:i}};e.s(["default",0,function(){let e=(0,o.useRef)(null),E=(0,o.useRef)(null);return(0,o.useEffect)(()=>{let t=e.current,o=E.current,z=o?.getContext("webgl2",{alpha:!0,premultipliedAlpha:!0,antialias:!1,depth:!1,stencil:!1,powerPreference:"high-performance"});if(!t||!o||!z)return;let M=!!z.getExtension("EXT_color_buffer_float"),A=R(z,b),F=R(z,w);if(!A||!F)return;let _=z.createBuffer(),S=z.createVertexArray();z.bindVertexArray(S),z.bindBuffer(z.ARRAY_BUFFER,_),z.bufferData(z.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),z.STATIC_DRAW),z.enableVertexAttribArray(0),z.vertexAttribPointer(0,2,z.FLOAT,!1,0,0);let L=null,C=z.createFramebuffer(),U={width:0,height:0},I=document.createElement("canvas").getContext("2d",{willReadFrequently:!0}),D=window.matchMedia?.("(prefers-reduced-motion: reduce)").matches??!1,G=new Map,X={width:1,height:1,fieldWidth:1,fieldHeight:1},k={x:0,y:0,inside:!1},B={clock:0,intro:+!!D,reach:0,x:0,y:0,lightY:0},N=0,O=0,W=!0,H=()=>{let e=B.intro**3*(B.intro*(6*B.intro-15)+10);z.bindVertexArray(S),((e,t)=>{if(U.width===e&&U.height===t)return;U.width=e,U.height=t,L&&z.deleteTexture(L),L=z.createTexture(),z.bindTexture(z.TEXTURE_2D,L);let o=Math.floor(Math.log2(Math.max(e,t)))+1;z.texStorage2D(z.TEXTURE_2D,o,M?z.RGBA16F:z.RGBA8,e,t),z.texParameteri(z.TEXTURE_2D,z.TEXTURE_MIN_FILTER,z.LINEAR_MIPMAP_LINEAR),z.texParameteri(z.TEXTURE_2D,z.TEXTURE_MAG_FILTER,z.LINEAR),z.texParameteri(z.TEXTURE_2D,z.TEXTURE_WRAP_S,z.CLAMP_TO_EDGE),z.texParameteri(z.TEXTURE_2D,z.TEXTURE_WRAP_T,z.CLAMP_TO_EDGE),z.bindFramebuffer(z.FRAMEBUFFER,C),z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,L,0)})(X.fieldWidth,X.fieldHeight);let t=i*Math.PI/180,l=-((1-e)*9),s=B.reach*y,x=A.uniforms;z.bindFramebuffer(z.FRAMEBUFFER,C),z.viewport(0,0,U.width,U.height),z.useProgram(A.program),z.uniform2f(x.uView,X.width,X.height),z.uniform2f(x.uScale,X.width/U.width,X.height/U.height),z.uniform2f(x.uTurn,Math.cos(t),Math.sin(t)),z.uniform1f(x.uTime,.12*B.clock%289),z.uniform1f(x.uWidth,a),z.uniform1f(x.uWave,n),z.uniform1f(x.uDepth,u),z.uniform1f(x.uRough,.55-.5*c),z.uniform1f(x.uSeed,v),z.uniform1f(x.uTwist,f),z.uniform1f(x.uFill,m),z.uniform3f(x.uLight,0,3+l+B.lightY*s,10),z.uniform1f(x.uCamera,1.866*X.height),z.uniform4f(x.uPointer,B.x,X.height-B.y,s,.28*Math.max(X.height,X.width)),z.drawArrays(z.TRIANGLES,0,3),z.bindTexture(z.TEXTURE_2D,L),z.generateMipmap(z.TEXTURE_2D);let T=F.uniforms,E=(e=>{let t=G.get(e);if(t)return t;let o=[1,1,1];if(I){I.clearRect(0,0,1,1),I.fillStyle="#ffffff",I.fillStyle=e,I.fillRect(0,0,1,1);let[t,r,a]=I.getImageData(0,0,1,1).data;o=[t,r,a].map(e=>(e/255)**2.2)}return G.set(e,o),o})(r),b=Math.min(1,.18/Math.max(.2126*E[0]+.7152*E[1]+.0722*E[2],.001)),w=E.map(e=>Math.min(1,e*b)**(1/2.2));z.bindFramebuffer(z.FRAMEBUFFER,null),z.viewport(0,0,o.width,o.height),z.useProgram(F.program),z.uniform2f(T.uResolution,o.width,o.height),z.uniform3fv(T.uColor,E),z.uniform3fv(T.uInk,w),z.uniform1f(T.uGain,d),z.uniform1f(T.uGlow,g),z.uniform1f(T.uPresence,e),z.uniform1f(T.uGrain,1.75*h),z.uniform1f(T.uFade,P),z.uniform1f(T.uOpacity,p),z.uniform1f(T.uLightMode,0),z.activeTexture(z.TEXTURE0),z.bindTexture(z.TEXTURE_2D,L),z.uniform1i(T.uField,0),z.drawArrays(z.TRIANGLES,0,3)},V=e=>{if(N=0,!W||document.hidden)return;let t=O?Math.min(.05,(e-O)/1e3):1/60;O=e;let o=!T&&!D;o&&(B.clock+=t*l),D?B.intro=1:B.intro<1&&(B.intro=Math.min(1,B.intro+t/1.6));let r=x&&k.inside&&!D;r&&B.reach<.01&&(B.x=k.x,B.y=k.y);let a=1-Math.exp(-(7*t));B.x+=(k.x-B.x)*a,B.y+=(k.y-B.y)*a,B.reach+=(!!r-B.reach)*(1-Math.exp(-t*(r?3.2:1.8)));let n=i*Math.PI/180,u=-Math.sin(n)*(B.x-X.width/2)+Math.cos(n)*(X.height/2-B.y);B.lightY=Math.min(4,Math.max(-4,u/(.5*X.height)*3)),H();let c=B.intro<1||Math.abs(!!r-B.reach)>.002||Math.abs(k.x-B.x)+Math.abs(k.y-B.y)>.3;o||c?N=requestAnimationFrame(V):O=0},q=()=>{N||!W||document.hidden||(N=requestAnimationFrame(V))},Y=()=>{let e=Math.max(1,t.clientWidth),r=Math.max(1,t.clientHeight),a=Math.min(window.devicePixelRatio||1,2);X.width=e,X.height=r,o.width=Math.max(1,Math.round(e*a)),o.height=Math.max(1,Math.round(r*a));let i=s*a;e*r*i*i>16e5&&(i=Math.sqrt(16e5/(e*r))),X.fieldWidth=Math.max(1,Math.round(e*i)),X.fieldHeight=Math.max(1,Math.round(r*i)),N||H(),q()},j=e=>{let o=t.getBoundingClientRect();k.x=e.clientX-o.left,k.y=e.clientY-o.top,k.inside=k.x>=0&&k.y>=0&&k.x<=o.width&&k.y<=o.height,q()},K=()=>{k.inside=!1,q()},J=()=>{O=0,q()},Q=new ResizeObserver(Y);Q.observe(t);let Z=new IntersectionObserver(e=>{(W=e.some(e=>e.isIntersecting))&&(O=0,q())});return Z.observe(t),window.addEventListener("pointermove",j,{passive:!0}),document.documentElement.addEventListener("pointerleave",K),document.addEventListener("visibilitychange",J),Y(),()=>{cancelAnimationFrame(N),Q.disconnect(),Z.disconnect(),window.removeEventListener("pointermove",j),document.documentElement.removeEventListener("pointerleave",K),document.removeEventListener("visibilitychange",J),L&&z.deleteTexture(L),z.deleteFramebuffer(C),z.deleteProgram(A.program),z.deleteProgram(F.program),z.deleteBuffer(_),z.deleteVertexArray(S)}},[]),(0,t.jsx)("div",{ref:e,className:"absolute inset-0 overflow-hidden",children:(0,t.jsx)("canvas",{ref:E,className:"absolute inset-0 block h-full w-full","aria-hidden":"true"})})}],76513)},28431,function(e){e.n(e.i(76513))}]);