import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useName } from '../contexts/NameContext';
import logo from '../assets/Logo.png'; // Adjust path as needed

// Import audio file using ES module import
import comedyPopSound from '../assets/audio/sound-effect/comedy_pop_finger_in_mouth_001.mp3';

const InputNameScreen = () => {
  const navigate = useNavigate();
  const { updateName, scores } = useName();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isInputValid, setIsInputValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sound, setSound] = useState(null);

  // Clean up sound when component unmounts
  useEffect(() => {
    return () => {
      if (sound) {
        sound.pause();
      }
    };
  }, [sound]);

  const playSound = async (soundFile) => {
    try {
      const audio = new Audio(soundFile);
      setSound(audio);
      await audio.play();
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  };

  const handleFirstNameChange = (e) => {
    const text = e.target.value;
    setFirstName(text);
    validateInput(text, lastName);
  };

  const handleLastNameChange = (e) => {
    const text = e.target.value;
    setLastName(text);
    validateInput(firstName, text);
  };

  const validateInput = (first, last) => {
    setIsInputValid(first.trim().length > 0 && last.trim().length > 0);
  };

  const handleContinue = async () => {
    // Use the imported audio file instead of require()
    await playSound(comedyPopSound);
    const fullName = `${firstName.trim()} ${lastName.trim()}`;
    updateName(firstName, lastName);
    setLoading(true);

    try {
      const url = "https://script.google.com/macros/s/AKfycbww9pbG0AV5oaCVh8wRwigFDYXe3R-YJLxzFzulTAqPNxkReh_BHibGVlfVuY4qro-N1Q/exec?action=getUsers";
      let response = await fetch(url);
      let json = await response.json();

      if (Array.isArray(json) && json.length > 0) {
        let foundEntries = json
          .filter(entry => entry.fullname.trim() === fullName.trim() && entry["PDF URL"])
          .reverse();

        if (foundEntries.length > 0) {
          window.alert("🎉 พบเกียรติบัตรของคุณ! คุณสามารถดาวน์โหลดเกียรติบัตรของคุณได้ทันที");
          navigate('/certificate');
        } else {
          // If certificate not found, send the data to request a certificate
          await sendCertificate(fullName);
        }
      } else {
        await sendCertificate(fullName);
      }
    } catch (error) {
      setLoading(false);
      window.alert("ข้อผิดพลาด: เกิดปัญหาในการตรวจสอบชื่อของคุณ กรุณาลองใหม่");
    }
  };

  // Function to send data to Google Script to request a certificate
  const sendCertificate = async (name) => {
    setLoading(true);
    const url = 'https://script.google.com/macros/s/AKfycbxEWkLcf4TYCS7i3tSQGP7qYbiLTViyWsiqr73sn3QlI5kbniMZelXVXFE4Dvc3KAqygA/exec?action=addUser';

    const date = new Date();
    const thaiYear = date.getFullYear() + 543;
    const thaiDate = `${date.getDate()} ${date.toLocaleString("th-TH", { month: "long" })} พ.ศ. ${thaiYear}`;

    const formData = new URLSearchParams();
    formData.append('fullname', name);
    formData.append('preTest', scores.preTest);
    formData.append('simulationGame', scores.simulationGame);
    formData.append('matchingGame', scores.matchingGame);
    formData.append('spellingGame', scores.spellingGame);
    formData.append('postTest', scores.postTest);
    formData.append('date', thaiDate);
  
    try {
      let response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString(),
      });
      
      let json = await response.json();

      if (json.status === "success") {
        setLoading(false);
        navigate("/feedback");
      } else {
        throw new Error(json.message);
      }
    } catch (error) {
      setLoading(false);
      window.alert("❌ เกิดข้อผิดพลาด: " + error.message);
    }
  };

  return (
    <div style={styles.flexContainer}>
      <div style={styles.scrollContainer}>
        <img src={logo} alt="Logo" style={styles.logo} />
        <h2 style={styles.title}>กรุณากรอกชื่อและนามสกุล</h2>

        <div style={styles.inputContainer}>
          <label style={styles.label}>ชื่อ</label>
          <input
            style={styles.input}
            onChange={handleFirstNameChange}
            placeholder="ใส่ชื่อ"
            value={firstName}
          />
        </div>

        <div style={styles.inputContainer}>
          <label style={styles.label}>นามสกุล</label>
          <input
            style={styles.input}
            onChange={handleLastNameChange}
            placeholder="ใส่นามสกุล"
            value={lastName}
          />
        </div>
      </div>

      <div style={styles.buttonContainer}>
        <button
          style={{ ...styles.button, ...(!isInputValid && styles.disabledButton) }}
          onClick={handleContinue}
          disabled={!isInputValid}
        >
          ดำเนินการต่อ
        </button>
      </div>

      {loading && (
        <div style={styles.modalBackground}>
          <div style={styles.modalContainer}>
            <div style={styles.loader}></div>
            <p style={styles.loadingText}>กำลังดำเนินการ...</p>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  flexContainer: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: "#FFFFFF",
  },
  scrollContainer: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },
  logo: {
    width: "100px",
    height: "100px",
    marginBottom: "30px",
  },
  title: {
    fontSize: "22px",
    fontWeight: "600",
    color: "#333333",
    textAlign: "center",
    marginBottom: "20px",
  },
  inputContainer: {
    width: "100%",
    marginBottom: "15px",
  },
  label: {
    fontSize: "16px",
    color: "#666666",
    marginBottom: "5px",
    display: "block",
  },
  input: {
    width: "100%",
    border: "1px solid #DDDDDD",
    borderRadius: "8px",
    padding: "12px",
    fontSize: "16px",
    backgroundColor: "#F9F9F9",
  },
  buttonContainer: {
    padding: "20px",
    backgroundColor: "#FFFFFF",
  },
  button: {
    backgroundColor: "#1E90FF",
    padding: "14px 0",
    borderRadius: "25px",
    width: "100%",
    border: "none",
    cursor: "pointer",
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: "16px",
  },
  disabledButton: {
    backgroundColor: "#A9A9A9",
  },
  modalBackground: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    backgroundColor: "#FFFFFF",
    padding: "20px",
    borderRadius: "15px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  loader: {
    border: "8px solid #f3f3f3",
    borderTop: "8px solid #1E90FF",
    borderRadius: "50%",
    width: "60px",
    height: "60px",
    animation: "spin 2s linear infinite",
  },
  loadingText: {
    marginTop: "10px",
    fontSize: "16px",
    color: "#1E90FF",
    fontWeight: "bold",
  },
};

// Add keyframes for the loader animation
const styleSheet = document.styleSheets[0];
const keyframes =
  `@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }`;
styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

export default InputNameScreen;
