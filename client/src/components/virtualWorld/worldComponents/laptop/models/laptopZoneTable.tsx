import { GroupProps } from "@react-three/fiber";

import { TableInstance } from "../../../../models/table/tableInstance";
import { organizeTablePos } from "../position/organizeTablePosition";

interface Props extends GroupProps {
  numberOfSeat: number;
  itemsPerLine: number;
}

export const LaptopZoneTable = ({
  numberOfSeat,
  itemsPerLine,
  ...props
}: Props) => {
  const tablePosition = organizeTablePos(numberOfSeat, itemsPerLine);

  return (
    <group {...props}>
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
      <TableInstance
        rotation={[0, Math.PI /2, 0]}
        tablePosition={tablePosition.xLargeTable}
        adjustXSize={12}
        adjustZSize={2}
      />
    </group>
  );
};
