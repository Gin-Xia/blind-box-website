'use client'
import { useEffect, useState } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Products() {
    const [isClient, setIsClient] = useState(false)

    const products = [
        { id: 1, name: '盲盒1号', price: '¥29.99', image: '/wjr1.jpg' },
        { id: 2, name: '盲盒2号', price: '¥39.99', image: '/wjr2.jpg' },
        { id: 3, name: '盲盒3号', price: '¥49.99', image: '/wjr3.jpg' },
    ]

    useEffect(() => {
        setIsClient(true) // 只在客户端渲染
    }, [])

    useEffect(() => {
        if (isClient) {
            gsap.from('.product-item', {
                opacity: 0,
                y: 50,
                duration: 1,
                stagger: 0.3,
                scrollTrigger: {
                    trigger: '.products-container',
                    start: 'top 80%',
                    end: 'bottom 50%',
                    scrub: false,
                },
            })
        }
    }, [isClient])

    return (
        <div className="products-container bg-gray-50 py-16">
            <h1 className="text-4xl font-bold text-center mb-12">我们的盲盒产品</h1>
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="product-item bg-white p-6 rounded-lg shadow-lg text-center"
                    >
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-32 h-32 mx-auto mb-4"
                        />
                        <h2 className="text-2xl font-semibold">{product.name}</h2>
                        <p className="text-gray-500 mt-2">{product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

