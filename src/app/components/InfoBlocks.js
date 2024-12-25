'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

export default function InfoBlocks() {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);

            const sections = document.querySelectorAll('.info-block');

            sections.forEach((section) => {
                gsap.fromTo(
                    section,
                    { opacity: 0, y: 100 },
                    {
                        opacity: 1,
                        y: 0,
                        scrollTrigger: {
                            trigger: section,
                            start: 'top bottom',
                            end: 'top center',
                            scrub: true,
                        },
                    }
                );
            });

            ScrollTrigger.refresh();
        }
    }, []);

    return (
        <div className="relative">
            <div className="info-block bg-gray-100 p-10 my-10 mx-auto max-w-4xl rounded-lg shadow-md">
                <h2 className="text-2xl font-bold">为什么选择我们？</h2>
                <p className="mt-4 text-gray-700">我们提供最优质的定制盲盒服务，满足客户的个性化需求。</p>
            </div>
            <div className="info-block bg-gray-100 p-10 my-10 mx-auto max-w-4xl rounded-lg shadow-md">
                <h2 className="text-2xl font-bold">我们的服务</h2>
                <p className="mt-4 text-gray-700">从图片到 3D 模型，我们为您打造独一无二的盲盒体验。</p>
            </div>
            <div className="info-block bg-gray-100 p-10 my-10 mx-auto max-w-4xl rounded-lg shadow-md">
                <h2 className="text-2xl font-bold">客户的信赖</h2>
                <p className="mt-4 text-gray-700">数千客户的选择，让我们更加坚定为您提供优质服务的信心。</p>
            </div>
        </div>
    );
}
