import {  ContactShadows } from "@react-three/drei"
import { SpinCardList } from "components/home/card/spinCardList"
import { FloatingText } from "components/home/text/floatingText"

export const Scene=()=> {

    return (
        <group>
            <ContactShadows position={[0, -1, -1]} opacity={0.8} scale={30} blur={1.5} far={3} />
            <FloatingText text={`Enter\nOur World!`} color={`#87ecfb`}/>
            <SpinCardList />
        </group>
    )
}