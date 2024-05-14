import { GroupProps } from "@react-three/fiber"

import { TableInstance } from "../../../models/table/tableInstance"

import { digitalZoneTablePosition } from "../position/digitZoneTablePosition"

interface Props extends GroupProps {
    numberOfSeat: number
    itemsPerLine: number
}

export const DigitalZoneTable = ({
    numberOfSeat, itemsPerLine, ...props
}: Props) => {

    const tablePosition = digitalZoneTablePosition(numberOfSeat, itemsPerLine)

    return (
        <group {...props} dispose={null}>
            <TableInstance position={tablePosition.smallTable} adjustXSize={8} adjustZSize={4.2}/>
            <TableInstance position={tablePosition.bigTable} adjustXSize={10} adjustZSize={4.2}/>
        </group>
    )
}