import { useRef } from "react"
import { useCharacterPos } from "stores/useCharacterPos"

import styles from './map.module.css'

export interface UserStartPosition {
    userStartPosition: 'left' | 'right'
}

export const UserPointer = ({
    userStartPosition
}: UserStartPosition) => {
    const widthSpeed = useRef<number>(13.2);
    const heightSpeed = useRef<number>(9.4);
    const { position } = useCharacterPos(state => state);

    return (
        <h2 
        style={{ transform: `translate(${position.x * widthSpeed.current}px, ${position.z * heightSpeed.current}px)`}} 
        className={`${styles.character} ${userStartPosition === 'left' ? styles.characterLeftPos : styles.characterRightPos}`}>@</h2>
    )
}