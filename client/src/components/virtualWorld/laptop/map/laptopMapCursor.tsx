import { useRef } from "react"
import { useCharacterPos } from "stores/useCharacterPos"

import styles from './laptopMap.module.css'

export const LaptopZoneCursor = () => {
    const speed = useRef<number>(16);
    const { position } = useCharacterPos(state => state);

    return (
        <h2 style={{ transform: `translate(${position.x * speed.current}px, ${position.z * speed.current}px)` }} className={styles.character}>@</h2>
    )
}