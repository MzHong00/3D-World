import { useEffect } from "react";
import { Physics } from "@react-three/rapier";

import { Player } from "components/player";
import { Map } from "components/map/map";

import { LaptopZoneScene } from "components/laptop/ui/laptopScene";
import { organizeMapPosition } from "components/laptop/models/organizeMapPosition";
import { DigitalZoneScene } from "components/digital/ui/digitalZoneScene";
import { digitZoneMapPosition } from "components/digital/models/digitZoneMapPosition";
import { useDialogStore } from "shared/stores/useDialogStore";
import { usePerformanceModeStore } from "shared/stores/usePerformanceModeStore";
import { AppearanceTophography } from "components/laptop/ui/appearanceTophography";
import { ColliderTophography } from "components/laptop/ui/colliderTophography";
import { generateSeatData } from "shared/utils/generateSeatData";

const LaptopData = generateSeatData(200);
const DigitData = generateSeatData(50);

export const ThirdFloor = () => {
  const { setPerformanceMode } = usePerformanceModeStore();
  const { setDialog, setDialogClose } = useDialogStore();

  useEffect(() => {
    const initMap = () => {
      const width = 25;
      const laptopSeatPosition = organizeMapPosition(LaptopData, width);
      const digitSeatPosition = digitZoneMapPosition(DigitData, width);

      const Floor3SeatPosition = [...laptopSeatPosition, ...digitSeatPosition];

      setDialog(
        <Map seatPosition={Floor3SeatPosition} xSpeed={12} ySpeed={10.2} />
      );
    };

    initMap();

    return () => {
      setPerformanceMode("high");
      setDialogClose();
    };
  }, [setDialog, setDialogClose, setPerformanceMode]);

  return (
    <Physics>
      <Player />
      <LaptopZoneScene position={[-4, 0, 0]} data={LaptopData} />
      <DigitalZoneScene position={[3, 0, 0]} data={DigitData} />
      <AppearanceTophography position={[4.5, 0, -32.5]} />
      <ColliderTophography position={[4.5, 0, -32.5]} />
    </Physics>
  );
};
