import { Physics, RigidBody } from "@react-three/rapier"

import { Player } from "components/models/character/player"
import { EntryFloor } from "components/models/floor/entryFloor"
import { ZoneFloor } from "components/models/floor/zoneFloor"

export const EntranceScene = () => {

    return (
        <Physics gravity={[0, -30, 0]}>
            <Player />
            <RigidBody type='fixed' >
                <ZoneFloor args={[42, 100]}/>
            </RigidBody>
            <EntryFloor type='fixed' position={[0, 0, 0]} />
        </Physics>
    )
}