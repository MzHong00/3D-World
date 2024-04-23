import { KeyboardControls, OrbitControls, Sky } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import { useKeyControls } from "components/models/character/useKeyControls"
import { Outlet } from "react-router-dom"

export const World = () => {
    const map = useKeyControls();

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <KeyboardControls map={map}>
                <Canvas shadows camera={{ position: [0, 10, 10], fov: 50 }}>
                    <ambientLight intensity={1} />
                    <directionalLight position={[10, 10, 0]} />
                    <OrbitControls />
                    <Sky sunPosition={[1, 1, 0]} />
                    <Outlet />
                </Canvas>
            </KeyboardControls>
        </Suspense>
    )
}