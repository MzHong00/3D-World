import { GroupProps } from "@react-three/fiber";

import { organizeTablePos } from "../models/organizeTablePosition";
import { TableInstance } from "shared/ui/Table/tableInstance";

interface Props extends GroupProps {
  itemsPerLine: number;
}

export const LaptopZoneTable = ({ itemsPerLine, ...props }: Props) => {
  const tablePosition = organizeTablePos(200, itemsPerLine);

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
        rotation={[0, Math.PI / 2, 0]}
        tablePosition={tablePosition.xLargeTable}
        adjustXSize={12}
        adjustZSize={1.5}
      />
    </group>
  );
};
