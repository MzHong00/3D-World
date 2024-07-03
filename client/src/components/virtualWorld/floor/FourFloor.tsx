import { useEffect } from "react";
import { Physics } from "@react-three/rapier";

import { AppearanceTophography } from "../world/laptop/models/appearanceTophography";
import { ColliderTophography } from "../world/laptop/models/colliderTophography";
import { Player } from "components/character/player";
import { Map } from "components/virtualWorld/map/map";
import { Room1Scene } from "components/virtualWorld/world/room1/room1Scene";
import { Room2Scene } from "components/virtualWorld/world/room2/room2Scene";
import { organizeMapPosition } from "components/virtualWorld/world/laptop/position/organizeMapPosition";
import { room2MapPosition } from "components/virtualWorld/world/room2/position/room2MapPosition";
import { useFetchRoom1Zone, useFetchRoom2Zone } from "queries/useFetchSeat";
import { useDialogStore } from "stores/useOpenDialogStore";
import { usePerformanceMode } from "stores/usePerformanceMode";

export const FourFloor = () => {
  //크롤링한 도서관 Data 상태
  const { isPending: Room1Pending, data: Room1Data } = useFetchRoom1Zone();
  const { isPending: Room2Pending, data: Room2Data } = useFetchRoom2Zone();
  const { setDialog } = useDialogStore();
  const { setPerformanceMode } = usePerformanceMode();

  useEffect(() => {
    const initMap = () => {
      if (Room1Pending || Room2Pending) return;
      
      const width = 25;
      const room1SeatPosition = organizeMapPosition(Room1Data.slice(0, 180), width);
      const room2SeatPosition = room2MapPosition(Room2Data, width);

      const Floor4SeatPosition = [...room1SeatPosition, ...room2SeatPosition];

      setDialog(
        <Map seatPosition={Floor4SeatPosition} xSpeed={12.05} ySpeed={10.2} />
      );
    };

    initMap();

    return () => {
      setPerformanceMode('high');
    }
  }, [Room1Pending, Room2Pending, Room1Data, Room2Data, setDialog, setPerformanceMode]);

  return (
    <Physics>
      <Player />
      <Room1Scene
        position={[-4, 0, 0]}
        isPending={Room1Pending}
        data={Room1Data}
      />
      <Room2Scene
        position={[3, 0, 0]}
        isPending={Room2Pending}
        data={Room2Data}
      />
      <AppearanceTophography position={[4.5, 0, -32.5]} />
      <ColliderTophography position={[4.5, 0, -32.5]} />
    </Physics>
  );
};
