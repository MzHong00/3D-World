import { DigitalZoneScene } from "../digital/digitalZoneScene"
import { LaptopZoneScene } from "../laptop/laptopScene"

export const LibraryScene = () => {

    return (
        <>
            <LaptopZoneScene />
            <DigitalZoneScene />
        </>
    )
}