'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

export default function ThreeDModel() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null; // 仅在客户端渲染

    return (
        <div className="relative h-screen w-full">
            <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 5, 5]} intensity={1} />
                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={-0.5} />
                <LamboModel />
            </Canvas>
        </div>
    );
}

function LamboModel() {
    const { scene } = useGLTF('/lambo.glb', true, (error) => {
        console.error('GLTF Load Error:', error);
    });

    if (!scene) {
        return <p>Loading model...</p>; // 模型加载中时显示的内容
    }

    return <primitive object={scene} scale={2} />;
}


//function LamboModel() {
//    const { scene } = useGLTF('/lambo.glb');
//    return <primitive object={scene} scale={2} />;
//}

//export default function ThreeDModel() {
//    if (typeof window === 'undefined') {
//        return (
//            <Canvas>
//                <ambientLight />
//                <LamboModel />
//            </Canvas>
//        );
//    }
//}

//export default function ThreeDModel() {
//    return null;
//}
