import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useName } from "../contexts/NameContext";

// Import your sound files
import buttonSound from "../assets/audio/sound-effect/comedy_pop_finger_in_mouth_001.mp3";
import scoreSound from "../assets/audio/sound-effect/ta-da_yrvBrlS.mp3";

const questions = [
  { id: 1, question: "Adrenaline ใช้ในการฟื้นคืนชีพหัวใจหยุดเต้น?", correct: true },
  { id: 2, question: "Dopamine ใช้บรรเทาอาการปวด?", correct: false },
  // { id: 3, question: "Fentanyl เป็นยาสลบ?", correct: false },
  // { id: 4, question: "Magnesium sulfate ใช้ป้องกันอาการชักจากครรภ์เป็นพิษ?", correct: true },
  // { id: 5, question: "Morphine เป็นยาที่ช่วยเพิ่มความดันโลหิต?", correct: false },
  // { id: 6, question: "Insulin ใช้รักษาภาวะน้ำตาลในเลือดต่ำ?", correct: false },
  // { id: 7, question: "Heparin เป็นยาป้องกันการแข็งตัวของเลือด?", correct: true },
  // { id: 8, question: "Warfarin ออกฤทธิ์ทันทีหลังให้ยา?", correct: false },
  // { id: 9, question: "Digoxin ใช้รักษาภาวะหัวใจเต้นช้า?", correct: false },
  // { id: 10, question: "Potassium chloride ใช้รักษาภาวะโพแทสเซียมในเลือดต่ำ?", correct: true },
  // { id: 11, question: "Norepinephrine ใช้เพิ่มความดันโลหิต?", correct: true },
  // { id: 12, question: "Calcium gluconate ใช้แก้พิษจากภาวะแมกนีเซียมเกิน?", correct: true },
  // { id: 13, question: "Midazolam เป็นยาคลายกังวล", correct: true },
  // { id: 14, question: "Amiodarone ใช้รักษาหัวใจเต้นผิดจังหวะ?", correct: true },
  // { id: 15, question: "Protamine sulfate เป็นยาแก้พิษ Warfarin?", correct: false },
];

const PreTestScreen = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const { updateScore } = useName();

  // Function to play a sound using the HTML Audio API
  const playSound = async (soundFile) => {
    const audio = new Audio(soundFile);
    try {
      await audio.play();
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  };

  const handleAnswer = async (answer) => {
    await playSound(buttonSound);

    const newAnswers = { ...answers, [currentQuestionIndex]: answer };
    setAnswers(newAnswers);

    const newProgress = ((currentQuestionIndex + 1) / questions.length) * 100;
    setProgress(newProgress);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      checkResults(newAnswers);
    }
  };

  const checkResults = async (finalAnswers) => {
    const score = questions.filter((item, index) => finalAnswers[index] === item.correct).length;
    const percentage = (score / questions.length) * 100;
    updateScore("preTest", score);

    let feedbackMessage = "ลองศึกษาทบทวนเนื้อหาเพิ่มเติมอีกสักนิดนะ 📚";
    if (percentage >= 80) {
      feedbackMessage = "เยี่ยมมาก! 🎉 คุณมีความรู้ดีมาก";
    } else if (percentage >= 60) {
      feedbackMessage = "ดีมาก! แต่ยังต้องพัฒนาอีกนิดนะ ✨";
    }

    await playSound(scoreSound);

    alert(`📋 สรุปผลการทดสอบ\nคะแนนของคุณ: ${score}/${questions.length}\n${feedbackMessage}`);
    navigate("/instruction"); // Redirect to the Instruction page
  };

  return (
    <div style={styles.container}>
      <div style={styles.contentContainer}>
        <div style={styles.progressBar}>
          <div style={{ ...styles.progressFill, width: `${progress}%` }}></div>
        </div>
        <p style={styles.question}>{questions[currentQuestionIndex].question}</p>
        <div style={styles.buttonContainer}>
          <button style={styles.answerButton} onClick={() => handleAnswer(true)}>
            TRUE
          </button>
          <button style={styles.answerButton} onClick={() => handleAnswer(false)}>
            FALSE
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    padding: "20px",
    paddingTop: "50px",
    background: "linear-gradient(to bottom right, #FFDEE9, #B5FFFC)",
  },
  contentContainer: {
    maxWidth: "600px",
    margin: "0 auto",
    textAlign: "center",
  },
  progressBar: {
    width: "90%",
    height: "10px",
    backgroundColor: "#E0E0E0",
    borderRadius: "5px",
    overflow: "hidden",
    margin: "0 auto",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#FF6F61",
    transition: "width 0.5s ease-in-out",
  },
  question: {
    fontSize: "20px",
    margin: "20px 0",
    fontWeight: "bold",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "20px",
  },
  answerButton: {
    padding: "15px",
    backgroundColor: "#B5EAEA",
    border: "none",
    borderRadius: "10px",
    width: "40%",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
  },
};

export default PreTestScreen;
