import { useRef } from "react"
import { Center } from "@react-three/drei"
import { Card } from "./card"
import { useFrame } from "@react-three/fiber"

/*
    args 1: 값을 크게 하면 Card의 간격이 커짐
    args 2: Card의 개수
*/

export const SpinCardList = ({ radius = 3, count = 6 }) => {
    const ref = useRef<any>()
    useFrame((state, delta) => {
        ref.current.rotation.y += delta / 10
    })

    return (
        <Center bottom >
            <group ref={ref}>
                {areaInfo.map((area, i) => (
                    <Card
                        key={i}
                        area={area}
                        position={[Math.sin((i / count) * Math.PI * 2) * radius, 0, Math.cos((i / count) * Math.PI * 2) * radius]}
                        rotation={[0, (i / count) * Math.PI * 2, 0]} />
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
