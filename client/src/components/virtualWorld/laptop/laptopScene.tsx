import { useState, useEffect, useLayoutEffect, useRef, } from "react"
import { Physics, RigidBody } from "@react-three/rapier"

import { Map } from "../map/map"
import { organizeMapPosition } from "./position/organizeMapPosition"
import { organizeSeatPos } from "./position/organizeSeatPosition"

import { Player } from "components/models/character/player"
import { Asphalt } from "components/models/floor/asphalt"
import { LaptopZoneTable } from "components/models/table/laptopZoneTable"
import { ChairInstance } from "components/models/chair/chairInstance"
import { SeatedUserInstance } from "components/models/character/seatedUserInstance"
import { useDialogStore } from "stores/useOpenDialogStore"
import { useFetchLabtopZone } from "queries/useFetchSeat"
import { SeatState, type Coordinate, type SeatStateDto } from "shared/types/type"

export const LaptopZoneScene = () => {
    const numberOfSeat = useRef<number>(200);
    const itemsPerLine = useRef<number>(10);

    const { isPending, data } = useFetchLabtopZone();
    const { setDialog } = useDialogStore();

    const [seatPosition, setSeatPosition] = useState<Coordinate[]>([]);
    const [occupiedSeatPosition, setOccupiedSeatPosition] = useState<SeatState[]>([]);

    useEffect(() => {
        const initMap = () => {
            if (isPending) return;

            const width = 28;
            const organizedSeat = organizeMapPosition(data, width);

            setDialog(<Map seatPosition={organizedSeat} style={{ width: '550px', height: '900px' }} xSpeed={13.2} ySpeed={9.4} />)
        }

        initMap();
    }, [isPending, data, setDialog]);

    useEffect(() => {
        const initPerson = () => {
            if (isPending) return;

            const seatWidth = 2.057;

            const seatPosition = organizeSeatPos(numberOfSeat.current, seatWidth)

            const occupiedSeat = data.filter(
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

            const seatPosition = organizeSeatPos(numberOfSeat.current, seatWidth)
            setSeatPosition(seatPosition);
        }

        initSeat();
    }, []);

    return (
        <Physics>
            <Player />
            <RigidBody type='fixed' >
                <Asphalt position={[-20, 0, -48]} />
            </RigidBody>
            {!isPending && <SeatedUserInstance seatPosition={occupiedSeatPosition} position={[-38.3, 0, -6.5]} itemsPerLine={itemsPerLine.current} />}
            <LaptopZoneTable numberOfSeat={numberOfSeat.current} position={[-12.7, 0, -2.5]} />
            <ChairInstance seatPosition={seatPosition} position={[-38.3, 0, -6.5]} itemsPerLine={itemsPerLine.current} />
        </Physics>
    )
}