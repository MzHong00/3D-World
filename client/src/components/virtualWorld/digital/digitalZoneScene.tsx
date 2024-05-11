import { useEffect } from "react"
import { Physics, RigidBody } from "@react-three/rapier"

import { Player } from "components/models/character/player"
import { Asphalt } from "components/models/floor/asphalt"
import { useDialogStore } from "stores/useOpenDialogStore"
import { useFetchDigitalZone } from "queries/useFetchSeat"
import { Map } from "../map/map"
import { digitZoneSeatState } from "./position/digitZoneSeatState"

export const DigitalZoneScene = () => {
    const { isPending, data } = useFetchDigitalZone()
    const { setDialog } = useDialogStore();

    useEffect(() => {
        const openDialog = () => {
            if(isPending) return;
            
            const width = 36;
            const seatPosition = digitZoneSeatState(data, width);
            console.log(seatPosition);
            
            setDialog(<Map userStartPosition="left" seatPosition={seatPosition} style={{width: '550px', height: '900px'}}/>)
        }

        openDialog();
    }, [data, setDialog]);
    
    return (
        <Physics>
            <Player />
            <RigidBody type='fixed' >
                <Asphalt />
            </RigidBody>
        </Physics>
    )
}