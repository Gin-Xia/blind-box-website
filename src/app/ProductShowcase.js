'use client'
import { useEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ProductShowcase() {
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.product-container',
        start: 'top top',
        end: '+=300%',
        scrub: true,
        pin: '.product-container',
        markers: false,
      },
    })

    tl.to('.product', { rotateY: -90, duration: 1 })
      .to('.product', { rotateY: -180, duration: 1 })
  }, [])

  return (
    <div className="product-container relative h-screen w-full flex justify-center items-center">
      <div
        className="product relative"
        style={{
          width: '300px',
          height: '300px',
          transformStyle: 'preserve-3d',
          transform: 'rotateY(0deg)',
        }}
      >
        {/* 正面 */}
        <div
          className="absolute w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: "url('/wjr1.jpg')",
            transform: 'rotateY(0deg) translateZ(150px)',
          }}
        >
          <div className="text-center mt-4">
            <h2 className="text-xl font-bold">正面展示</h2>
            <p className="text-gray-600">这是产品正面的详细描述。</p>
          </div>
        </div>
        {/* 侧面 */}
        <div
          className="absolute w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: "url('/wjr2.jpg')",
            transform: 'rotateY(90deg) translateZ(150px)',
          }}
        >
          <div className="text-center mt-4">
            <h2 className="text-xl font-bold">侧面展示</h2>
            <p className="text-gray-600">这是产品侧面的详细描述。</p>
          </div>
        </div>
        {/* 背面 */}
        <div
          className="absolute w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: "url('/wjr3.jpg')",
            transform: 'rotateY(180deg) translateZ(150px)',
          }}
        >
          <div className="text-center mt-4">
            <h2 className="text-xl font-bold">背面展示</h2>
            <p className="text-gray-600">这是产品背面的详细描述。</p>
          </div>
        </div>
      </div>
    </div>
  )
}
