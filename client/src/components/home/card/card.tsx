import { useRef } from "react"
import * as THREE from 'three'
import { Text, Image, Shadow } from "@react-three/drei"
import { type Euler, type Vector3, useFrame } from '@react-three/fiber'
import { easing } from 'maath'
import { useDialogStore } from "stores/useStore"
import { DetailAreaDialog } from "../dialog/detailAreaDialog"
import { IntersectionEvent } from "@react-three/fiber/dist/declarations/src/core/events"

interface Props {
    areaName: string
    areaImg: string
    position: Vector3
    rotation: Euler
    hover: boolean
    setHover: React.Dispatch<React.SetStateAction<boolean>>
}

export const Card = ({
    areaName,
    areaImg,
    position,
    rotation,
    hover,
    setHover
}: Props) => {
    const cardRef = useRef<any>()
    const {setDialog, clickOpenButton} = useDialogStore(state => state);

    const pointerOver = (e: IntersectionEvent<MouseEvent>) => (e.stopPropagation(), setHover(true))
    const pointerOut = () => setHover(false)
    const pointerClick = (e: IntersectionEvent<MouseEvent>) => {
        e.stopPropagation();
        setDialog(<DetailAreaDialog area={areaName} bgUrl={areaImg}/>)
        clickOpenButton()
    }

    useFrame((state, delta) => {
        //args 2: 값이 클수록 카드가 커짐
        easing.damp3(cardRef.current.scale, hover ? 1.3 : 1.4, 0.1, delta)
        //args 2: 값이 클수록 카드가 둥글어짐
        easing.damp(cardRef.current.material, 'radius', hover ? 0.2 : 0.1, 0.2, delta)
        //args 2: 값이 클수록 Zoom In
        easing.damp(cardRef.current.material, 'zoom', hover ? 1 : 1.5, 0.2, delta)
    })

    return (
        <Image
            ref={cardRef}
            url={areaImg}
            transparent side={THREE.DoubleSide}
            onPointerOver={pointerOver}
            onPointerOut={pointerOut}
            onPointerDown={pointerClick}
            position={position}
            rotation={rotation} >
            <Text color='black' scale={0.2} position={[-0.3, 0.3, 0.1]}>F1</Text>
            <Shadow
                scale={[0.8, 0.2, 1]}
                position={[0, -1, 0]}
                colorStop={0.2}
                opacity={0.05} />
        </Image>
    )
}