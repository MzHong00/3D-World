import { KeyboardControls, Sky } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import { useKeyControls } from "components/models/character/useKeyControls"
import { Outlet } from "react-router-dom"
import { MenuButton } from "shared/ui/button/menuButton"
import { useFetchDigitalZone, useFetchLabtopZone } from "queries/useFetchSeat"

export const World = () => {
    const map = useKeyControls();
    const { data } = useFetchLabtopZone();

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <MenuButton />
            <KeyboardControls map={map}>
                <Canvas shadows camera={{ position: [0, 10, 10], fov: 50 }}>
                    <ambientLight intensity={1} />
                    <directionalLight position={[0, 10, 0]} />
                    <Sky sunPosition={[0, 1, 0]} />
                    <Outlet />
                </Canvas>
            </KeyboardControls>
        </Suspense>
    )
}