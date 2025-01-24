import { RiLoader3Line } from "@react-icons/all-files/ri/RiLoader3Line";

import styles from "./index.module.css";

export const LoadingPage = () => {
  return (
    <div className={styles.container}>
      <div></div>
      <b>잠시만 기다려 주세요.</b>
      <p>페이지를 불러오고 있습니다.</p>
      <RiLoader3Line />
    </div>
  );
};
