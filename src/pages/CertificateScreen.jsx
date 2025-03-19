import React, { useState, useEffect, useRef } from "react";
import Confetti from "react-confetti"; // Ensure to install this package
import trophyImg from "../assets/trophy.png";
import linkImg from "../assets/link.png";
import certificateSound from "../assets/audio/sound-effect/gen-prbmuue.mp3";

const CertificateScreen = () => {
  const [fullName, setFullName] = useState("");
  const [pdfUrl, setPdfUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sound, setSound] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () =>
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const storedFirstName = sessionStorage.getItem("firstName");
    const storedLastName = sessionStorage.getItem("lastName");
    if (storedFirstName && storedLastName) {
      setFullName(`${storedFirstName} ${storedLastName}`);
    }
  }, []);

  const fetchCertificate = async () => {
    setLoading(true);
    const url =
      "https://script.google.com/macros/s/AKfycbww9pbG0AV5oaCVh8wRwigFDYXe3R-YJLxzFzulTAqPNxkReh_BHibGVlfVuY4qro-N1Q/exec?action=getUsers";
    try {
      const response = await fetch(url);
      const json = await response.json();
      if (Array.isArray(json) && json.length > 0) {
        const foundEntries = json
          .filter(
            (entry) =>
              entry.fullname.trim() === fullName.trim() && entry["PDF URL"]
          )
          .reverse();
        if (foundEntries.length > 0) {
          const latestEntry = foundEntries[0];
          setPdfUrl(latestEntry["PDF URL"]);
          setShowConfetti(true);
        } else {
          setPdfUrl(null);
        }
      }
    } catch (error) {
      console.error("Error fetching certificate:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (fullName) {
      fetchCertificate();
    }
  }, [fullName]);

  useEffect(() => {
    if (pdfUrl) {
      setTimeout(async () => {
        await playSound(certificateSound);
      }, 800);
    }
  }, [pdfUrl]);

  const playSound = async (soundFile) => {
    try {
      const audio = new Audio(soundFile);
      setSound(audio);
      await audio.play();
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  };

  return (
    <div style={styles.container}>
      {showConfetti && (
        <Confetti
          width={windowDimensions.width}
          height={windowDimensions.height}
          numberOfPieces={250}
          recycle={false}
          gravity={0.3}
        />
      )}

      <img src={trophyImg} alt="Trophy" style={styles.trophyIcon} />
      <h1 style={styles.title}>🏆 เกียรติบัตร</h1>
      <p style={styles.congrats}>🎉 ขอแสดงความยินดี!</p>
      <p style={styles.name}>{fullName}</p>

      {loading ? (
        <div style={styles.loadingContainer}>
          <p style={styles.defaultText}>กำลังตรวจสอบข้อมูล...</p>
          <div style={styles.loader}></div>
        </div>
      ) : pdfUrl ? (
        <button
          style={styles.certificateButton}
          onClick={() => window.open(pdfUrl, "_blank")}
        >
          <div style={styles.buttonContent}>
            <img
              src={linkImg}
              alt="Link"
              style={{ width: 24, height: 24, marginRight: 10 }}
            />
            <span style={styles.linkText}>เปิดเกียรติบัตร</span>
          </div>
        </button>
      ) : (
        <div style={{ textAlign: "center" }}>
          <p style={styles.error}>❌ ไม่พบเกียรติบัตรของคุณ</p>
          <button
            style={styles.refreshButton}
            onClick={fetchCertificate}
            disabled={loading}
          >
            <span style={styles.refreshButtonText}>
              {loading ? "⏳ กำลังโหลด..." : "🔄 รีเฟรชข้อมูล"}
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    // background: "linear-gradient(to top left, #FFDEE9, #B5FFFC)",
  },
  title: {
    fontSize: "36px",
    fontWeight: "800",
    color: "#2C3E50",
    marginBottom: "10px",
    textShadow: "3px 3px 5px rgba(0,0,0,0.2)",
    fontFamily: "'Roboto', sans-serif",
  },
  congrats: {
    fontSize: "28px",
    color: "#27AE60",
    fontWeight: "600",
    marginBottom: "5px",
  },
  name: {
    fontSize: "32px",
    fontWeight: "700",
    color: "#E74C3C",
    marginBottom: "30px",
    textAlign: "center",
    textShadow: "1px 1px 3px rgba(231,76,60,0.2)",
    fontFamily: "'Roboto', sans-serif",
  },
  trophyIcon: {
    width: "120px",
    height: "120px",
    marginBottom: "20px",
    animation: "bounce 1s infinite",
  },
  
  certificateButton: {
    backgroundColor: "#2980B9",
    padding: "15px 35px",
    borderRadius: "30px",
    marginBottom: "20px",
    border: "none",
    cursor: "pointer",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
    transition: "all 0.3s ease",
  },
  certificateButtonHover: {
    transform: "scale(1.05)",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
  },
  buttonContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  linkText: {
    color: "white",
    fontSize: "20px",
    fontWeight: "600",
  },
  error: {
    fontSize: "18px",
    color: "#C0392B",
    fontWeight: "600",
    marginBottom: "20px",
  },
  refreshButton: {
    backgroundColor: "#7F8C8D",
    padding: "15px 40px",
    borderRadius: "25px",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    transition: "all 0.3s ease",
  },
  refreshButtonText: {
    color: "white",
    fontSize: "16px",
    fontWeight: "500",
  },
  defaultText: {
    fontSize: "16px",
    color: "#7F8C8D",
    marginBottom: "15px",
    textAlign: "center",
  },
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  loader: {
    border: "8px solid #f3f3f3",
    borderTop: "8px solid #E74C3C",
    borderRadius: "50%",
    width: "60px",
    height: "60px",
    animation: "spin 2s linear infinite",
  },
};

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = `
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}`;
document.head.appendChild(styleSheet);

export default CertificateScreen;
