import { useEffect } from "react";
import { Physics } from "@react-three/rapier";

import { Player } from "components/models/character/player";
import { Map } from "components/virtualWorld/map/map";

import { AppearanceTophography } from "../worldComponents/laptop/models/appearanceTophography";
import { ColliderTophography } from "../worldComponents/laptop/models/colliderTophography";
import { LaptopZoneScene } from "components/virtualWorld/worldComponents/laptop/laptopScene";
import { organizeMapPosition } from "components/virtualWorld/worldComponents/laptop/position/organizeMapPosition";
import { DigitalZoneScene } from "components/virtualWorld/worldComponents//digital/digitalZoneScene";
import { digitZoneMapPosition } from "components/virtualWorld/worldComponents/digital/position/digitZoneMapPosition";
import { useFetchDigitalZone, useFetchLabtopZone } from "queries/useFetchSeat";
import { useDialogStore } from "stores/useOpenDialogStore";
import { useWebSocket } from "shared/hooks/useWebSocket";

export const ThirdFloor = () => {
  //크롤링한 도서관 Data 상태
  const { isPending: LaptopPending, data: LaptopData } = useFetchLabtopZone();
  const { isPending: DigitPending, data: DigitData } = useFetchDigitalZone();
  const { setDialog } = useDialogStore();
  useWebSocket();

  useEffect(() => {
    const initMap = () => {
      if (LaptopPending || DigitPending) return;

      const width = 25;
      const laptopSeatPosition = organizeMapPosition(LaptopData, width);
      const digitSeatPosition = digitZoneMapPosition(DigitData, width);

      const Floor3SeatPosition = [...laptopSeatPosition, ...digitSeatPosition];

      setDialog(
        <Map seatPosition={Floor3SeatPosition} xSpeed={12} ySpeed={10.2} />
      );
    };

    initMap();
  }, [LaptopPending, DigitPending, LaptopData, DigitData, setDialog]);

 

  return (
    <Physics>
      <Player />
      <LaptopZoneScene
        position={[-4, 0, 0]}
        isPending={LaptopPending}
        data={LaptopData}
      />
      <DigitalZoneScene
        position={[3, 0, 0]}
        isPending={DigitPending}
        data={DigitData}
      />
      <AppearanceTophography position={[4.5, 0, -32.5]} />
      <ColliderTophography position={[4.5, 0, -32.5]} />
    </Physics>
  );
};
