import { UserPointer, type UserStartPosition } from "./userPointer";
import { Dialog } from "shared/hooks/Dialog/useDialog";

import styles from "./map.module.css";
import { DialogHTMLAttributes } from "react";
import { CharSpeed, SeatState } from "shared/types/type";

interface Props
  extends DialogHTMLAttributes<HTMLDialogElement>,
    Partial<UserStartPosition>,
    Partial<CharSpeed> {
  seatPosition: SeatState[];
}

export const Map = ({
  seatPosition = [],
  xSpeed,
  ySpeed,
  children,
  ...props
}: Props) => {
  return (
    <Dialog className={styles.dialog} {...props}>
      <div className={styles.laptopZone}>
      <UserPointer xSpeed={xSpeed} ySpeed={ySpeed} />
        {seatPosition?.map((seat, idx) => (
          <div
            key={idx}
            className={styles.seat}
            style={{
              right: seat.x,
              bottom: seat.z,
              backgroundColor: `${
                seat.seat.status === "배정가능" ? "#85d604" : "#f18fee"
              }`
            }}
          >
            <span className={styles.seatFont}>{seat.seat.number}</span>
          </div>
        ))}
      </div>
      {children}
    </Dialog>
  );
};
