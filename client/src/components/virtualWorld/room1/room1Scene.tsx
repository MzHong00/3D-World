import { useState, useEffect, useLayoutEffect, useRef } from "react"
import { Physics, RigidBody } from "@react-three/rapier"

import { Map } from "../map/map"
import { organizeMapPosition } from "../laptop/position/organizeMapPosition"
import { organizeSeatPos } from "../laptop/position/organizeSeatPosition"

import { Player } from "components/models/character/player"
import { Asphalt } from "components/models/floor/asphalt"
import { LaptopZoneTable } from "components/models/table/laptopZoneTable"
import { ChairInstance } from "components/models/chair/chairInstance"
import { SeatedUserInstance } from "components/models/character/seatedUserInstance"
import { useDialogStore } from "stores/useOpenDialogStore"
import { useFetchRoom1Zone } from "queries/useFetchSeat"
import { type SeatState, type Coordinate, type SeatStateDto } from "shared/types/type"

export const Room1Scene = () => {
    const numberOfSeat = useRef<number>(180);

    const { isPending, data } = useFetchRoom1Zone();
    const { setDialog } = useDialogStore();

    const [seatPosition, setSeatPosition] = useState<Coordinate[]>([]);
    const [occupiedSeatPosition, setOccupiedSeatPosition] = useState<SeatState[]>([]);

    useEffect(() => {
        const initDialog = () => {
            if (isPending) return;

            const width = 28;
            const organizedSeat = organizeMapPosition(data, width);

            setDialog(<Map seatPosition={organizedSeat} style={{ width: '550px', height: '900px' }} />)
        }

        initDialog();
    }, [isPending, data, setDialog]);

    useEffect(() => {
        const initOccupiedPosition = () => {
            if (isPending) return;

            const seatWidth = 2.057;
            const seatPosition = organizeSeatPos(numberOfSeat.current, seatWidth)

            const occupiedSeat = data.slice(0, numberOfSeat.current).filter(
                (seat: SeatStateDto) => seat.status === '사용 중'
            ).map(
                (seat: SeatStateDto) => {
                    const seatState: SeatState = { ...seatPosition[seat.number - 1], seat }

                    return seatState
                }
            );

            setOccupiedSeatPosition(occupiedSeat);
        }

        initOccupiedPosition();
    }, [isPending, data]);

    useLayoutEffect(() => {
        const initSeatPosition = () => {
            const seatWidth = 1.466;
            const seatPosition = organizeSeatPos(numberOfSeat.current, seatWidth)

            setSeatPosition(seatPosition);
        }

        initSeatPosition();
    }, []);

    return (
        <Physics>
            <Player />
            <RigidBody type='fixed' >
                <Asphalt position={[-20, 0, -48]} />
            </RigidBody>
            {!isPending && <SeatedUserInstance seatPosition={occupiedSeatPosition} position={[-10.7, 0, -6.5]} />}
            <LaptopZoneTable numberOfSeat={numberOfSeat.current} position={[-12.7, 0, -2.5]} />
            <ChairInstance seatPosition={seatPosition} position={[-10.7, 0, -6.5]} />
        </Physics>
    )
}