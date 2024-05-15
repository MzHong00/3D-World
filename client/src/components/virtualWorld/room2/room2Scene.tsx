import { useState, useEffect, useLayoutEffect, useRef } from "react"
import { Physics, RigidBody } from "@react-three/rapier"

import { Map } from "../map/map"
import { room2MapPosition } from "./position/room2MapPosition"
import { room2SeatPosition } from "./position/room2SeatPosition"
import { Room2Table } from "./models/room2ZoneTable"

import { Player } from "components/models/character/player"
import { ZoneFloor } from "components/models/floor/zoneFloor"
import { ChairInstance } from "components/models/chair/chairInstance"
import { SeatedUserInstance } from "components/models/character/seatedUserInstance"
import { useDialogStore } from "stores/useOpenDialogStore"
import { useFetchRoom2Zone } from "queries/useFetchSeat"
import { type SeatState, type Coordinate, type SeatStateDto } from "shared/types/type"
import { SideWall } from "components/models/wall/sideWall"

export const Room2Scene = () => {
    const numberOfSeat = useRef<number>(240);
    const itemsPerLine = useRef<number>(12);

    const { isPending, data } = useFetchRoom2Zone();
    const { setDialog } = useDialogStore();

    const [seatPosition, setSeatPosition] = useState<Coordinate[]>([]);
    const [occupiedSeatPosition, setOccupiedSeatPosition] = useState<SeatState[]>([]);

    useEffect(() => {
        const initMap = () => {
            if (isPending) return;

            const width = 28;
            const organizedSeat = room2MapPosition(data, width);

            setDialog(
                <Map
                    seatPosition={organizedSeat}
                    style={{ width: '500px', height: '900px' }}
                    userStartPosition="left"
                    ySpeed={9.6} />)
        }

        initMap();
    }, [isPending, data, setDialog]);

    useEffect(() => {
        const initPerson = () => {
            if (isPending) return;

            const seatWidth = 2.057;
            const seatPosition = room2SeatPosition(numberOfSeat.current, seatWidth)

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

        initPerson();
    }, [isPending, data]);

    useLayoutEffect(() => {
        const initSeat = () => {
            const seatWidth = 1.466;
            const seatPosition = room2SeatPosition(numberOfSeat.current, seatWidth)

            setSeatPosition(seatPosition);
        }

        initSeat();
    }, []);

    return (
        <Physics>
            <Player />
            <RigidBody type='fixed' >
                <ZoneFloor position={[21, 0, -48]} args={[45, 100]}/>
            </RigidBody>
            {!isPending && <SeatedUserInstance seatPosition={occupiedSeatPosition} position={[8.4, 0.05, -4.8]} itemsPerLine={itemsPerLine.current} />}
            <Room2Table numberOfSeat={numberOfSeat.current} position={[40, 0, -5.4]} itemsPerLine={itemsPerLine.current} />
            <ChairInstance seatPosition={seatPosition} position={[8.4, 0, -4.7]} itemsPerLine={itemsPerLine.current} />
            
            <SideWall position={[43.6, 0.5, -48]} rotation={[0, Math.PI, 0]}/>
        </Physics>
    )
}