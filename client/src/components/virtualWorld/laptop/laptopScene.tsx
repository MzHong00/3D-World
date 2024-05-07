import { useEffect } from "react"
import { Physics, RigidBody } from "@react-three/rapier"

import { Player } from "components/models/character/player"
import { Asphalt } from "components/models/floor/asphalt"
import { LaptopZoneChair } from "components/models/chair/laptopZoneChair"
import { useDialogStore } from "stores/useOpenDialogStore"
import { useFetchLabtopZone } from "queries/useFetchSeat"
import { LaptopZoneMap } from "./map/laptopMap"
import { LaptopZoneTable } from "components/models/table/laptopZoneTable"

export const LaptopZoneScene = () => {
    const { isPending, data } = useFetchLabtopZone()
    const { setDialog } = useDialogStore();

    useEffect(() => {
        setDialog(<LaptopZoneMap seatList={data} />)
    }, [data, setDialog]);
    
    return (
        <Physics debug>
            <Player />
            <RigidBody type='fixed' >
                <Asphalt />
            </RigidBody>
            
            <LaptopZoneTable position={[-3.5, 0, -0.3]} />
            {!isPending && <LaptopZoneChair data={data} position={[-2, 0, -0.3]} />}
        </Physics>
    )
}