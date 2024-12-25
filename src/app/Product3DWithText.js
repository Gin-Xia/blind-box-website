'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const Product3DWithTimeline = ({ modelPath }) => {
    const containerRef = useRef(null)
    const rendererRef = useRef(null)
    const phiRef = useRef({ current: 0 }) // 确保目标是对象

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger)

        if (containerRef.current) {
            containerRef.current.innerHTML = ''
        }
        if (!containerRef.current || rendererRef.current) {
            return
        }

        // 创建渲染器并挂载到容器
        const renderer = new THREE.WebGLRenderer({ alpha: true })
        renderer.setSize(window.innerWidth, window.innerHeight)
        containerRef.current.appendChild(renderer.domElement)
        rendererRef.current = renderer

        // 创建场景和摄像机
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        const radius = 5 // 固定距离

        const updateCameraPosition = (phi) => {
            camera.position.x = radius * Math.sin(phi)
            camera.position.z = radius * Math.cos(phi)
            camera.lookAt(0, 0, 0)
        }

        // 添加光源
        const ambientLight = new THREE.AmbientLight(0xffffff, 1)
        scene.add(ambientLight)

        // 加载模型
        const loader = new GLTFLoader()
        loader.load(
            modelPath,
            (gltf) => {
                scene.add(gltf.scene)
            },
            undefined,
            (error) => {
                console.error('模型加载失败:', error)
            }
        )

        // 确保触发器存在
        if (!containerRef.current || !containerRef.current.firstChild) {
            console.error('Trigger element not found!')
            return
        }

        // 创建 Timeline 和 ScrollTrigger
        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current.firstChild, // 确保目标正确
                start: 'top top',
                end: '200%',
                scrub: 1,
                markers: true,
                //pin: true, // 固定模型区域
            },
        })

        // 添加动画到 Timeline
        timeline.to(phiRef.current, {
            current: Math.PI * 2, // 一圈旋转
            
            onUpdate: () => {
                console.log('canvas:', containerRef.current.firstChild)
                //console.log('Current phi:', phiRef.current.current) // 调试
                updateCameraPosition(phiRef.current.current)
            },
        })

        // 渲染循环
        const animate = () => {
            renderer.render(scene, camera)
            requestAnimationFrame(animate)
        }
        animate()

        // 清理逻辑
        return () => {
            if (rendererRef.current) {
                rendererRef.current.dispose()
                rendererRef.current.forceContextLoss()
                rendererRef.current.domElement = null
                rendererRef.current = null
            }
            if (containerRef.current) {
                containerRef.current.innerHTML = ''
            }
            ScrollTrigger.getAll().forEach(trigger => trigger.kill())
        }
    }, [modelPath])

    return (
        <div ref={containerRef} style={{ width: '100vw', height: '100vh' }}>
            <div style={{ height: '100vh', backgroundColor: 'lightgray' }}>Scroll to see the effect</div>
        </div>
    )
}

export default Product3DWithTimeline
