import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './HomeScreen.module.css';
import Logo from '../assets/ic_launcher-web.png';
import clickSound from '../assets/audio/sound-effect/apt-game-start_CHpU5qX.mp3'; // Import your sound file

const HomeScreen = () => {
  const [audio] = useState(new Audio(clickSound));

  const handleClick = () => {
    audio.play();
  };

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

      <Link to="/pre-test" className={styles.startButton} onClick={handleClick}>🚀 เริ่มเรียนรู้</Link>
    </div>
  );
};

export default HomeScreen;
