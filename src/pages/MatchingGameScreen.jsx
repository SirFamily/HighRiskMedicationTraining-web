import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useName } from "../contexts/NameContext";
import ResultModal from "../components/ResultModal"; // Import ResultModal

// Import images
import adrenalineImg from "../assets/img-drug/adrenaline.jpg";
import dopamineImg from "../assets/img-drug/dopamine.jpg";
import norepinephrineImg from "../assets/img-drug/Norepinephrine.jpg";
import amiodaroneImg from "../assets/img-drug/amiodarone.jpg";
import nicardipineImg from "../assets/img-drug/nicardipine.jpg";
import morphineImg from "../assets/img-drug/morphine.jpg";
import pethidineImg from "../assets/img-drug/pethidine.jpg";
import fentanylImg from "../assets/img-drug/fentanyl.jpg";
import potassiumImg from "../assets/img-drug/potassium-chloride.jpg";
import magnesiumImg from "../assets/img-drug/magnesium.jpg";
import insulinImg from "../assets/img-drug/insulin.jpg";
import sodiumBicarbImg from "../assets/img-drug/sodium-Bicarbonate.jpg";

// Import audio files
import buttonSoundFile from "../assets/audio/sound-effect/comedy_pop_finger_in_mouth_001.mp3";
import correctSoundFile from "../assets/audio/sound-effect/correct.mp3";
import errorSoundFile from "../assets/audio/sound-effect/erro.mp3";
import tadaSoundFile from "../assets/audio/sound-effect/ta-da_yrvBrlS.mp3";


const drugPairs = [
  { drug: "Adrenaline(Epinephrine)", use: "ใช้ในการช่วยฟื้นคืนชีพกรณีหัวใจหยุดเต้น (Cardiac Arrest)", image: adrenalineImg },
  { drug: "Dopamine", use: "เพิ่มความดันโลหิต", image: dopamineImg },
  { drug: "Norepinephrine(Levophed)", use: "รักษาภาวะ shock ในกรณีที่ให้สารน้ำทดแทนเพียงพอแล้วอาการไม่ดีขึ้น, Severe hypotension", image: norepinephrineImg },
  { drug: "Amiodarone", use: "Atrial fibrillation with rapid ventricular response (AF with RVR)", image: amiodaroneImg },
  { drug: "Nicardipine", use: "Hypertension, Postoperative Hypertension, Chronic stable angina MORPHINE SULFATE", image: nicardipineImg },
  { drug: "Morphine(MO)", use: "บรรเทาอาการปวดแบบเฉียบพลันและเรื้อรัง เช่น หลังผ่าตัดหรือจากโรคมะเร็ง และ myocardial infarction รักษาภาวะ Acute pulmonary edema ที่เกิดจาก left ventricular failure", image: morphineImg },
  { drug: "Pethidine", use: "Pain (Moderate to Severe)", image: pethidineImg },
  { drug: "Fentanyl", use: "บรรเทาอาการปวดรุนแรง เช่น ปวดจากมะเร็ง ปวดหลังการผ่าตัด ปวดจากอุบัติเหตุรุนแรง", image: fentanylImg },
  { drug: "Potassium chloride (KCL)", use: "ภาวะ hypokalemia", image: potassiumImg },
  { drug: "Magnesium sulfate", use: "Hypomagnesemia, Torsades de Pointes ป้องกันและรักษาภาวะชักจากครรภ์เป็นพิษ (Pre-eclampsia)", image: magnesiumImg },
  { drug: "Regular insulin", use: "Type 1 diabetes mellitus, Type 2 diabetes mellitus", image: insulinImg },
  { drug: "7.5% Sodium Bicarbonate", use: "รักษาภาวะเลือดเป็นกรด", image: sodiumBicarbImg },
];

const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

const DrugMatchingGameScreen = () => {
  const [drugs, setDrugs] = useState([]);
  const [uses, setUses] = useState([]);
  const [selectedDrug, setSelectedDrug] = useState(null);
  const [matches, setMatches] = useState({});
  const navigate = useNavigate();
  const { updateScore } = useName();
  const [showResultModal, setShowResultModal] = useState(false); // Add state for modal
  const allMatchedRef = useRef(false); // Use ref to track if all matched
  const [wrongSelection, setWrongSelection] = useState(null);

  // Play sound using the HTML Audio API
  const playSound = async (soundFile) => {
    const audio = new Audio(soundFile);
    try {
      await audio.play();
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  };

  useEffect(() => {
    // Shuffle game data on mount
    shuffleGame();
  }, []);

  const shuffleGame = () => {
    setMatches({});
    setSelectedDrug(null);
    setDrugs(shuffleArray([...drugPairs]));
    setUses(shuffleArray([...drugPairs]));
    allMatchedRef.current = false; // Reset the ref when shuffling
    setWrongSelection(null);
  };

  const handleSelect = async (item, type) => {
    await playSound(buttonSoundFile);
    if (type === "drug") {
      setSelectedDrug(item);
    } else if (selectedDrug) {
      const correctPair = drugPairs.find(
        (pair) => pair.drug === selectedDrug && pair.use === item
      );
      if (correctPair) {
        await playSound(correctSoundFile);
        setMatches((prev) => ({ ...prev, [selectedDrug]: item }));
        setSelectedDrug(null);
        setWrongSelection(null);
      } else {
        await playSound(errorSoundFile);
        setWrongSelection(item);
        setTimeout(() => {
          setWrongSelection(null);
        }, 500);
      }
    }
  };

  const allMatched = Object.keys(matches).length === drugPairs.length;

  useEffect(() => {
    if (allMatched && !allMatchedRef.current) {
      allMatchedRef.current = true;
      const score = drugPairs.length;
      updateScore("matchingGame", score);
      sessionStorage.setItem("matchingGameScore", score); // Store score in sessionStorage
      setShowResultModal(true)
    }
  }, [allMatched, updateScore]);

  const handleCloseModal = () => {
    setShowResultModal(false);
    goToNextGame();
  };

  const goToNextGame = async () => {
    await playSound(buttonSoundFile);
    // Replace the current history entry instead of pushing a new one
    navigate("/spelling-game", { replace: true }); 
  };
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>เกมจับคู่ยา</h1>
      <p style={styles.subtitle}>จับคู่ "ชื่อยา" กับ "ข้อบ่งใช้" ให้ถูกต้อง</p>
      <div style={styles.gameContainer}>
        <div style={styles.column}>
          {drugs.map(({ drug, image }) => {
            const cardStyle = {
              ...styles.card,
              ...(selectedDrug === drug ? styles.selectedCard : {}),
              ...(matches[drug] ? styles.matchedCard : {}),
            };
            return (
              <div
                key={drug}
                style={cardStyle}
                onClick={() => handleSelect(drug, "drug")}
              >
                {image && <img src={image} alt={drug} style={styles.drugImage} />}
                <p style={styles.cardText}>{drug}</p>
              </div>
            );
          })}
        </div>
        <div style={styles.column}>
          {uses.map(({ use }) => {
            const cardStyle = {
              ...styles.card,
              ...(Object.values(matches).includes(use) ? styles.matchedCard : {}),
              ...(wrongSelection === use ? styles.wrongCard : {}),
            };
            return (
              <div
                key={use}
                style={cardStyle}
                onClick={() => handleSelect(use, "use")}
              >
                <p style={styles.cardText}>{use}</p>
              </div>
            );
          })}
        </div>
      </div>
      <ResultModal
        show={showResultModal}
        score={drugPairs.length}
        totalQuestions={drugPairs.length}
        feedback={"คุณทำแบบทดสอบเสร็จสมบูรณ์แล้ว! เยี่ยมมาก!"}
        onClose={handleCloseModal}
      />
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    padding: "20px",
    paddingTop: "60px",
    paddingBottom: "40px", // Added bottom padding
    // background: "linear-gradient(to bottom right, #e0f7fa, #f1f8e9)",
    overflow: "hidden", // Prevent overall page scroll
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    textAlign: "center",
    color: "#34495e",
    marginBottom: "8px", // Added spacing
  },
  subtitle: {
    fontSize: "14px",
    color: "#7f8c8d",
    textAlign: "center",
    marginBottom: "20px",
  },
  gameContainer: {
    display: "flex",
    justifyContent: "space-between",
    gap: "20px", // Add gap between columns
    height: "calc(100vh - 180px)", // Fixed height based on viewport
    overflow: "hidden", // Hide overflow from container
    padding: "10px",
  },
  column: {
    width: "48%",
    height: "100%",
    overflowY: "auto", // Enable vertical scrolling
    paddingRight: "8px", // Add space for scrollbar

    // Scrollbar styling
    "&::-webkit-scrollbar": {
      width: "6px",
    },
    "&::-webkit-scrollbar-track": {
      background: "#f1f1f1",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#888",
      borderRadius: "4px",
    },
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "12px",
    marginBottom: "10px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    textAlign: "center",
    cursor: "pointer",
    transition: "transform 0.2s, background-color 0.2s", // Add hover effect and background-color transition
    "&:hover": {
      transform: "translateY(-2px)",
    },
  },

  cardText: {
    fontSize: "13px",
    textAlign: "center",
    color: "#34495e",
    margin: 0,
  },
  selectedCard: {
    border: "2px solid #3498db",
  },
  matchedCard: {
    backgroundColor: "#dcedc8",
  },
  wrongCard: {
    backgroundColor: "#ffdddd", // Light red background
    animation: "wrong-selection 0.5s ease-in-out",
  },
  nextButton: {
    backgroundColor: "#3498db",
    borderRadius: "20px",
    padding: "12px",
    textAlign: "center",
    marginTop: "10px",
    cursor: "pointer",
    border: "none",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "16px",
    display: "block",
    margin: "10px auto 0",
  },
  drugImage: {
    width: "80px",
    height: "80px",
    marginBottom: "8px",
    objectFit: "contain",
  },
};

export default DrugMatchingGameScreen;
