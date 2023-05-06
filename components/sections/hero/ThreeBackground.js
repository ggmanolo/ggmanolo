import * as THREE from "three"
import { useRef, useEffect } from "react"

import s from "./hero.module.scss"

function ThreeBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const renderer = new THREE.WebGLRenderer({ canvas })
    renderer.autoClearColor = false

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -1, 1)
    const scene = new THREE.Scene()
    const plane = new THREE.PlaneGeometry(2, 2)

    const fragShader = `#include <common>
      uniform vec3 iResolution;
      uniform float iTime;

      #define SRGB_TO_LINEAR(c) pow((c), vec3(2.2))
      #define LINEAR_TO_SRGB(c) pow((c), vec3(1.0 / 2.2))
      #define SRGB(r, g, b) SRGB_TO_LINEAR(vec3(float(r), float(g), float(b)) / 255.0)

      const vec3 COLOR0 = SRGB(255, 0, 114);
      const vec3 COLOR1 = SRGB(197, 255, 80);

      const float r = 0.3;
      const float rOffset = 0.05;

      const float rotationTimeScaler = 0.1;
      const float colorTimeScaler = 0.3;

      float gradientNoise(in vec2 uv)
      {
          const vec3 magic = vec3(0.06711056, 0.00583715, 52.9829189);
          return fract(magic.z * fract(dot(uv, magic.xy)));
      }

      void mainImage(out vec4 fragColor, in vec2 fragCoord)
      {

          float rotTime = iTime * rotationTimeScaler;
          float colorTime = iTime * colorTimeScaler;

          float aR = r + rOffset * sin(iTime * 0.7);
          float aX = (0.5 - aR * sin(rotTime)) * iResolution.x;
          float aY = (0.5 - aR * cos(rotTime)) * iResolution.y;
          vec2 a = vec2(aX, aY);

          float bR = r + rOffset * sin(iTime * 0.8);
          float bX = (0.5 - bR * sin(rotTime + PI)) * iResolution.x;
          float bY = (0.5 - bR * cos(rotTime + PI)) * iResolution.y;
          vec2 b = vec2(bX, bY);

          vec2 ba = b - a;
          float t = dot(fragCoord - a, ba) / dot(ba, ba);
          t = smoothstep(0.0, 1.0, clamp(t, 0.0, 1.0));

          vec3 color0 = 0.5 + 0.5 * cos(colorTime + COLOR0.xyx + vec3(0, 2, 4));
          vec3 color1 = 0.5 + 0.5 * cos(colorTime + COLOR1.xyx + vec3(0, 2, 4));

          vec3 color = mix(color0, color1, t);

          color = LINEAR_TO_SRGB(color);

          color += (1.0 / 255.0) * gradientNoise(fragCoord) - (0.5 / 255.0);

          fragColor = vec4(color, 1.0);
      }

      void main() {
        mainImage(gl_FragColor, gl_FragCoord.xy);
      }`

    const uniforms = {
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector3() }
    }
    const material = new THREE.ShaderMaterial({
      fragmentShader: fragShader,
      uniforms
    })
    scene.add(new THREE.Mesh(plane, material))

    function resizeRendererToDisplaySize(renderer) {
      const canvas = renderer.domElement
      const width = canvas.clientWidth
      const height = canvas.clientHeight
      const needResize = canvas.width !== width || canvas.height !== height
      if (needResize) {
        renderer.setSize(width, height, false)
      }
      return needResize
    }

    function render(time) {
      time *= 0.001

      resizeRendererToDisplaySize(renderer)

      const canvas = renderer.domElement
      uniforms.iResolution.value.set(canvas.width, canvas.height, 1)
      uniforms.iTime.value = time

      renderer.render(scene, camera)

      requestAnimationFrame(render)
    }

    requestAnimationFrame(render)

    return () => {
      renderer.dispose()
      material.dispose()
    }
  }, [])

  return <canvas id="canvas" ref={canvasRef} className={s.bg} />
}

export default ThreeBackground
