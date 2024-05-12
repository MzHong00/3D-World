import { useEffect, useLayoutEffect, useState } from "react"
import { Physics, RigidBody } from "@react-three/rapier"

import { Player } from "components/models/character/player"
import { Asphalt } from "components/models/floor/asphalt"
import { useDialogStore } from "stores/useOpenDialogStore"
import { useFetchLabtopZone } from "queries/useFetchSeat"
import { LaptopZoneTable } from "components/models/table/laptopZoneTable"
import { organizeSeatState } from "./position/organizeSeatState"
import { Map } from "../map/map"
import { organizeSeatPos } from "./position/organizeSeatPosition"
import { Coordinate, SeatStateDto } from "shared/types/type"
import { ChairInstance } from "components/models/chair/chairInstance"
import { SeatedUserInstance } from "components/models/character/seatedUserInstance"

export const LaptopZoneScene = () => {
    const { isPending, data } = useFetchLabtopZone();
    const { setDialog } = useDialogStore();

    const [seatPosition, setSeatPosition] = useState<Coordinate[]>([]);
    const [occupiedSeatPosition, setOccupiedSeatPosition] = useState<Coordinate[]>([]);

    useEffect(() => {
        const initDialog = () => {
            if (isPending) return;

            const width = 28;
            const organizedSeat = organizeSeatState(data, width);

            setDialog(<Map seatPosition={organizedSeat} style={{ width: '550px', height: '900px' }} />)
        }

        initDialog();
    }, [isPending, data, setDialog]);

    useEffect(() => {
        const initOccupiedPosition = () => {
            if (isPending) return;

            const numberOfSeat = 200;
            const seatWidth = 2.057;

            const seatPosition = organizeSeatPos(numberOfSeat, seatWidth)

            const occupiedSeat = data.slice(0, numberOfSeat).map((seat: SeatStateDto, idx: number) => {
                if (seat.status === '배정가능') {
                    return seatPosition[seat.number - 1]
                }
            });

            setOccupiedSeatPosition(occupiedSeat);
        }

        initOccupiedPosition();
    }, [isPending, data]);

    useLayoutEffect(() => {
        const initSeatPosition = () => {
            const numberOfSeat = 200;
            const seatWidth = 1.37;

            const seatPosition = organizeSeatPos(numberOfSeat, seatWidth)
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
            {!isPending && <SeatedUserInstance numberOfSeat={200} seatPosition={occupiedSeatPosition} position={[-10.7, 0, -6.5]} />}
            <LaptopZoneTable numberOfSeat={200} position={[-12.7, 0, -2.5]} />
            <ChairInstance numberOfSeat={200} seatPosition={seatPosition} position={[-10.7, 0, -6.5]} />
        </Physics>
    )
}