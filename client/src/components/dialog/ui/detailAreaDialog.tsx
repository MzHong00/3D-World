import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Dialog } from "shared/ui/Dialog/useDialog";

import { type Area } from "shared/types/type";
import { firstLetterUppercase } from "shared/utils/firstLetterUp";

import styles from "./detailAreaDialog.module.css";

export const DetailAreaDialog = ({ name, bgUrl, floor }: Area) => {
  const link = useMemo(() => {
    if (floor === "1F") return "https://www.wsu.ac.kr/main/intro.jsp";
    if (floor === "5F") return "https://library.wsu.ac.kr/";
    return `/world/${floor}`;
  }, [floor]);

  return (
    <Dialog
      style={{ backgroundImage: `url(${bgUrl})` }}
      className={`${
        name === "entrance" ? styles.bgDownAnimation : styles.bgRightAnimation
      }`}
    >
      <div className={styles.contentBox}>
        <section className={styles.leftContent}>
          <h1>
            <span>{firstLetterUppercase(name) + " Zone"}</span>
          </h1>
          {floor === "1F" || floor === "5F" ? (
            <a
              href={link}
              className={styles.admissionButton}
              target="_blank"
              rel="noopener noreferrer"
            >
              입 장
            </a>
          ) : (
            <Link to={link} className={styles.admissionButton}>
              입 장
            </Link>
          )}
        </section>
      </div>
    </Dialog>
  );
};
