import { useEffect } from "react"
import { Physics, RigidBody } from "@react-three/rapier"

import { Player } from "components/models/character/player"
import { Asphalt } from "components/models/floor/asphalt"
import { useDialogStore } from "stores/useOpenDialogStore"
import { useFetchRoom1Zone } from "queries/useFetchSeat"
import { LaptopZoneTable } from "components/models/table/laptopZoneTable"

export const Room1Scene = () => {
    const { data } = useFetchRoom1Zone()
    const { setDialog } = useDialogStore();

    // useEffect(() => {
    //     setDialog(<LaptopZoneMap seatList={data} />)
    // }, [data, setDialog]);
    
    // console.log(data);
    
    return (
        <Physics debug>
            <Player />
            <RigidBody type='fixed' >
                <Asphalt />
            </RigidBody>
{/*             
            <LaptopZoneTable numberOfSeat={180} position={[-3.5, 0, -0.3]} />
            <LaptopZoneChair numberOfSeat={180} position={[-2, 0, -0.3]} /> */}
        </Physics>
    )
}