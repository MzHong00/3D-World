import { useNavigate } from "react-router-dom";

import { type IArea } from "shared/types/type";
import { Dialog } from "shared/ui/Dialog/useDialog";
import { firstLetterUppercase } from "shared/utils/firstLetterUp";
import { useDialogStore } from "shared/stores/useDialogStore";

import styles from "./detailAreaDialog.module.css";

export const DetailAreaDialog = ({ name, bgUrl }: IArea) => {
  const navigate = useNavigate();
  const { setDialogClose } = useDialogStore();

  const onClickCloseDialog = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setDialogClose();
    navigate(`/world/${name}`);
  };

  return (
    <Dialog
      style={{ backgroundImage: `url(${bgUrl})` }}
      className={styles.bgRightAnimation}
    >
      <div className={styles.contentBox}>
        <section className={styles.leftContent}>
          <h1>
            <span>{firstLetterUppercase(name) + " Zone"}</span>
          </h1>
          <button
            className={styles.admissionButton}
            onClick={onClickCloseDialog}
          >
            입 장
          </button>
        </section>
      </div>
    </Dialog>
  );
};
