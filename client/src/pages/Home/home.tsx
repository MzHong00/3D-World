import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { Sky } from "@react-three/drei"
import { Scene } from "components/home/scene"
import { useDialogStore } from "stores/useStore"

export const Home = () => {
    const { dialog, isOpen } = useDialogStore(state => state);

    return (
        <>
            <Suspense fallback="캐릭터 갱신 중...">
                {isOpen && dialog}
            </Suspense>
            <Suspense fallback='월드 불러오는 중...'>
                <Canvas shadows camera={{ position: [0, 3, 10], fov: 50 }} style={{ zIndex: isOpen ? -10 : 0 }}>
                    <ambientLight intensity={1} />
                    <directionalLight position={[0, 10, 5]} intensity={2} />
                    <Sky sunPosition={[0, 1, 2]} />
                    <Scene />
                </Canvas>
            </Suspense>
        </>
    )
}