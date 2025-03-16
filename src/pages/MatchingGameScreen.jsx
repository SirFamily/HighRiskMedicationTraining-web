import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // ใช้ React Router
import styles from './MatchingGameScreen.module.css';

// Import images
import adrenalineImg from '../assets/img-drug/adrenaline.jpg';
import dopamineImg from '../assets/img-drug/dopamine.jpg';
import morphineImg from '../assets/img-drug/morphine.jpg';
import fentanylImg from '../assets/img-drug/fentanyl.jpg';

// Import sounds
import correctSound from '../assets/audio/sound-effect/correct.mp3';
import incorrectSound from '../assets/audio/sound-effect/erro.mp3';
import selectSound from '../assets/audio/sound-effect/comedy_pop_finger_in_mouth_001.mp3';

const drugPairs = [
  { drug: "Adrenaline", use: "ใช้ฟื้นคืนชีพหัวใจหยุดเต้น", image: adrenalineImg },
  { drug: "Dopamine", use: "ช่วยเพิ่มความดันโลหิต", image: dopamineImg },
  { drug: "Morphine", use: "บรรเทาอาการปวดรุนแรง", image: morphineImg },
  { drug: "Fentanyl", use: "ใช้บรรเทาอาการปวดในมะเร็ง", image: fentanylImg }
];

const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

const MatchingGameScreen = () => {
  const [drugs, setDrugs] = useState([]);
  const [uses, setUses] = useState([]);
  const [selectedDrug, setSelectedDrug] = useState(null);
  const [matches, setMatches] = useState({});
  const navigate = useNavigate(); // ใช้ navigation

  // Sound instances
  const correctAudio = new Audio(correctSound);
  const incorrectAudio = new Audio(incorrectSound);
  const selectAudio = new Audio(selectSound);

  useEffect(() => {
    setDrugs(shuffleArray([...drugPairs]));
    setUses(shuffleArray([...drugPairs]));
  }, []);

  const playSound = (audio) => {
    audio.currentTime = 0; // Reset audio to start
    audio.play();
  };

  const handleSelect = (item, type) => {
    playSound(selectAudio); // Play select sound on every click

    if (type === "drug") {
      setSelectedDrug(item);
    } else if (selectedDrug) {
      const correctPair = drugPairs.find(pair => pair.drug === selectedDrug && pair.use === item);
      if (correctPair) {
        playSound(correctAudio); // Play correct sound
        setMatches({ ...matches, [selectedDrug]: item });
        setSelectedDrug(null);
      } else {
        playSound(incorrectAudio); // Play incorrect sound
      }
    }
  };

  const allMatched = Object.keys(matches).length === drugPairs.length;

  return (
    <div className={styles.matchingGameContainer}>
      <h1 className={styles.title}>🔬 เกมจับคู่ยา</h1>
      <p className={styles.subtitle}>จับคู่ "ชื่อยา" กับ "ข้อบ่งใช้" ให้ถูกต้อง</p>

      <div className={styles.gameBoard}>
        {/* คอลัมน์ซ้าย: รายชื่อยา */}
        <div className={styles.column}>
          {drugs.map(({ drug, image }) => (
            <div
              key={drug}
              className={`${styles.card} ${selectedDrug === drug ? styles.selected : ''} ${matches[drug] ? styles.matched : ''}`}
              onClick={() => handleSelect(drug, "drug")}
            >
              <img src={image} alt={drug} className={styles.drugImage} />
              <p>{drug}</p>
            </div>
          ))}
        </div>

        {/* คอลัมน์ขวา: ข้อบ่งใช้ */}
        <div className={styles.column}>
          {uses.map(({ use }) => (
            <div
              key={use}
              className={`${styles.card} ${Object.values(matches).includes(use) ? styles.matched : ''}`}
              onClick={() => handleSelect(use, "use")}
            >
              <p>{use}</p>
            </div>
          ))}
        </div>
      </div>

      {/* แสดงปุ่ม "ไปหน้าถัดไป" เมื่อจับคู่ครบ */}
      {allMatched && (
        <button className={styles.nextButton} onClick={() => navigate('/spelling-game')}>
          ➡️ ไปยังเกมสะกดคำ
        </button>
      )}
    </div>
  );
};

export default MatchingGameScreen;
