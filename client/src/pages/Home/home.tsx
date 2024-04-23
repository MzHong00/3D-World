import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { Sky } from "@react-three/drei"
import { Scene } from "components/home/scene"
import { useDialogStore } from "store/useStore"

export const Home = () => {
    const { dialog, isOpen } = useDialogStore(state => state);
    console.log(isOpen);
    
    return (
        <>
            <Suspense fallback="뭣ㅂ">
            {isOpen && dialog}
            </Suspense>
            <Suspense fallback='..lo'>
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