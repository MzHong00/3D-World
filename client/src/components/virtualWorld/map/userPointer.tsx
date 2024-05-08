import { useRef } from "react"
import { useCharacterPos } from "stores/useCharacterPos"

import styles from './map.module.css'

export interface UserStartPosition {
    userStartPosition: 'left' | 'right'
}

export const UserPointer = ({
    userStartPosition
}: UserStartPosition) => {
    const speed = useRef<number>(15.9);
    const { position } = useCharacterPos(state => state);

    return (
        <h2 
        style={{ transform: `translate(${position.x * speed.current}px, ${position.z * speed.current}px)`}} 
        className={`${styles.character} ${userStartPosition === 'left' ? styles.characterLeftPos : styles.characterRightPos}`}>@</h2>
    )
}