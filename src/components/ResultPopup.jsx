import React from 'react';
import styles from './ResultPopup.module.css'; // Create this stylesheet

const ResultPopup = ({ score, totalQuestions, onClose }) => {
  return (
    <div className={styles.popupContainer}>
      <div className={styles.popupContent}>
        <h2>🎉 คุณทำแบบทดสอบเสร็จแล้ว!</h2>
        <p className={styles.score}>คะแนนของคุณ: {score} / {totalQuestions}</p>
        {/* <button className={styles.closeButton} onClick={onClose}>ปิด</button> */}
        <button className={styles.nextButton} onClick={onClose}>➡️ ไปเรียนรู้</button> {/* Added Next Button */}
      </div>
    </div>
  );
};

export default ResultPopup;
