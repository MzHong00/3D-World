import { useEffect } from "react"
import { Physics, RigidBody } from "@react-three/rapier"

import { Player } from "components/models/character/player"
import { Asphalt } from "components/models/floor/asphalt"
import { useDialogStore } from "stores/useOpenDialogStore"
import { useFetchDigitalZone } from "queries/useFetchSeat"
import { organizeSeatState } from "../laptop/position/organizeSeatState"
import { Map } from "../map/map"

export const DigitalZoneScene = () => {
    const { isPending, data } = useFetchDigitalZone()
    const { setDialog } = useDialogStore();

    useEffect(() => {
        const openDialog = () => {
            if(isPending) return;
            
            const width = 28;
            const seatPosition = organizeSeatState(data, width);
            console.log(seatPosition);
            
            setDialog(<Map userStartPosition="left" seatPosition={seatPosition} style={{width: '700px', height: '350px'}}/>)
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