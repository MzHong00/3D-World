import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { Center, useCursor } from "@react-three/drei"
import { Card } from "./card"
import { easing } from 'maath'

/*
    args 1: 값을 크게 하면 Card의 간격이 커짐
    args 2: Card의 개수
*/

export const SpinCardList = ({ radius = 3, count = 6 }) => {
    const ref = useRef<any>()
    const [hover, setHover] = useState(false)

    useCursor(hover)
    useFrame((state, delta) => {
        easing.damp3(state.camera.position, [Math.sin(state.pointer.x / 4) * 9, 1.25 + state.pointer.y, Math.cos(state.pointer.x / 4) * 9], 0.5, delta)
        !hover && ref.current.rotateY(delta / 4)
        state.camera.lookAt(0, 0.5, 0)
    })

    return (
        <Center bottom position={[0, 0, 0]} rotation={[0, -0.25, 0]} >
            <group rotation={[0, 3, 0]} ref={ref}>
                {areaInfo.map((area, i) => (
                    <Card
                        key={i}
                        area={area}
                        position={[Math.sin((i / count) * Math.PI * 2) * radius, 0, Math.cos((i / count) * Math.PI * 2) * radius]}
                        rotation={[0, (i / count) * Math.PI * 2, 0]}
                        hover={hover}
                        setHover={setHover} />
                ))}
            </group>
        </Center>
    )
}

export interface Area {
    name: string
    bgUrl: string
    floor: string
}
const areaInfo: Area[] = [
    {
        name: 'entrance',
        bgUrl: '/img/entrance.jpg',
        floor: '1F'
    },
    {
        name: 'laptop',
        bgUrl: '/img/laptop.jpg',
        floor: '3F'
    },
    {
        name: 'digital',
        bgUrl: '/img/digital.jpg',
        floor: '3F'
    },
    {
        name: 'room1',
        bgUrl: '/img/room1.jpg',
        floor: '4F'
    },
    {
        name: 'room2',
        bgUrl: '/img/room2.jpg',
        floor: '4F'
    },
    {
        name: 'library',
        bgUrl: '/img/library.jpg',
        floor: '5F'
    },
]
