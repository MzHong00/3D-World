import { Physics, RigidBody } from "@react-three/rapier"

import { Player } from "components/models/character/player"
import { Asphalt } from "components/models/floor/asphalt"
import { useFetchLabtopZone } from "queries/useFetchSeat"
import { useEffect } from "react"
import { useCharacterPos } from "stores/useCharacterPos"
import { useDialogStore } from "stores/useOpenDialogStore"
import { LaptopZoneMap } from "./map/laptopZoneMap"

export const LaptopZoneScene = () => {
    const { data } = useFetchLabtopZone()
    const { setDialog } = useDialogStore();
    const { position } = useCharacterPos(state => state);
    
    useEffect(() => {
        setDialog(<LaptopZoneMap characterPos={position} seatList={data}/>)
    }, [position, data, setDialog]);

    return (
        <Physics>
            <Player />
            <RigidBody type='fixed' >
                <Asphalt />
            </RigidBody>
        </Physics>
    )
}