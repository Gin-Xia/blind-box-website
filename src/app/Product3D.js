'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Product3D = ({ modelPath }) => {
  const containerRef = useRef(null)

  useEffect(() => {
    // 初始化场景、相机和渲染器
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    containerRef.current.appendChild(renderer.domElement)

    // 设置相机位置
    camera.position.set(0, 1, 3) // 提高相机视角

    // 添加光源
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8) // 环境光
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1) // 方向光
    directionalLight.position.set(5, 10, 7.5)
    scene.add(directionalLight)

    const pointLight = new THREE.PointLight(0xffffff, 0.5) // 点光源
    pointLight.position.set(0, 5, 5)
    scene.add(pointLight)

    // 加载 3D 模型
    const loader = new GLTFLoader()
    let product
    loader.load(modelPath, (gltf) => {
      product = gltf.scene
      product.traverse((child) => {
        if (child.isMesh) {
          // 手动检查和设置材质
          if (!child.material.map) {
            child.material = new THREE.MeshStandardMaterial({ color: 0xdddddd })
          }
        }
      })
      scene.add(product)
    })

    // 窗口缩放自适应
    const resizeHandler = () => {
      renderer.setSize(window.innerWidth, window.innerHeight)
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', resizeHandler)

    // 动画渲染循环
    const animate = () => {
      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }
    animate()

    // 滚动控制旋转
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: '+=300%',
      scrub: true,
      pin: containerRef.current,
      onUpdate: (self) => {
        if (product) {
          product.rotation.y = self.progress * Math.PI * 2 // 根据滚动进度旋转
        }
      },
    })

    return () => {
      window.removeEventListener('resize', resizeHandler)
      renderer.dispose()
    }
  }, [modelPath])

  return (
    <div ref={containerRef} className="h-screen w-full bg-gray-100"></div>
  )
}

export default Product3D
