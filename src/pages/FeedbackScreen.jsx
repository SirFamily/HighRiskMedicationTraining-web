import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { QRCodeSVG } from 'qrcode.react';

// Import the audio file directly (using import)
import popSound from "../assets/audio/sound-effect/comedy_pop_finger_in_mouth_001.mp3";

const FeedbackScreen = () => {
  const [qrScale, setQrScale] = useState(1);
  const navigate = useNavigate();
  const [sound, setSound] = useState(null);
  const feedbackUrl = "https://forms.gle/mSmR4AvuAuAVvJ6p7";

  useEffect(() => {
    return () => {
      if (sound) {
        sound.pause();
      }
    };
  }, [sound]);

  const handlePressIn = () => {
    setQrScale(0.95);
  };

  const handlePressOut = () => {
    setQrScale(1);
  };

  const playSound = async (soundFile) => {
    try {
      const audio = new Audio(soundFile);
      setSound(audio);
      await audio.play();
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  };

  const handleGoToCertificate = async () => {
    await playSound(popSound); // Use the imported variable
    if (window.confirm("รบกวนทำแบบสอบถามก่อนรับเกียรติบัตร 🙏")) {
      navigate("/certificate");
    }
  };

  const handleOpenFeedback = async () => {
    await playSound(popSound); // Use the imported variable
    window.open(feedbackUrl, "_blank");
  };

  return (
    <div style={styles.modalContainer}>
      <p style={styles.modalTitle}>สแกน QR Code เพื่อประเมิน</p>
      <button
        style={styles.touchable}
        onMouseDown={handlePressIn}
        onMouseUp={handlePressOut}
        onTouchStart={handlePressIn}
        onTouchEnd={handlePressOut}
      >
        <div
          style={{
            ...styles.qrContainer,
            transform: `scale(${qrScale})`,
            transition: "transform 0.2s ease-in-out",
          }}
        >
          <QRCodeSVG
            value={feedbackUrl}
            size={200}
            fgColor="#2C3E50"
            bgColor="white"
          />
        </div>
      </button>
      <p style={styles.qrInstruction}>
        สแกน QR Code เพื่อประเมินความพึงพอใจ หรือคลิกที่ลิงก์ด้านล่าง
      </p>
      <button style={styles.linkButton} onClick={handleOpenFeedback}>
        <p style={styles.link}>เปิดแบบฟอร์มประเมิน</p>
      </button>
      <button style={styles.closeButton} onClick={handleGoToCertificate}>
        <p style={styles.closeButtonText}>ไปยังหน้าเกียรติบัตร</p>
      </button>
    </div>
  );
};

const styles = {
  modalContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "25px",
    minHeight: "100vh",
  },
  modalTitle: {
    fontSize: "20px",
    fontWeight: 700,
    marginBottom: "15px",
    color: "#2C3E50",
    textAlign: "center",
  },
  qrContainer: {
    border: "2px solid #3498DB",
    borderRadius: "15px",
    padding: "10px",
    backgroundColor: "white",
  },
  qrInstruction: {
    marginTop: "15px",
    color: "#7F8C8D",
    fontSize: "14px",
    textAlign: "center",
    maxWidth: "250px",
  },
  link: {
    fontSize: "16px",
    color: "#3498DB",
    marginTop: "15px",
    fontWeight: 500,
    textDecoration: "underline",
    cursor: "pointer",
  },
  linkButton: {
    background: "none",
    border: "none",
    padding: 0,
  },
  closeButton: {
    marginTop: "25px",
    backgroundColor: "#3498DB",
    padding: "12px 30px",
    borderRadius: "25px",
    border: "none",
    cursor: "pointer",
    width: "100%",
  },
  closeButtonText: {
    color: "white",
    fontSize: "16px",
    fontWeight: 600,
    textAlign: "center",
    margin: 0,
  },
  touchable: {
    background: "none",
    border: "none",
    padding: 0,
    cursor: "pointer",
  },
};

export default FeedbackScreen;
