'use client';

import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';

// 动态加载 ThreeDModel 组件并禁用 SSR
//const ThreeDModel = dynamic(() => import('./components/ThreeDModel'), { ssr: false });
//import Product3D from './Product3D';
const Product3DWithText = dynamic(() => import('./Product3DWithText'), { ssr: false });
//import Product3DWithText from './Product3DWithText';

//import ThreeDModel from './components/ThreeDModel';

//import InfoBlocks from './components/InfoBlocks';

export default function Home() {
    useEffect(() => {
        // 恢复默认的滚动恢复行为
        if (typeof window !== 'undefined') {
            history.scrollRestoration = 'auto';

            // 清理时重置为 'manual'（可选）
            return () => {
                history.scrollRestoration = 'manual';
            };
        }
    }, []); // 空依赖数组，确保仅在页面加载时运行

    useEffect(() => {
        // 确保只在浏览器环境运行
        if (typeof window !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);

            // 设置初始状态，确保和服务端一致
            gsap.set('.top-image', { clipPath: 'inset(0.00001% 0% 0%)' });

            // 定义动画
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: '.image-container',
                    start: 'top-=55.98px top',
                    end: '100% 55.98px',
                    scrub: 2,
                    pin: '.image-container',
                    markers: true, // 可用于调试
                },
            });

            // 添加动画效果
            tl.to('.top-image', {
                clipPath: 'inset(100% 0% 0% 0%)',
                ease: 'none',
            });

            ScrollTrigger.refresh();

            return () => {
                ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
            };
        }
    }, []);

    return (
        <div className="relative">
            {/* 导航栏 */}
            <nav className="fixed top-0 left-0 w-full bg-white bg-opacity-95 shadow-md z-50">
                <div className="w-[90%] mx-auto py-3 flex items-center justify-between">
                    <div className="text-2xl font-bold text-blue-600">盲盒定制网</div>
                    <ul className="flex space-x-6">
                        <li>
                            <Link href="/">
                                <span className="text-gray-700 hover:text-blue-500 cursor-pointer">首页</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/products">
                                <span className="text-gray-700 hover:text-blue-500 cursor-pointer">展品</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/contact">
                                <span className="text-gray-700 hover:text-blue-500 cursor-pointer">联系我们</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>

            {/* 图片切换区域 */}
            <div className="image-container relative h-screen w-full overflow-hidden mt-[55.98px]">
                {/* 第二张图片 */}
                <div
                    className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: "url('/homepagebanner.png')" }}
                ></div>

                {/* 第一张图片 */}
                <div
                    className="top-image absolute top-0 left-0 w-full h-full bg-cover bg-center z-10"
                    style={{
                        backgroundImage: "url('/homepagebanner2.png')",
                    }}
                ></div>
            </div>

            {/* 3D 展示区 */}
            <div style={{ height: "50px"}}></div>
            {/* 3D 模型展示 */}
            {/*<ThreeDModel />*/}
            <Product3DWithText modelPath="/lambo.glb" />
            {/*<Product3D modelPath="/lambo.glb" />*/}

            {/* 文字介绍块 */}
            {/*<InfoBlocks />*/}


            <div className="relative h-screen flex items-center justify-center mt-[2165.46px]">
                <Link href="/products">
                    <button className="px-6 py-3 bg-blue-500 text-white text-lg rounded hover:bg-blue-600">
                        去看看我们的展品
                    </button>
                </Link>
            </div>
        </div>
    );
}
