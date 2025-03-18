import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
//   { name: "Epinephrine", sound: epinephrineSound },
  { name: "Dopamine", sound: dopamineSound },
//   { name: "Levophed", sound: levophedSound },
//   { name: "Amiodarone", sound: amiodaroneSound },
//   { name: "Nicardipine", sound: nicardipineSound },
//   { name: "Morphine", sound: morphineSound },
//   { name: "Pethidine", sound: pethidineSound },
//   { name: "Insulin", sound: insulinSound },
//   { name: "Potassium chloride", sound: potassiumChlorideSound },
//   { name: "Magnesium sulfate", sound: magnesiumSulfateSound },
//   { name: "Fentanyl", sound: fentanylSound },
//   { name: "Sodium Bicarbonate", sound: sodiumBicarbonateSound },
];

const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

const SpellingGameScreen = () => {
  const [currentDrug, setCurrentDrug] = useState("");
  const [letters, setLetters] = useState([]);
  const [userAnswer, setUserAnswer] = useState([]);
  const [usedIndexes, setUsedIndexes] = useState(new Set());
  const [completedWords, setCompletedWords] = useState([]);
  const [isLastWord, setIsLastWord] = useState(false);
  const navigate = useNavigate();

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
            window.alert(
              "🎉 คุณทำครบทุกคำแล้ว! ยินดีด้วย คุณทำแบบฝึกหัดสะกดคำครบถ้วนแล้ว!"
            );
            navigate("/simulation-game");
          }, 400);
        }, 400);
      } else {
        setTimeout(() => {
          window.alert(
            "🎉 คุณทำครบทุกคำแล้ว! ยินดีด้วย คุณทำแบบฝึกหัดสะกดคำครบถ้วนแล้ว!"
          );
          navigate("/simulation-game");
        }, 400);
      }
      return;
    }
    setCurrentDrug(newWord.name);
    setLetters(
      shuffleArray(
        newWord.name.split("").map((char, index) => ({ id: index, letter: char }))
      )
    );
    setUserAnswer([]);
    setUsedIndexes(new Set());
  };

  const handleSelectLetter = async (index, letter) => {
    await playSoundEffect(buttonSound);
    if (userAnswer.length < currentDrug.length && !usedIndexes.has(index)) {
      const newAnswer = [...userAnswer, { index, letter }];
      setUserAnswer(newAnswer);
      setUsedIndexes(new Set([...usedIndexes, index]));
      if (newAnswer.length === currentDrug.length) {
        checkAnswer(newAnswer.map((item) => item.letter).join(""));
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
        sessionStorage.setItem("spellingGameScore", score); // Add this line
        if (currentDrugData && currentDrugData.sound) {
          setTimeout(async () => {
            await playDrugSoundEffect(currentDrugData.sound);
            setTimeout(() => {
              window.alert(
                "🎉 คุณทำครบทุกคำแล้ว! ยินดีด้วย คุณทำแบบฝึกหัดสะกดคำครบถ้วนแล้ว!"
              );
              navigate("/simulation-game");
            }, 400);
          }, 400);
        } else {
          setTimeout(() => {
            window.alert(
              "🎉 คุณทำครบทุกคำแล้ว! ยินดีด้วย คุณทำแบบฝึกหัดสะกดคำครบถ้วนแล้ว!"
            );
            navigate("/simulation-game");
          }, 400);
        }
      } else {
        await playSoundEffect(correctSound);
        setTimeout(async () => {
          if (currentDrugData && currentDrugData.sound) {
            await playDrugSoundEffect(currentDrugData.sound);
          }
          window.alert(`✅ ถูกต้อง! คุณสะกด "${currentDrug}" ได้ถูกต้อง 🎉`);
          startNewRound();
        }, 400);
      }
    } else {
      playSoundEffect(errorSound);
      window.alert("❌ ผิด! ลองเรียงตัวอักษรใหม่อีกครั้ง!");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.scrollContainer}>
        <h1 style={styles.title}>🔠 เกมสะกดคำชื่อยา</h1>
        <p style={styles.subtitle}>เรียงตัวอักษรให้ถูกต้อง!</p>

        <div style={styles.answerContainer}>
          {Array.from({ length: currentDrug.length }).map((_, index) => (
            <button
              key={index}
              style={styles.answerBox}
              onClick={() => handleRemoveLetter(index)}
            >
              <span style={styles.answerText}>
                {userAnswer[index]?.letter || ""}
              </span>
            </button>
          ))}
        </div>

        <div style={styles.letterContainer}>
          {letters.map((item, index) => (
            <button
              key={index}
              style={{
                ...styles.letterBox,
                ...(usedIndexes.has(index) ? styles.disabledLetter : {}),
              }}
              onClick={() => handleSelectLetter(index, item.letter)}
              disabled={usedIndexes.has(index)}
            >
              <span style={styles.letterText}>{item.letter}</span>
            </button>
          ))}
        </div>

        <button style={styles.newWordButton} onClick={startNewRound}>
          🔄 สุ่มคำใหม่
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    // background: "linear-gradient(to bottom right, #FFDEE9, #B5FFFC)",
    position: "relative",
  },
  scrollContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    minHeight: "100vh",
  },
  title: {
    fontSize: "26px",
    fontWeight: "bold",
    color: "#2C3E50",
    textAlign: "center",
  },
  subtitle: {
    fontSize: "16px",
    color: "#5D6D7E",
    marginBottom: "20px",
    textAlign: "center",
  },
  answerContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "80%",
    marginBottom: "20px",
  },
  answerBox: {
    width: "50px",
    height: "50px",
    backgroundColor: "#FAD02E",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "5px",
    borderRadius: "8px",
    boxShadow: "0px 1px 2px rgba(0,0,0,0.2)",
    border: "none",
    cursor: "pointer",
  },
  answerText: {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#2C3E50",
  },
  letterContainer: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    padding: "10px",
  },
  letterBox: {
    width: "50px",
    height: "50px",
    backgroundColor: "#87CEEB",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "5px",
    borderRadius: "10px",
    boxShadow: "0px 1px 2px rgba(0,0,0,0.2)",
    border: "none",
    cursor: "pointer",
  },
  disabledLetter: {
    backgroundColor: "#D3D3D3",
    cursor: "default",
  },
  letterText: {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#FFF",
  },
  newWordButton: {
    backgroundColor: "#FFA500",
    padding: "12px 20px",
    borderRadius: "25px",
    position: "absolute",
    bottom: "20px",
    width: "90%",
    border: "none",
    color: "#FFF",
    fontWeight: "bold",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default SpellingGameScreen;
