import { Physics, RigidBody } from "@react-three/rapier"

import { Player } from "components/models/character/player"
import { Asphalt } from "components/models/floor/asphalt"

export const DigitalZoneScene = () => {
    return (
        <Physics>
            <Player />
            <RigidBody type='fixed' >
                <Asphalt />
            </RigidBody>
        </Physics>
    )
}