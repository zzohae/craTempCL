import React, { useEffect } from "react";
import styles from './InfoHistory.module.scss';
import { ReactComponent as Circle } from '../../svg/infoHistory-circle.svg';


const InfoHistory = () => {
  useEffect(() => {
    const handleScroll = () => {
      const items = document.querySelectorAll(`.${styles["infoHistory-item"]}`);
      items.forEach((item) => {
        const rect = item.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
          item.classList.add(styles.visible);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const infoHistoryData = [
    { year: "1910", description: "청량리일대시장의 전신,<br />역전시장 개설" },
    { year: "1948", description: "청량리종합시장 개설" },
    { year: "1949", description: "청량리농수산물시장 개설" },
    { year: "1958", description: "청량리청과물시장 개설" },
    { year: "1960", description: "경동시장,<br />경동광성상가 개설" },
    { year: "1964", description: "청량리전통시장 개설" },
    { year: "1970", description: "청량리도매시장,<br />동서시장 개설" },
    { year: "2024", description: "청량마켓몰<br />리뉴얼" },
  ];

  return (
<div className={styles.infoHistory}
  style={{
    marginTop: "50px",
    borderTop: "2px solid #d2d2d2",}}>
  {infoHistoryData.map((item, index) => (
    <div className={styles["infoHistory-item"]} key={index}>
      <div
        className={`${styles["infoHistory-content"]} ${
          index % 2 === 0 ? styles.left : styles.right
        }`}>
        <h3 className="fs-h3" style={{ color: "#214aee" }}>
          {item.year}
        </h3>
        <p className="fs-h5"
          dangerouslySetInnerHTML={{ __html: item.description }}></p>
      </div>

      <div className={styles["infoHistory-circle"]}><Circle /></div>
    </div>
  ))}
</div>

  );
};

export default InfoHistory;
