import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HomeScreen.module.css'; // Import CSS Module
import Logo from '../assets/ic_launcher-web.png';

const HomeScreen = () => {
  return (
    <div className={styles.homeContainer}>
      <img src={Logo} alt="Logo" className={styles.logo} />
      <h1 className={styles.title}>ยินดีต้อนรับ</h1>
      <p className={styles.subtitle}>เรียนรู้เกี่ยวกับยาความเสี่ยงสูงผ่านแบบทดสอบและเกม</p>

      <div className={styles.infoBox}>
        <ul>
          <li>📝 Pre-test: ทดสอบระดับความรู้</li>
          <li>🎓 เรียนรู้ผ่านสไลด์พร้อมเสียงบรรยาย</li>
          <li>🧩 เล่นเกมจับคู่ยา & สะกดคำ</li>
          <li>🏆 Post-test: ตรวจสอบความเข้าใจ</li>
          <li>🎖️ คะแนน 80% ขึ้นไป รับเกียรติบัตร</li>
        </ul>
      </div>

      <Link to="/pre-test" className={styles.startButton}>🚀 เริ่มเรียนรู้</Link>
    </div>
  );
};

export default HomeScreen;
