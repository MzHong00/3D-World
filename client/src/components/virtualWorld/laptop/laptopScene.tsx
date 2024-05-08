import { useEffect } from "react"
import { Physics, RigidBody } from "@react-three/rapier"

import { Player } from "components/models/character/player"
import { Asphalt } from "components/models/floor/asphalt"
import { LaptopZoneChair } from "components/models/chair/laptopZoneChair"
import { useDialogStore } from "stores/useOpenDialogStore"
import { useFetchLabtopZone } from "queries/useFetchSeat"
import { LaptopZoneTable } from "components/models/table/laptopZoneTable"
import { organizeSeatState } from "./position/organizeSeatState"
import { Map } from "../map/map"

export const LaptopZoneScene = () => {
    const { isPending, data } = useFetchLabtopZone()
    const { setDialog } = useDialogStore();

    useEffect(() => {
        const openDialog = () => {
            if(isPending) return;

            const width = 28;
            const seatPosition = organizeSeatState(data, width);
    
            setDialog(<Map seatPosition={seatPosition} style={{width: '550px', height: 'auto'}}/>)
        }

        openDialog();
    }, [data, setDialog]);
    
    
    return (
        <Physics>
            <Player/>
            <RigidBody type='fixed' >
                <Asphalt />
            </RigidBody>
            
            <LaptopZoneTable numberOfSeat={200} position={[-10.5, 0, -1.5]} />
            <LaptopZoneChair numberOfSeat={200} position={[-9, 0, -1.5]} />
        </Physics>
    )
}