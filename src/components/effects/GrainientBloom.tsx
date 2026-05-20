import { useEffect, useRef } from "react"
import * as THREE from "three"
import { useInView } from "framer-motion"
import { useReducedMotion } from "@/hooks/useReducedMotion"

/* ─── Color helpers ───────────────────────────────────────────────────────── */
const parseColor = (color: string): [number, number, number] => {
  const hex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color)
  if (hex) {
    return [
      parseInt(hex[1], 16) / 255,
      parseInt(hex[2], 16) / 255,
      parseInt(hex[3], 16) / 255,
    ]
  }
  const rgb = /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i.exec(color)
  if (rgb) {
    return [
      parseInt(rgb[1], 10) / 255,
      parseInt(rgb[2], 10) / 255,
      parseInt(rgb[3], 10) / 255,
    ]
  }
  return [1, 1, 1]
}

const colorCache: Record<string, [number, number, number]> = {}
const getCachedColor = (c: string): [number, number, number] => {
  if (!(c in colorCache)) {
    colorCache[c] = parseColor(c)
  }
  return colorCache[c]
}

/* ─── Shaders ─────────────────────────────────────────────────────────────── */
const vertexShader = `
precision highp float;
attribute vec3 position;
void main() {
  gl_Position = vec4(position, 1.0);
}
`

const fragmentShader = `
#ifdef GL_ES
precision highp float;
#endif
uniform vec2 iResolution;
uniform float iTime;
uniform float uTimeSpeed;
uniform float uColorBalance;
uniform float uWarpStrength;
uniform float uWarpFrequency;
uniform float uWarpSpeed;
uniform float uWarpAmplitude;
uniform float uBlendAngle;
uniform float uBlendSoftness;
uniform float uRotationAmount;
uniform float uNoiseScale;
uniform float uGrainAmount;
uniform float uGrainScale;
uniform float uGrainAnimated;
uniform float uContrast;
uniform float uGamma;
uniform float uSaturation;
uniform vec2 uCenterOffset;
uniform float uZoom;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;

#define S(a,b,t) smoothstep(a,b,t)
mat2 Rot(float a){float s=sin(a),c=cos(a);return mat2(c,-s,s,c);}
vec2 hash(vec2 p){p=vec2(dot(p,vec2(2127.1,81.17)),dot(p,vec2(1269.5,283.37)));return fract(sin(p)*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p),u=f*f*(3.0-2.0*f);float n=mix(mix(dot(-1.0+2.0*hash(i+vec2(0.0,0.0)),f-vec2(0.0,0.0)),dot(-1.0+2.0*hash(i+vec2(1.0,0.0)),f-vec2(1.0,0.0)),u.x),mix(dot(-1.0+2.0*hash(i+vec2(0.0,1.0)),f-vec2(0.0,1.0)),dot(-1.0+2.0*hash(i+vec2(1.0,1.0)),f-vec2(1.0,1.0)),u.x),u.y);return 0.5+0.5*n;}

void mainImage(out vec4 o, vec2 C){
  float t=iTime*uTimeSpeed;
  vec2 uv=C/iResolution.xy;
  float ratio=iResolution.x/iResolution.y;
  vec2 tuv=uv-0.5+uCenterOffset;
  tuv/=max(uZoom,0.001);

  float degree=noise(vec2(t*0.1,tuv.x*tuv.y)*uNoiseScale);
  tuv.y*=1.0/ratio;
  tuv*=Rot(radians((degree-0.5)*uRotationAmount+180.0));
  tuv.y*=ratio;

  float frequency=uWarpFrequency;
  float ws=max(uWarpStrength,0.001);
  float amplitude=uWarpAmplitude/ws;
  float warpTime=t*uWarpSpeed;
  tuv.x+=sin(tuv.y*frequency+warpTime)/amplitude;
  tuv.y+=sin(tuv.x*(frequency*1.5)+warpTime)/(amplitude*0.5);

  vec3 colLav=uColor1;
  vec3 colOrg=uColor2;
  vec3 colDark=uColor3;
  float b=uColorBalance;
  float s=max(uBlendSoftness,0.0);
  mat2 blendRot=Rot(radians(uBlendAngle));
  float blendX=(tuv*blendRot).x;
  float edge0=-0.3-b-s;
  float edge1=0.2-b+s;
  float v0=0.5-b+s;
  float v1=-0.3-b-s;
  vec3 layer1=mix(colDark,colOrg,S(edge0,edge1,blendX));
  vec3 layer2=mix(colOrg,colLav,S(edge0,edge1,blendX));
  vec3 col=mix(layer1,layer2,S(v0,v1,tuv.y));

  vec2 grainUv=uv*max(uGrainScale,0.001);
  if(uGrainAnimated>0.5){grainUv+=vec2(iTime*0.05);}
  float grain=fract(sin(dot(grainUv,vec2(12.9898,78.233)))*43758.5453);
  col+=(grain-0.5)*uGrainAmount;

  col=(col-0.5)*uContrast+0.5;
  float luma=dot(col,vec3(0.2126,0.7152,0.0722));
  col=mix(vec3(luma),col,uSaturation);
  col=pow(max(col,0.0),vec3(1.0/max(uGamma,0.001)));
  col=clamp(col,0.0,1.0);

  o=vec4(col,1.0);
}

void main(){
  vec4 o=vec4(0.0);
  mainImage(o, gl_FragCoord.xy);
  gl_FragColor=o;
}
`

/* ─── Types ───────────────────────────────────────────────────────────────── */
type GrainientProps = {
  color1?: string
  color2?: string
  color3?: string
  timeSpeed?: number
  colorBalance?: number
  warpStrength?: number
  warpFrequency?: number
  warpSpeed?: number
  warpAmplitude?: number
  blendAngle?: number
  blendSoftness?: number
  rotationAmount?: number
  noiseScale?: number
  grainAmount?: number
  grainScale?: number
  grainAnimated?: boolean
  contrast?: number
  gamma?: number
  saturation?: number
  centerX?: number
  centerY?: number
  zoom?: number
  className?: string
  style?: React.CSSProperties
}

/* ─── Component ───────────────────────────────────────────────────────────── */
export default function GrainientBloom({
  color1 = "#7c3aed",
  color2 = "#f97316",
  color3 = "#6366f1",
  timeSpeed = 0.25,
  colorBalance = 0,
  warpStrength = 1,
  warpFrequency = 5,
  warpSpeed = 2,
  warpAmplitude = 50,
  blendAngle = 0,
  blendSoftness = 0.05,
  rotationAmount = 500,
  noiseScale = 2,
  grainAmount = 0.1,
  grainScale = 2,
  grainAnimated = false,
  contrast = 1.5,
  gamma = 1,
  saturation = 1,
  centerX = 0,
  centerY = 0,
  zoom = 0.9,
  className,
  style,
}: GrainientProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const inView = useInView(mountRef, { once: false, amount: 0.1 })

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    container.style.overflow = "hidden"

    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    /* ─── Engine ──────────────────────────────────────────────────────────── */
    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,
      powerPreference: "high-performance",
    })
    renderer.setPixelRatio(dpr)
    renderer.autoClear = true
    renderer.setClearColor(0, 0)
    renderer.shadowMap.enabled = false

    const dom = renderer.domElement
    dom.style.width = "100%"
    dom.style.height = "100%"
    dom.style.display = "block"
    container.prepend(dom)

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

    const uniformValues: Record<string, THREE.IUniform> = {
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector2(1, 1) },
      uTimeSpeed: { value: timeSpeed },
      uColorBalance: { value: colorBalance },
      uWarpStrength: { value: warpStrength },
      uWarpFrequency: { value: warpFrequency },
      uWarpSpeed: { value: warpSpeed },
      uWarpAmplitude: { value: warpAmplitude },
      uBlendAngle: { value: blendAngle },
      uBlendSoftness: { value: blendSoftness },
      uRotationAmount: { value: rotationAmount },
      uNoiseScale: { value: noiseScale },
      uGrainAmount: { value: grainAmount },
      uGrainScale: { value: grainScale },
      uGrainAnimated: { value: grainAnimated ? 1 : 0 },
      uContrast: { value: contrast },
      uGamma: { value: gamma },
      uSaturation: { value: saturation },
      uCenterOffset: { value: new THREE.Vector2(centerX, centerY) },
      uZoom: { value: zoom },
      uColor1: { value: new THREE.Vector3(1, 1, 1) },
      uColor2: { value: new THREE.Vector3(1, 1, 1) },
      uColor3: { value: new THREE.Vector3(1, 1, 1) },
    }

    const c1 = getCachedColor(color1)
    const c2 = getCachedColor(color2)
    const c3 = getCachedColor(color3)
    ;(uniformValues.uColor1.value as THREE.Vector3).set(c1[0], c1[1], c1[2])
    ;(uniformValues.uColor2.value as THREE.Vector3).set(c2[0], c2[1], c2[2])
    ;(uniformValues.uColor3.value as THREE.Vector3).set(c3[0], c3[1], c3[2])

    const material = new THREE.RawShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: uniformValues,
      depthTest: false,
      depthWrite: false,
      transparent: true,
      blending: THREE.NormalBlending,
    })

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]), 3)
    )

    const mesh = new THREE.Mesh(geometry, material)
    mesh.frustumCulled = false
    scene.add(mesh)

    /* ─── Resize ──────────────────────────────────────────────────────────── */
    function resize() {
      if (!container) return
      const rect = container.getBoundingClientRect()
      const width = Math.max(1, Math.floor(rect.width))
      const height = Math.max(1, Math.floor(rect.height))
      renderer.setSize(width, height, false)
      ;(material.uniforms.iResolution.value as THREE.Vector2).set(
        renderer.domElement.width,
        renderer.domElement.height
      )
    }

    resize()

    /* ─── Animation ───────────────────────────────────────────────────────── */
    let running = false
    let rafId: number | null = null
    let iTime = 0
    let _t0 = performance.now()

    function draw() {
      material.uniforms.iTime.value = iTime
      renderer.render(scene, camera)
    }

    function loop(t: number) {
      if (!running) return
      iTime = (t - _t0) * 0.001
      draw()
      rafId = requestAnimationFrame(loop)
    }

    function start() {
      if (running || reducedMotion) return
      running = true
      _t0 = performance.now() - iTime * 1000
      rafId = requestAnimationFrame(loop)
    }

    function pause() {
      running = false
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
        rafId = null
      }
    }

    /* ─── Visibility ──────────────────────────────────────────────────────── */
    function onVisibility() {
      if (document.hidden) {
        pause()
      } else if (inView) {
        start()
      }
    }
    document.addEventListener("visibilitychange", onVisibility)

    if (inView && !document.hidden && !reducedMotion) {
      start()
    }

    /* ─── ResizeObserver ──────────────────────────────────────────────────── */
    let lastResizeMs = 0
    let resizeRaf: number | null = null
    const ro = new ResizeObserver(() => {
      if (resizeRaf) cancelAnimationFrame(resizeRaf)
      resizeRaf = requestAnimationFrame(() => {
        const now = performance.now()
        if (now - lastResizeMs < 50) return
        lastResizeMs = now
        resize()
        draw()
      })
    })
    ro.observe(container)

    /* ─── Cleanup ───────────────────────────────────────────────────────────── */
    return () => {
      document.removeEventListener("visibilitychange", onVisibility)
      if (resizeRaf) cancelAnimationFrame(resizeRaf)
      ro.disconnect()
      pause()
      mesh.geometry.dispose()
      material.dispose()
      scene.remove(mesh)
      const canvas = renderer.domElement
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas)
      }
      renderer.getContext().getExtension("WEBGL_lose_context")?.loseContext()
      renderer.dispose()
    }
  }, [
    inView, reducedMotion,
    color1, color2, color3,
    timeSpeed, colorBalance, warpStrength, warpFrequency, warpSpeed, warpAmplitude,
    blendAngle, blendSoftness, rotationAmount, noiseScale, grainAmount, grainScale,
    grainAnimated, contrast, gamma, saturation, centerX, centerY, zoom,
  ])

  return (
    <div
      ref={mountRef}
      className={className}
      style={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
        pointerEvents: "none",
        touchAction: "none",
        willChange: "transform",
        ...style,
      }}
    />
  )
}
