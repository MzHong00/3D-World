import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { Physics, RigidBody } from "@react-three/rapier";

import { Map } from "../map/map";
import { organizeMapPosition } from "./position/organizeMapPosition";
import { organizeSeatPos } from "./position/organizeSeatPosition";
import { LaptopZoneTable } from "./models/laptopZoneTable";

import { ZoneFloor } from "components/models/floor/zoneFloor";
import { Player } from "components/models/character/player";
import { ChairInstance } from "components/models/chair/chairInstance";
import { SeatedUserInstance } from "components/models/character/seatedUserInstance";
import { useDialogStore } from "stores/useOpenDialogStore";
import { useFetchLabtopZone } from "queries/useFetchSeat";
import {
  SeatState,
  type Coordinate,
  type SeatStateDto,
} from "shared/types/type";
import { CenterWall } from "components/models/wall/centerWall";
import { SideWall } from "components/models/wall/sideWall";

export const LaptopZoneScene = () => {
  //총 좌석의 개수, 한 줄당 좌석의 개수
  const numberOfSeat = useRef<number>(200);
  const itemsPerLine = useRef<number>(10);

  //크롤링한 도서관 Data 상태
  const { isPending, data } = useFetchLabtopZone();
  const { setDialog } = useDialogStore();

  //모든 좌석의 좌표
  const [seatPosition, setSeatPosition] = useState<Coordinate[]>([]);
  //사용 중인 좌석들의 좌표
  const [occupiedSeatPosition, setOccupiedSeatPosition] = useState<SeatState[]>(
    []
  );

  useEffect(() => {
    const initMap = () => {
      if (isPending) return;

      const width = 28;
      const organizedSeat = organizeMapPosition(data, width);

      setDialog(
        <Map
          seatPosition={organizedSeat}
          style={{ width: "550px", height: "900px" }}
          xSpeed={13.2}
          ySpeed={9.4}
        />
      );
    };

    initMap();
  }, [isPending, data, setDialog]);

  useEffect(() => {
    const initPerson = () => {
      if (isPending) return;

      const seatWidth = 2.057;

      const seatPosition = organizeSeatPos(numberOfSeat.current, seatWidth);

      const occupiedSeat = data
        .filter((seat: SeatStateDto) => seat.status === "사용 중")
        .map((seat: SeatStateDto) => {
          const seatState: SeatState = {
            ...seatPosition[seat.number - 1],
            seat,
          };

          return seatState;
        });

      setOccupiedSeatPosition(occupiedSeat);
    };

    initPerson();
  }, [isPending, data]);

  useLayoutEffect(() => {
    const initSeat = () => {
      const seatWidth = 1.466;

      const seatPosition = organizeSeatPos(numberOfSeat.current, seatWidth);
      setSeatPosition(seatPosition);
    };

    initSeat();
  }, []);

  return (
    <Physics>
      <Player />
      <RigidBody type="fixed">
        <ZoneFloor position={[-19.5, 0, -48]} args={[41, 100]} />
      </RigidBody>
      {!isPending && (
        <SeatedUserInstance
          seatPosition={occupiedSeatPosition}
          position={[-38.3, 0, -6.5]}
          itemsPerLine={itemsPerLine.current}
        />
      )}
      <LaptopZoneTable
        position={[-12.7, 0, -2.5]}
        numberOfSeat={numberOfSeat.current}
        itemsPerLine={itemsPerLine.current}
      />
      <ChairInstance
        position={[-38.3, 0, -6.5]}
        seatPosition={seatPosition}
        itemsPerLine={itemsPerLine.current}
      />

      <SideWall position={[-40, 0.5, -48]} />
      <CenterWall position={[20.5, -0.75, -48]} scale={1.5} />
    </Physics>
  );
};
