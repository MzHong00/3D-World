import { GroupProps } from "@react-three/fiber"

import { TableInstance } from "../../../models/table/tableInstance"

import { room2TablePosition } from "../position/room2TablePosition"

interface Props extends GroupProps {
    numberOfSeat: number
    itemsPerLine: number
}

export const Room2Table = ({
    numberOfSeat, itemsPerLine, ...props
}: Props) => {
    const tablePosition = room2TablePosition(numberOfSeat, itemsPerLine)
    
    return (
        <group {...props} dispose={null}>
            <TableInstance position={tablePosition} adjustXSize={6.1} adjustZSize={3.3}/>
        </group>
    )
}