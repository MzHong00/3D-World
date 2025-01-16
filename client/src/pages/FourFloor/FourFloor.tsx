import { useEffect } from "react";
import { Physics } from "@react-three/rapier";

import { AppearanceTophography } from "../../components/laptop/ui/appearanceTophography";
import { ColliderTophography } from "../../components/laptop/ui/colliderTophography";
import { Player } from "components/player";
import { Map } from "components/map/map";
import { Room1Scene } from "components/room1/ui/room1Scene";
import { Room2Scene } from "components/room2/ui/room2Scene";
import { organizeMapPosition } from "components/laptop/models/organizeMapPosition";
import { room2MapPosition } from "components/room2/models/room2MapPosition";
import { useFetchRoom1Zone, useFetchRoom2Zone } from "queries/useFetchSeat";
import { useDialogStore } from "shared/stores/useDialogStore";
import { usePerformanceModeStore } from "shared/stores/usePerformanceModeStore";

export const FourFloor = () => {
  const { setPerformanceMode } = usePerformanceModeStore();
  const { setDialog, setDialogClose } = useDialogStore();
  const { isPending: Room1Pending, data: Room1Data } = useFetchRoom1Zone();
  const { isPending: Room2Pending, data: Room2Data } = useFetchRoom2Zone();

  useEffect(() => {
    const initMap = () => {
      if (Room1Pending || Room2Pending) return;

      const width = 25;
      const room1SeatPosition = organizeMapPosition(
        Room1Data.slice(0, 180),
        width
      );
      const room2SeatPosition = room2MapPosition(Room2Data, width);

      const Floor4SeatPosition = [...room1SeatPosition, ...room2SeatPosition];

      setDialog(
        <Map seatPosition={Floor4SeatPosition} xSpeed={12.05} ySpeed={10.2} />
      );
    };

    initMap();

    return () => {
      setPerformanceMode("high");
      setDialogClose();
    };
  }, [
    Room1Pending,
    Room2Pending,
    Room1Data,
    Room2Data,
    setDialog,
    setDialogClose,
    setPerformanceMode,
  ]);

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