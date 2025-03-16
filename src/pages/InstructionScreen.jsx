import React from "react";
import styles from "./InstructionScreen.module.css"; // Import CSS Module
import { useNavigate } from "react-router-dom";

const InstructionScreen = () => {
  const navigate = useNavigate();

  const playSound = () => {
    const audio = new Audio("/src/assets/audio/sound-effect/comedy_pop_finger_in_mouth_001.mp3"); // โหลดไฟล์เสียงจาก public/audio
    audio.play();
  };

  return (
    <div className={styles.instructionContainer}>
      <h1 className={styles.title}>📖 วิธีการเรียนรู้</h1>
      <p className={styles.description}>
        คุณสามารถเลือกวิธีการเรียนรู้ได้สองแบบ:
      </p>

      <div className={styles.buttonGroup}>
        <button
          className={styles.learnButton}
          onClick={() => {
            playSound();
            setTimeout(() => navigate("/matching-game"), 300);
          }}
        >
          📚 อ่านเนื้อหาด้วยตัวเอง
        </button>
        <button
          className={styles.videoButton}
          onClick={() => {
            playSound();
            setTimeout(() => navigate("/video"), 300);
          }}
        >
          🎥 เรียนรู้ผ่านวิดีโอ
        </button>
      </div>
    </div>
  );
};

export default InstructionScreen;
