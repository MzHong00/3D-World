import { GroupProps } from "@react-three/fiber";

import { TableInstance } from "../../../../../shared/ui/Table/tableInstance";
import { organizeTablePos } from "../../laptop/position/organizeTablePosition";

interface Props extends GroupProps {
  itemsPerLine: number;
}

export const Room1Table = ({
  itemsPerLine,
  ...props
}: Props) => {
  const tablePosition = organizeTablePos(180, itemsPerLine);

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
    </group>
  );
};
