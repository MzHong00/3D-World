import { Link } from "react-router-dom";
import { Dialog } from "shared/hooks/Dialog/useDialog";

import styles from "./detailAreaDialog.module.css";
import { firstLetterUppercase } from "shared/utils/firstLetterUp";
import { type Area } from "shared/types/type";

export const DetailAreaDialog = (area: Area) => {
  let admissionLink = `/world/${area.floor}`;
  if (area.floor === "1F") {
    admissionLink = "https://www.wsu.ac.kr/main/intro.jsp";
  } else if (area.floor === "5F") {
    admissionLink = "https://library.wsu.ac.kr/";
  }

  return (
    <Dialog
      style={{ backgroundImage: `url(${area.bgUrl})` }}
      className={`${
        area.name === "entrance"
          ? styles.bgDownAnimation
          : styles.bgRightAnimation
      }`}
    >
      <div className={styles.contentBox}>
        <section className={styles.leftContent}>
          <h1>
            <span>{firstLetterUppercase(area.name) + " Zone"}</span>
          </h1>
          {area.floor === "1F" || area.floor === "5F" ? (
            <a
              href={admissionLink}
              className={styles.admissionButton}
              target="_blank"
              rel="noopener noreferrer"
            >
              입 장
            </a>
          ) : (
            <Link to={admissionLink} className={styles.admissionButton}>
              입 장
            </Link>
          )}
        </section>
      </div>
    </Dialog>
  );
};
