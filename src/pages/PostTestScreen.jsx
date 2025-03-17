import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useName } from "../contexts/NameContext";

// Import sound files
import buttonSound from "../assets/audio/sound-effect/comedy_pop_finger_in_mouth_001.mp3";
import tadaSound from "../assets/audio/sound-effect/ta-da_yrvBrlS.mp3";
import failedSound from "../assets/audio/sound-effect/gssspotted-haayaicchluek-khrabhaayaicchluek.mp3";

const questions = [
  { id: 1, question: "7.5% Sodium Bicarbonate สามารถใช้รักษาภาวะกรดในเลือดจากไตล้มเหลว?", correct: true },
  { id: 2, question: "Fentanyl เป็นยาในกลุ่ม opioid ที่ใช้บรรเทาปวดรุนแรง?", correct: true },
//   { id: 3, question: "Adrenaline ทำให้หลอดเลือดขยายตัว ช่วยเพิ่มการไหลเวียนของเลือด?", correct: false },
//   { id: 4, question: "Dopamine ใช้รักษาภาวะหัวใจหยุดเต้นและความดันโลหิตต่ำ?", correct: false },
//   { id: 5, question: "Nicardipine สามารถใช้รักษาภาวะหัวใจล้มเหลว?", correct: false },
//   { id: 6, question: "Regular Insulin ช่วยเพิ่มระดับน้ำตาลโดยกระตุ้นให้ตับปล่อยกลูโคส?", correct: false },
//   { id: 7, question: "ยา Morphine อาจทำให้เกิดอาการคลื่นไส้และอาเจียน?", correct: true },
//   { id: 8, question: "อาการท้องเสียและปวดศีรษะเป็นอาการข้างเคียงของ Pethidine?", correct: false },
//   { id: 9, question: "การใช้ Potassium chloride เหมาะสำหรับผู้ป่วยที่มีภาวะโพแทสเซียมสูงในเลือด?", correct: false },
//   { id: 10, question: "Magnesium sulfate ใช้รักษาผู้ป่วยตั้งครรภ์ที่มีความเสี่ยงต่อการชัก?", correct: true },
//   { id: 11, question: "Amiodarone ใช้รักษาภาวะหัวใจเต้นผิดจังหวะ?", correct: true },
//   { id: 12, question: "Norepinephrine ใช้รักษาผู้ป่วยที่มีภาวะความดันโลหิตต่ำ?", correct: true },
];

const PostTestScreen = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [testCompleted, setTestCompleted] = useState(false);
  const [progress, setProgress] = useState(0); // percentage value (0 to 100)
  const [sound, setSound] = useState(null);
  const { firstName, lastName } = useName();
  const fullName = `${firstName} ${lastName}`;
  const navigate = useNavigate();

  // Clean up sound when the component unmounts
  useEffect(() => {
    return () => {
      if (sound) {
        sound.pause();
      }
    };
  }, [sound]);

  // When the test is marked as complete, delay before finishing the test.
  useEffect(() => {
    if (testCompleted) {
      setTimeout(() => finishTest(), 600);
    }
  }, [testCompleted]);

  // Helper function to play sound using the HTML Audio API
  const playSound = async (soundFile) => {
    try {
      const audio = new Audio(soundFile);
      setSound(audio);
      await audio.play();
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  };

  // Handler for answering a question
  const handleAnswer = async (answer) => {
    await playSound(buttonSound);

    const newAnswers = { ...answers, [currentQuestionIndex]: answer };
    setAnswers(newAnswers);

    // Update progress percentage
    const newProgress = ((currentQuestionIndex + 1) / questions.length) * 100;
    setProgress(newProgress);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setTestCompleted(true);
    }
  };

  // Finish test: calculate score, play appropriate sound, and navigate based on result.
  const finishTest = async () => {
    if (!testCompleted) return;
    const score = questions.filter((item, index) => answers[index] === item.correct).length;
    const percentage = (score / questions.length) * 100;
    const passed = percentage >= 80;
    sessionStorage.setItem("postTestScore", score); // Add this line to store the score
    await playSound(passed ? tadaSound : failedSound);

    window.alert(
      `${passed ? "🎉 คุณผ่าน Post-Test!" : "❌ คุณยังไม่ผ่าน"}\nคุณได้คะแนน ${score}/${questions.length} (${percentage.toFixed(
        0
      )}%)`
    );

    // Navigate based on pass/fail result.
    if (!passed) {
      // If not passed, reset the test and navigate to Instruction page.
      setTestCompleted(false);
      setCurrentQuestionIndex(0);
      setAnswers({});
      setProgress(0);
      navigate("/instruction");
    } else {
      // If passed, navigate to InputName page.
      navigate("/input-name");
    }
  };

  const allQuestionsAnswered = Object.keys(answers).length === questions.length;

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
        {allQuestionsAnswered && !testCompleted && (
          <button style={styles.checkButton} onClick={() => setTestCompleted(true)}>
            ตรวจคำตอบ
          </button>
        )}
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
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  progressBar: {
    width: "90%",
    height: "10px",
    backgroundColor: "#E0E0E0",
    borderRadius: "5px",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#FF6F61",
    transition: "width 0.5s ease-in-out",
  },
  question: {
    fontSize: "20px",
    margin: "20px 0",
    textAlign: "center",
    fontWeight: "bold",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-around",
    width: "100%",
    marginTop: "20px",
  },
  answerButton: {
    padding: "15px",
    backgroundColor: "#B5EAEA",
    borderRadius: "10px",
    width: "40%",
    border: "none",
    cursor: "pointer",
    textAlign: "center",
    fontSize: "16px",
    fontWeight: "bold",
  },
  checkButton: {
    backgroundColor: "#28A745",
    padding: "15px",
    borderRadius: "25px",
    margin: "20px 0",
    border: "none",
    cursor: "pointer",
    color: "#FFF",
    fontWeight: "bold",
    fontSize: "16px",
    textAlign: "center",
  },
};

export default PostTestScreen;
