import { Physics } from "@react-three/rapier";

import { Player } from "components/models/character/player";
import { CenterWall } from "components/models/wall/centerWall";
import { useEffect } from "react";
import { useFetchRoom1Zone, useFetchRoom2Zone } from "queries/useFetchSeat";
import { useDialogStore } from "stores/useOpenDialogStore";
import { organizeMapPosition } from "../laptop/position/organizeMapPosition";
import { Map } from "../map/map";
import { room2MapPosition } from "../room2/position/room2MapPosition";
import { Room1Scene } from "../room1/room1Scene";
import { Room2Scene } from "../room2/room2Scene";

export const FourFloor = () => {
  //크롤링한 도서관 Data 상태
  const { isPending: Room1Pending, data: Room1Data } = useFetchRoom1Zone();
  const { isPending: Room2Pending, data: Room2Data } = useFetchRoom2Zone();
  const { setDialog } = useDialogStore();

  useEffect(() => {
    const initMap = () => {
      if (Room1Pending || Room2Pending) return;

      const width = 25;
      const room1SeatPosition = organizeMapPosition(Room1Data, width);
      const room2SeatPosition = room2MapPosition(Room2Data, width);

      const Floor4SeatPosition = [...room1SeatPosition, ...room2SeatPosition];

      console.log(Floor4SeatPosition);
      
      setDialog(
        <Map
          seatPosition={Floor4SeatPosition}
          xSpeed={12.05}
          ySpeed={10.2}
        />
      );
    };

    initMap();
  }, [Room1Pending, Room2Pending, Room1Data, Room2Data, setDialog]);

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
      <CenterWall position={[4.5, -0, -32.5]} />
    </Physics>
  );
};
