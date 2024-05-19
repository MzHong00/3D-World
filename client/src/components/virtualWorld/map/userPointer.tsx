import { useRef } from "react"
import { useCharacterPos } from "stores/useCharacterPos"

import styles from './map.module.css'
import { type CharSpeed } from "shared/types/type"

export interface UserStartPosition extends Partial<CharSpeed> {
    userStartPosition?: 'left' | 'right'
}

export const UserPointer = ({
    userStartPosition, xSpeed=10, ySpeed=10
}: UserStartPosition) => {
    const widthSpeed = useRef<number>(xSpeed);
    const heightSpeed = useRef<number>(ySpeed);
    const { position } = useCharacterPos(state => state);

    return (
        <h2 style={{ transform: `translate(${position.x * widthSpeed.current}px, ${position.z * heightSpeed.current}px)`}} 
            className={`${styles.character} ${userStartPosition === 'left' ? styles.characterLeftPos : styles.characterRightPos}`}>@</h2>
    )
}