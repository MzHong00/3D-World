import { Physics, RigidBody } from "@react-three/rapier"

import { Player } from "components/models/character/player"
import { Asphalt } from "components/models/floor/asphalt"
import { EntryFloor } from "components/models/floor/entryFloor"

export const EntranceScene = () => {

    return (
        <Physics gravity={[0, -30, 0]}>
            <Player />
            <RigidBody type='fixed' >
                <Asphalt />
            </RigidBody>
            <EntryFloor type='fixed' position={[0, 0, 0]} />
        </Physics>
    )
}