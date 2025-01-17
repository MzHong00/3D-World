import { GroupProps } from "@react-three/fiber";

import { TableInstance } from "shared/ui/Table/tableInstance";
import { digitalZoneTablePosition } from "../models/digitZoneTablePosition";

interface Props extends GroupProps {
  numberOfSeat: number;
  itemsPerLine: number;
}

export const DigitalZoneTable = ({
  numberOfSeat,
  itemsPerLine,
  ...props
}: Props) => {
  const tablePosition = digitalZoneTablePosition(numberOfSeat, itemsPerLine);

  return (
    <group {...props} dispose={null}>
      <TableInstance
        tablePosition={tablePosition.smallTable}
        adjustXSize={6}
        adjustZSize={3.3}
      />
      <TableInstance
        tablePosition={tablePosition.bigTable}
        adjustXSize={8}
        adjustZSize={3.3}
      />
    </group>
  );
};
