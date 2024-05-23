import { GroupProps } from "@react-three/fiber"

import { digitalZoneTablePosition } from "../position/digitZoneTablePosition"
import { TableInstance } from "components/models/table/tableInstance"

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
            <TableInstance tablePosition={tablePosition.smallTable} adjustXSize={6} adjustZSize={3.3}/>
            <TableInstance tablePosition={tablePosition.bigTable} adjustXSize={8} adjustZSize={3.3}/>
        </group>
    )
}