import { useRef } from "react"
import { GroupProps } from "@react-three/fiber"

import { TableInstance } from "./tableInstance"

import { organizeTablePos } from "components/virtualWorld/laptop/position/organizeTablePosition"

interface Props extends GroupProps {
    numberOfSeat: number
}

export const LaptopZoneTable = ({
    numberOfSeat, ...props
}: Props) => {
    const width = useRef<number>(7);
    const height = useRef<number>(5);

    const tablePosition = organizeTablePos(numberOfSeat, width.current, height.current)

    return (
        <group {...props}>
            <TableInstance position={tablePosition.smallTable} headCount={6}/>
            <TableInstance position={tablePosition.bigTable} headCount={8}/>
        </group>
    )
}