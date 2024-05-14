import { useState, useEffect, useLayoutEffect, useRef } from "react"
import { Physics, RigidBody } from "@react-three/rapier"

import { Map } from "../map/map"
import { digitZoneMapState } from "./position/digitZoneMapPosition"
import { digitZoneSeatPosition } from "./position/digitZoneSeatPosition"
import { DigitalZoneTable } from "./models/digitalZoneTable"

import { Player } from "components/models/character/player"
import { Asphalt } from "components/models/floor/asphalt"
import { ChairInstance } from "components/models/chair/chairInstance"
import { SeatedUserInstance } from "components/models/character/seatedUserInstance"
import { useDialogStore } from "stores/useOpenDialogStore"
import { useFetchDigitalZone } from "queries/useFetchSeat"
import { type SeatState, type Coordinate, type SeatStateDto } from "shared/types/type"

export const DigitalZoneScene = () => {
    const numberOfSeat = useRef<number>(50);
    const itemsPerLine = useRef<number>(5);

    const { isPending, data } = useFetchDigitalZone()
    const { setDialog } = useDialogStore();

    const [seatPosition, setSeatPosition] = useState<Coordinate[]>([]);
    const [occupiedSeatPosition, setOccupiedSeatPosition] = useState<SeatState[]>([]);

    useEffect(() => {
        const initMap = () => {
            if (isPending) return;

            const width = 36;
            const seatPosition = digitZoneMapState(data, width);

            setDialog(
                <Map
                    seatPosition={seatPosition}
                    style={{ width: '350px', height: '900px' }}
                    userStartPosition="left" />
            )
        }

        initMap();
    }, [isPending, data, setDialog]);

    useEffect(() => {
        const initPerson = () => {
            if (isPending) return;

            const seatWidth = 2.057;
            const seatPosition = digitZoneSeatPosition(numberOfSeat.current, seatWidth)

            const occupiedSeat = data.slice(0, numberOfSeat.current).filter(
                (seat: SeatStateDto) => seat.status === '사용 중'
            ).map(
                (seat: SeatStateDto) => {
                    const seatState: SeatState = { ...seatPosition[seat.number - 1], seat }

                    return seatState
                });

            setOccupiedSeatPosition(occupiedSeat);
        }

        initPerson();
    }, [isPending, data]);

    useLayoutEffect(() => {
        const initSeat = () => {
            const seatWidth = 1.466;
            const seatPosition = digitZoneSeatPosition(numberOfSeat.current, seatWidth)

            setSeatPosition(seatPosition);
        }

        initSeat();
    }, []);

    return (
        <Physics>
            <Player />
            <RigidBody type='fixed' >
                <Asphalt position={[20, 0, -48]} />
            </RigidBody>
            {!isPending && <SeatedUserInstance
                position={[16.5, 0.05, -4.7]}
                seatPosition={occupiedSeatPosition}
                itemsPerLine={itemsPerLine.current} />}
            <DigitalZoneTable
                position={[30, 0, 1.8]}
                numberOfSeat={numberOfSeat.current}
                itemsPerLine={itemsPerLine.current} />
            <ChairInstance
                position={[16.5, 0, -4.7]}
                seatPosition={seatPosition}
                itemsPerLine={itemsPerLine.current} />
        </Physics>
    )
}