import { GroupProps } from "@react-three/fiber"

import { TableInstance } from "../../../models/table/tableInstance"

import { organizeTablePos } from "../position/organizeTablePosition"

interface Props extends GroupProps {
    numberOfSeat: number
    itemsPerLine: number
}

export const LaptopZoneTable = ({
    numberOfSeat, itemsPerLine, ...props
}: Props) => {
    const tablePosition = organizeTablePos(numberOfSeat, itemsPerLine)

    return (
        <group {...props}>
            <TableInstance position={tablePosition.smallTable} adjustXSize={6} adjustZSize={3.3} />
            <TableInstance position={tablePosition.bigTable} adjustXSize={8} adjustZSize={3.3} />
        </group>
    )
}