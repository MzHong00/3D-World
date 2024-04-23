import { KeyboardControls, OrbitControls, Sky } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import { useKeyControls } from "components/models/character/useKeyControls"
import { Outlet, useLocation } from "react-router-dom"
import { SeatDialogButton } from "components/seat/button/seatDialogButton"

export const World = () => {
    const map = useKeyControls();
    const navigate = useLocation();

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SeatDialogButton />
            <KeyboardControls map={map}>
                <Canvas shadows camera={{ position: [0, 10, 10], fov: 50 }}>
                    <ambientLight intensity={1} />
                    <directionalLight position={[0, 10, 0]} />
                    <OrbitControls />
                    <Sky sunPosition={[0, 1, 0]} />
                    <Outlet />
                </Canvas>
            </KeyboardControls>
        </Suspense>
    )
}