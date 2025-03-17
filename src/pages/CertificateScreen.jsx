import React, { useState, useEffect, useRef } from "react";
// import { useName } from "../contexts/NameContext";
import Confetti from "react-confetti"; // Make sure to install this package: npm install react-confetti

// Import images and audio files
import trophyImg from "../assets/trophy.png";
import linkImg from "../assets/link.png";
import certificateSound from "../assets/audio/sound-effect/gen-prbmuue.mp3";

const CertificateScreen = () => {
  // const { firstName, lastName } = useName(); // Remove this line
  // const fullName = `${firstName} ${lastName}`; // Remove this line
  const [fullName, setFullName] = useState(""); // Add this line
  const [pdfUrl, setPdfUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sound, setSound] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  // We'll use a ref to store the window dimensions for confetti
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Fetch window dimensions on resize
  useEffect(() => {
    const handleResize = () =>
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Load name from session storage on component mount
  useEffect(() => {
    const storedFirstName = sessionStorage.getItem("firstName");
    const storedLastName = sessionStorage.getItem("lastName");
    if (storedFirstName && storedLastName) {
      setFullName(`${storedFirstName} ${storedLastName}`);
    }
  }, []);

  // Fetch certificate data from Google Script
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

  // Play certificate sound after a delay when pdfUrl is available
  useEffect(() => {
    if (pdfUrl) {
      setTimeout(async () => {
        await playSound(certificateSound);
      }, 800);
    }
  }, [pdfUrl]);

  // Play sound using the HTML Audio API
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
          numberOfPieces={200}
          recycle={false}
        />
      )}

      {/* Trophy image with bounce animation */}
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
    background: "linear-gradient(to bottom right, #FFDEE9, #B5FFFC)",
  },
  title: {
    fontSize: "32px",
    fontWeight: "800",
    color: "#2C3E50",
    marginBottom: "10px",
    textShadow: "2px 2px 5px rgba(0,0,0,0.1)",
  },
  congrats: {
    fontSize: "24px",
    color: "#27AE60",
    fontWeight: "600",
    marginBottom: "5px",
  },
  name: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#E74C3C",
    marginBottom: "30px",
    textAlign: "center",
    textShadow: "1px 1px 3px rgba(231,76,60,0.2)",
  },
  trophyIcon: {
    width: "100px",
    height: "100px",
    marginBottom: "20px",
    transform: "rotate(-15deg)",
    animation: "bounce 1s infinite",
  },
  certificateButton: {
    backgroundColor: "#2980B9",
    padding: "15px 30px",
    borderRadius: "25px",
    marginBottom: "20px",
    border: "none",
    cursor: "pointer",
    boxShadow: "0 2px 3px rgba(0,0,0,0.3)",
  },
  buttonContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  linkText: {
    color: "white",
    fontSize: "18px",
    fontWeight: "600",
    letterSpacing: "0.5px",
  },
  error: {
    fontSize: "18px",
    color: "#C0392B",
    fontWeight: "600",
    marginBottom: "20px",
  },
  refreshButton: {
    backgroundColor: "#7F8C8D",
    padding: "15px",
    borderRadius: "20px",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
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

// Inject keyframes for bounce and spin animations into the document head
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = `
@keyframes bounce {
  0%, 100% { transform: translateY(0) rotate(-15deg); }
  50% { transform: translateY(-15px) rotate(-15deg); }
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}`;
document.head.appendChild(styleSheet);

export default CertificateScreen;
