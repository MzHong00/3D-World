import { Physics, RigidBody } from "@react-three/rapier"

import { Player } from "components/models/character/player"
import { Asphalt } from "components/models/floor/asphalt"
import { useFetchLabtopZone } from "queries/useFetchSeat"
import { useEffect } from "react"
import { useCharacterPos } from "stores/useCharacterPos"
import { useDialogStore } from "stores/useOpenDialogStore"
import { LaptopZoneMap } from "./map/laptopZoneMap"
import { LaptopZoneTable } from "components/models/table/laptopZoneTable"

import chairGlb from 'shared/asset/3d/chair.glb'
import { useGLTF } from "@react-three/drei"

export const LaptopZoneScene = () => {
    const { data } = useFetchLabtopZone()
    const { setDialog } = useDialogStore();
    const { position } = useCharacterPos(state => state);

    const { nodes, materials }: any = useGLTF(`${chairGlb}`);

    useEffect(() => {
        setDialog(<LaptopZoneMap characterPos={position} seatList={data} />)
    }, [position, data, setDialog]);

    return (
        <Physics debug>
            <Player />
            <RigidBody type='fixed' >
                <Asphalt />
            </RigidBody>
            <LaptopZoneTable numberOfTable={1} data={data} />
        </Physics>
    )
}