import React, { useState, useEffect } from "react";
import styles from "./PreTestScreen.module.css"; // Import CSS Module
import { useNavigate } from "react-router-dom";
import ResultPopup from '../components/ResultPopup'; // Import the popup component
import buttonClickSound from '../assets/audio/sound-effect/comedy_pop_finger_in_mouth_001.mp3'; // Import the sound file
import popupSound from '../assets/audio/sound-effect/ta-da_yrvBrlS.mp3'; // Import the new sound for the popup

const questions = [
  {
    id: 1,
    question: "Adrenaline ใช้ในการฟื้นคืนชีพหัวใจหยุดเต้น?",
    correct: true,
  },
  { id: 2, question: "Dopamine ใช้บรรเทาอาการปวด?", correct: false },
  { id: 3, question: "Fentanyl เป็นยาสลบ?", correct: false },
//   {
//     id: 4,
//     question: "Magnesium sulfate ใช้ป้องกันอาการชักจากครรภ์เป็นพิษ?",
//     correct: true,
//   },
//   {
//     id: 5,
//     question: "Morphine เป็นยาที่ช่วยเพิ่มความดันโลหิต?",
//     correct: false,
//   },
//   { id: 6, question: "Insulin ใช้รักษาภาวะน้ำตาลในเลือดต่ำ?", correct: false },
//   {
//     id: 7,
//     question: "Heparin เป็นยาป้องกันการแข็งตัวของเลือด?",
//     correct: true,
//   },
//   { id: 8, question: "Warfarin ออกฤทธิ์ทันทีหลังให้ยา?", correct: false },
//   { id: 9, question: "Digoxin ใช้รักษาภาวะหัวใจเต้นช้า?", correct: false },
//   {
//     id: 10,
//     question: "Potassium chloride ใช้รักษาภาวะโพแทสเซียมในเลือดต่ำ?",
//     correct: true,
//   },
//   { id: 11, question: "Norepinephrine ใช้เพิ่มความดันโลหิต?", correct: true },
//   {
//     id: 12,
//     question: "Calcium gluconate ใช้แก้พิษจากภาวะแมกนีเซียมเกิน?",
//     correct: true,
//   },
//   { id: 13, question: "Midazolam เป็นยาคลายกังวล", correct: true },
//   { id: 14, question: "Amiodarone ใช้รักษาหัวใจเต้นผิดจังหวะ?", correct: true },
//   {
//     id: 15,
//     question: "Protamine sulfate เป็นยาแก้พิษ Warfarin?",
//     correct: false,
//   },
];

const PreTestScreen = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    
    const navigate = useNavigate();

    // Load the sound effects
    const [buttonAudio] = useState(new Audio(buttonClickSound));
    const [popupAudio] = useState(new Audio(popupSound));

    // Play sound function for button
    const playButtonSound = () => {
      buttonAudio.currentTime = 0;
      buttonAudio.play().catch(error => console.error("Error playing button sound:", error));
    };

    // Play sound function for popup
    const playPopupSound = () => {
      popupAudio.currentTime = 0;
      popupAudio.play().catch(error => console.error("Error playing popup sound:", error));
    };
  
    const handleAnswer = (answer) => {
      playButtonSound(); // Play button sound on button click
      if (answer === questions[currentQuestionIndex].correct) {
        setScore(score + 1);
      }
  
      if (currentQuestionIndex === questions.length - 1) {
        playPopupSound(); // Play popup sound when the test is finished
        setShowPopup(true);
        setFinished(true);
      } else {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
    };
  
    const handleClosePopup = () => {
      playButtonSound(); // Play button sound on popup close
      setShowPopup(false);
      navigate("/instruction");
    };

    useEffect(() => {
      return () => {
        buttonAudio.pause();
        buttonAudio.currentTime = 0;
        popupAudio.pause();
        popupAudio.currentTime = 0;
      };
    }, [buttonAudio, popupAudio]);
  
    return (
<div className={styles.preTestContainer}>

        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          />
        </div>

        {!finished && (
          <div className={styles.questionBox}>
            <p className={styles.question}>
              {questions[currentQuestionIndex].question}
            </p>
            <div className={styles.buttonGroup}>
              <button className={styles.answerButton} onClick={() => handleAnswer(true)}>TRUE</button>
              <button className={styles.answerButton} onClick={() => handleAnswer(false)}>FALSE</button>
            </div>
          </div>
        )}

        {showPopup && (
          <ResultPopup score={score} totalQuestions={questions.length} onClose={handleClosePopup} />
        )}
      </div>
    );
};


  
export default PreTestScreen;
