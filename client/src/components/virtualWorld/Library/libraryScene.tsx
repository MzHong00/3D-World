import { Physics } from "@react-three/rapier";

import { LaptopZoneScene } from "../laptop/laptopScene";
import { DigitalZoneScene } from "../digital/digitalZoneScene";
import { Player } from "components/models/character/player";
import { CenterWall } from "components/models/wall/centerWall";
import { useEffect } from "react";
import { useFetchDigitalZone, useFetchLabtopZone } from "queries/useFetchSeat";
import { useDialogStore } from "stores/useOpenDialogStore";
import { organizeMapPosition } from "../laptop/position/organizeMapPosition";
import { digitZoneMapPosition } from "../digital/position/digitZoneMapPosition";
import { Map } from "../map/map";

export const LibraryScene = () => {
  //크롤링한 도서관 Data 상태
  const { isPending: LaptopPending, data: LaptopData } = useFetchLabtopZone();
  const { isPending: DigitPending, data: DigitData } = useFetchDigitalZone();
  const { setDialog } = useDialogStore();

  useEffect(() => {
    const initMap = () => {
      if (LaptopPending || DigitPending) return;

      const width = 25;
      const laptopSeatPosition = organizeMapPosition(LaptopData, width);
      const digitSeatPosition = digitZoneMapPosition(DigitData, width);

      const Floor3SeatPosition = [...laptopSeatPosition, ...digitSeatPosition];

      console.log(Floor3SeatPosition);
      
      setDialog(
        <Map
          seatPosition={Floor3SeatPosition}
          style={{ width: "100vw", height: "100vh" }}
          xSpeed={12}
          ySpeed={9.4}
        />
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
      <CenterWall position={[4.5, -0.75, -32.5]} />
    </Physics>
  );
};
