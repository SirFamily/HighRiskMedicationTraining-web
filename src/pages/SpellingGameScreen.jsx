import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ResultModal from '../components/ResultModal';

// Import sound-effect files
import newFollowerSound from "../assets/audio/sound-effect/new-follower_62zQLKz.mp3";
import buttonSound from "../assets/audio/sound-effect/comedy_pop_finger_in_mouth_001.mp3";
import correctSound from "../assets/audio/sound-effect/correct.mp3";
import errorSound from "../assets/audio/sound-effect/erro.mp3";
import taDaSound from "../assets/audio/sound-effect/ta-da_yrvBrlS.mp3";
import pewPewSound from "../assets/audio/sound-effect/pew_pew-dknight556-1379997159.mp3";

// Import drug name sound files
import epinephrineSound from "../assets/audio/drug-names/Epinephrine.mp3";
import dopamineSound from "../assets/audio/drug-names/Dopamine.mp3";
import levophedSound from "../assets/audio/drug-names/Levophed.mp3";
import amiodaroneSound from "../assets/audio/drug-names/Amiodarone.mp3";
import nicardipineSound from "../assets/audio/drug-names/Nicardipine.mp3";
import morphineSound from "../assets/audio/drug-names/Morphine.mp3";
import pethidineSound from "../assets/audio/drug-names/Pethidine.mp3";
import insulinSound from "../assets/audio/drug-names/Insulin.mp3";
import potassiumChlorideSound from "../assets/audio/drug-names/Potassium_chloride.mp3";
import magnesiumSulfateSound from "../assets/audio/drug-names/Magnesium_sulfate.mp3";
import fentanylSound from "../assets/audio/drug-names/Fentanyl.mp3";
import sodiumBicarbonateSound from "../assets/audio/drug-names/Sodium_Bicarbonate.mp3";

const drugNames = [
  { name: "Epinephrine", sound: epinephrineSound },
  { name: "Dopamine", sound: dopamineSound },
  { name: "Levophed", sound: levophedSound },
  { name: "Amiodarone", sound: amiodaroneSound },
  { name: "Nicardipine", sound: nicardipineSound },
  { name: "Morphine", sound: morphineSound },
  { name: "Pethidine", sound: pethidineSound },
  { name: "Insulin", sound: insulinSound },
  { name: "Potassium chloride", sound: potassiumChlorideSound },
  { name: "Magnesium sulfate", sound: magnesiumSulfateSound },
  { name: "Fentanyl", sound: fentanylSound },
  { name: "Sodium Bicarbonate", sound: sodiumBicarbonateSound },
];

const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

const SpellingGameScreen = () => {
  const [currentDrug, setCurrentDrug] = useState("");
  const [letters, setLetters] = useState([]);
  const [userAnswer, setUserAnswer] = useState([]);
  const [usedIndexes, setUsedIndexes] = useState(new Set());
  const [completedWords, setCompletedWords] = useState([]);
  const [isLastWord, setIsLastWord] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [score, setScore] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  // เพิ่ม event listener เพื่อติดตามขนาดหน้าจอ
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    // Start a new round when the component mounts.
    startNewRound();
    // Cleanup: In a web environment, we let the Audio API handle unloading.
    return () => {};
  }, []);

  // Play a sound effect using the HTML Audio API
  const playSoundEffect = async (soundFile) => {
    try {
      const audio = new Audio(soundFile);
      await audio.play();
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  };

  // Play the drug name sound
  const playDrugSoundEffect = async (soundFile) => {
    try {
      const audio = new Audio(soundFile);
      await audio.play();
    } catch (error) {
      console.error("Error playing drug sound:", error);
    }
  };

  // Pick a new word that has not been completed yet.
  const pickNewWord = () => {
    if (completedWords.length === drugNames.length) {
      return null;
    }
    const availableWords = drugNames.filter(
      (word) => !completedWords.includes(word.name)
    );
    if (availableWords.length === 0) {
      return null;
    }
    setIsLastWord(availableWords.length === 1);
    return availableWords[Math.floor(Math.random() * availableWords.length)];
  };

  const startNewRound = async () => {
    await playSoundEffect(newFollowerSound);
    const newWord = pickNewWord();
    if (!newWord) {
      await playSoundEffect(taDaSound);
      // Play the last drug sound before showing alert.
      const lastDrugData = drugNames.find(
        (drug) => drug.name === completedWords[completedWords.length - 1]
      );
      if (lastDrugData && lastDrugData.sound) {
        setTimeout(async () => {
          await playDrugSoundEffect(lastDrugData.sound);
          setTimeout(() => {
            setScore(drugNames.length);
            setShowResultModal(true);
          }, 400);
        }, 400);
      } else {
        setTimeout(() => {
          setScore(drugNames.length);
          setShowResultModal(true);
        }, 400);
      }
      return;
    }
    setCurrentDrug(newWord.name);
    
    // Filter out spaces when creating the letters array for shuffling
    const lettersWithoutSpaces = newWord.name.split("")
      .map((char, index) => ({ 
        id: index, 
        letter: char,
        isSpace: char === " " 
      }))
      .filter(item => !item.isSpace);
      
    setLetters(shuffleArray(lettersWithoutSpaces));
    setUserAnswer([]);
    setUsedIndexes(new Set());
  };

  const handleSelectLetter = async (index, letter) => {
    await playSoundEffect(buttonSound);
    if (userAnswer.length < currentDrug.replace(/ /g, "").length && !usedIndexes.has(index)) {
      const newAnswer = [...userAnswer, { index, letter }];
      setUserAnswer(newAnswer);
      setUsedIndexes(new Set([...usedIndexes, index]));
      if (newAnswer.length === currentDrug.replace(/ /g, "").length) {
        // Reconstruct the answer string, accounting for spaces in the original drug name
        let answerWithSpaces = "";
        let letterIndex = 0;
        
        for (let i = 0; i < currentDrug.length; i++) {
          if (currentDrug[i] === " ") {
            answerWithSpaces += " ";
          } else {
            if (letterIndex < newAnswer.length) {
              answerWithSpaces += newAnswer[letterIndex].letter;
              letterIndex++;
            }
          }
        }
        
        checkAnswer(answerWithSpaces);
      }
    }
  };

  const handleRemoveLetter = async (index) => {
    await playSoundEffect(pewPewSound);
    const newAnswer = userAnswer.filter((_, i) => i !== index);
    setUserAnswer(newAnswer);
    const removedLetterIndex = userAnswer[index]?.index;
    if (removedLetterIndex !== undefined) {
      const newUsed = new Set(usedIndexes);
      newUsed.delete(removedLetterIndex);
      setUsedIndexes(newUsed);
    }
  };

  const checkAnswer = async (word) => {
    const currentDrugData = drugNames.find((drug) => drug.name === currentDrug);
    if (word === currentDrug) {
      setCompletedWords([...completedWords, currentDrug]);
      if (completedWords.length + 1 === drugNames.length) {
        await playSoundEffect(taDaSound);
        const score = drugNames.length;
        sessionStorage.setItem("spellingGameScore", score);
        if (currentDrugData && currentDrugData.sound) {
          setTimeout(async () => {
            await playDrugSoundEffect(currentDrugData.sound);
            setTimeout(() => {
              setScore(drugNames.length);
              setShowResultModal(true);
            }, 400);
          }, 400);
        } else {
          setTimeout(() => {
            setScore(drugNames.length);
            setShowResultModal(true);
          }, 400);
        }
      } else {
        await playSoundEffect(correctSound);
        setTimeout(async () => {
          if (currentDrugData && currentDrugData.sound) {
            await playDrugSoundEffect(currentDrugData.sound);
          }
          startNewRound();
        }, 400);
      }
    } else {
      playSoundEffect(errorSound);
    }
  };

  const handleCloseModal = () => {
    setShowResultModal(false);
    navigate("/simulation-game");
  };

  // Create an array that represents the answer boxes, including spaces
  const createAnswerSlots = () => {
    const slots = [];
    for (let i = 0; i < currentDrug.length; i++) {
      if (currentDrug[i] === " ") {
        slots.push({ isSpace: true });
      } else {
        const letterIndex = slots.filter(slot => !slot.isSpace).length;
        slots.push({ 
          isSpace: false, 
          letter: userAnswer[letterIndex]?.letter || "",
          answerIndex: letterIndex
        });
      }
    }
    return slots;
  };

  const answerSlots = createAnswerSlots();

  // คำนวณขนาดของช่องตัวอักษรตามขนาดหน้าจอ
  const getAnswerBoxSize = () => {
    if (windowWidth <= 320) return 24;
    if (windowWidth <= 480) return 30;
    if (windowWidth <= 768) return 36;
    return 42;
  };

  const getLetterBoxSize = () => {
    if (windowWidth <= 320) return 38;
    if (windowWidth <= 480) return 45;
    if (windowWidth <= 768) return 50;
    return 60;
  };

  const answerBoxSize = getAnswerBoxSize();
  const letterBoxSize = getLetterBoxSize();

  return (
    <div style={styles.container}>
      <div style={styles.scrollContainer}>
        <div style={styles.gameHeader}>
          <h1 style={styles.title}>🔠 เกมสะกดคำชื่อยา</h1>
          <p style={styles.subtitle}>เรียงตัวอักษรให้ถูกต้อง!</p>
        </div>

        <div style={styles.progressIndicator}>

          <div style={styles.progressBarOuter}>
            <div 
              style={{
                ...styles.progressBarInner,
                width: `${(completedWords.length / drugNames.length) * 100}%`
              }}
            />
          </div>
        </div>

        <div style={styles.answerContainer}>
          {answerSlots.map((slot, index) => 
            slot.isSpace ? (
              <div key={index} style={{...styles.spaceBox, width: answerBoxSize, height: answerBoxSize}}></div>
            ) : (
              <button
                key={index}
                style={{
                  ...styles.answerBox,
                  width: answerBoxSize,
                  height: answerBoxSize,
                  fontSize: answerBoxSize * 0.5,
                }}
                onClick={() => slot.letter && handleRemoveLetter(slot.answerIndex)}
              >
                <span style={styles.answerText}>
                  {slot.letter}
                </span>
              </button>
            )
          )}
        </div>

        <div style={styles.letterContainer}>
          {letters.map((item, index) => (
            <button
              key={index}
              style={{
                ...styles.letterBox,
                width: letterBoxSize,
                height: letterBoxSize,
                fontSize: letterBoxSize * 0.4,
                ...(usedIndexes.has(index) ? styles.disabledLetter : {}),
              }}
              onClick={() => handleSelectLetter(index, item.letter)}
              disabled={usedIndexes.has(index)}
            >
              <span style={styles.letterText}>{item.letter}</span>
            </button>
          ))}
        </div>

        <div style={styles.buttonContainer}>
          <button style={styles.newWordButton} onClick={startNewRound}>
            🔄 สุ่มคำใหม่
          </button>
        </div>
      </div>
      <ResultModal
        show={showResultModal}
        score={score}
        totalQuestions={drugNames.length}
        feedback={"คุณทำแบบทดสอบเสร็จสมบูรณ์แล้ว! เยี่ยมมาก!"}
        onClose={handleCloseModal}
      />
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    // background: "linear-gradient(to bottom right, #EDF7FF, #E6F9FF)",
    position: "relative",
    fontFamily: "'Prompt', sans-serif",
  },
  scrollContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "20px",
    minHeight: "100vh",
    width: "100%",
    maxWidth: "600px",
    margin: "0 auto",
    boxSizing: "border-box",
  },
  gameHeader: {
    width: "100%",
    textAlign: "center",
    marginBottom: "20px",
  },
  title: {
    fontSize: "clamp(24px, 5vw, 32px)",
    fontWeight: "bold",
    color: "#2C3E50",
    textAlign: "center",
    margin: "10px 0",
  },
  subtitle: {
    fontSize: "clamp(14px, 4vw, 18px)",
    color: "#5D6D7E",
    marginBottom: "10px",
    textAlign: "center",
  },
  progressIndicator: {
    width: "100%",
    marginBottom: "20px",
  },
  progressText: {
    fontSize: "14px",
    color: "#2C3E50",
    textAlign: "right",
    marginBottom: "5px",
  },
  progressBarOuter: {
    width: "100%",
    height: "8px",
    backgroundColor: "#E0E0E0",
    borderRadius: "4px",
    overflow: "hidden",
  },
  progressBarInner: {
    height: "100%",
    backgroundColor: "#4CAF50",
    borderRadius: "4px",
    transition: "width 0.3s ease",
  },
  answerContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "8px",
    width: "100%",
    marginBottom: "30px",
    padding: "10px",
    // backgroundColor: "rgba(255, 255, 255, 0.6)",
    borderRadius: "12px",
    // boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
  },
  answerBox: {
    backgroundColor: "#FFFFFF",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    border: "2px solid #FAD02E",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  spaceBox: {
    margin: "0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  answerText: {
    fontWeight: "bold",
    color: "#2C3E50",
  },
  letterContainer: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "10px",
    width: "100%",
    marginBottom: "30px",
    padding: "15px",
    // backgroundColor: "rgba(255, 255, 255, 0.6)",
    borderRadius: "12px",
    // boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
  },
  letterBox: {
    backgroundColor: "#3498DB",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "10px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    border: "none",
    cursor: "pointer",
    transition: "all 0.2s ease",
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
    },
  },
  disabledLetter: {
    backgroundColor: "#D3D3D3",
    cursor: "default",
    opacity: "0.6",
  },
  letterText: {
    fontWeight: "bold",
    color: "#FFF",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    gap: "10px",
    marginTop: "auto",
    padding: "10px 0",
  },
  newWordButton: {
    backgroundColor: "#FFA500",
    padding: "12px 20px",
    borderRadius: "25px",
    border: "none",
    color: "#FFF",
    fontWeight: "bold",
    fontSize: "16px",
    cursor: "pointer",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "all 0.2s ease",
    "&:hover": {
      backgroundColor: "#FF8C00",
      transform: "translateY(-2px)",
    },
  },
};

export default SpellingGameScreen;