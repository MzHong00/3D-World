import { OrbitControls } from "@react-three/drei"
import { SpinCardList } from "components/home/card/spinCardList"
import { FloatingText } from "components/home/text/floatingText"

export const Scene=()=> {

    return (
        <group>
            <FloatingText text={`Enter\nOur World!`} color={`#87ecfb`}/>
            <SpinCardList />
            <OrbitControls 
                enableZoom={false}
                rotateSpeed={0.3}
                minPolarAngle={1.3} maxPolarAngle={1.4} />
        </group>
    )
}