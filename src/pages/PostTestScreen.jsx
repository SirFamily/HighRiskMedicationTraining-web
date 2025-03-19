import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useName } from "../contexts/NameContext";

// Import sound files
import buttonSound from "../assets/audio/sound-effect/comedy_pop_finger_in_mouth_001.mp3";
import tadaSound from "../assets/audio/sound-effect/ta-da_yrvBrlS.mp3";
import failedSound from "../assets/audio/sound-effect/gssspotted-haayaicchluek-khrabhaayaicchluek.mp3";

const questions = [
  { id: 1, question: "7.5% Sodium Bicarbonate ใช้ในการรักษาภาวะกรดในเลือด (Metabolic Acidosis) ที่เกิดจากโรคไตล้มเหลวได้?", correct: true },  
  { id: 2, question: "Fentanyl เป็นยาในกลุ่ม opioid ที่ใช้บรรเทาปวดรุนแรงได้?", correct: true },  
  { id: 3, question: "Adrenaline ทำให้หลอดเลือดขยายตัว ช่วยเพิ่มการไหลเวียนของเลือด?", correct: false },  
  { id: 4, question: "Dopamine ใช้ในการรักษาภาวะหัวใจหยุดเต้นและความดันโลหิตต่ำ?", correct: false },  
  { id: 5, question: "Nicardipine สามารถใช้ในการรักษาภาวะหัวใจล้มเหลว?", correct: false },  
  { id: 6, question: "Regular Insulin ช่วยเพิ่มระดับน้ำตาลโดยกระตุ้นให้ตับปล่อยกลูโคสออกมา?", correct: false },  
  { id: 7, question: "ยา Morphine (MO) อาจทำให้เกิดอาการคลื่นไส้และอาเจียน?", correct: true },  
  { id: 8, question: "อาการท้องเสียและปวดศีรษะเป็นอาการข้างเคียงของ Pethidine?", correct: false },  
  { id: 9, question: "การใช้ Potassium chloride (KCl) เหมาะในการรักษาผู้ป่วยที่มีภาวะโพแทสเซียมสูงในเลือด?", correct: false },  
  { id: 10, question: "Magnesium sulfate ใช้ในการรักษาผู้ป่วยที่มีภาวะการตั้งครรภ์ที่มีความเสี่ยงต่อการชักจากภาวะครรภ์เป็นพิษ?", correct: true },  
  { id: 11, question: "การใช้ Amiodarone ใช้รักษาภาวะหัวใจเต้นผิดจังหวะ?", correct: true },  
  { id: 12, question: "Norepinephrine (Levophed) ใช้รักษาผู้ป่วยที่มีภาวะความดันโลหิตต่ำ?", correct: true }  
];

const PostTestScreen = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [testCompleted, setTestCompleted] = useState(false);
  const [progress, setProgress] = useState(0); 
  const [sound, setSound] = useState(null);
  const { firstName, lastName } = useName();
  const fullName = `${firstName} ${lastName}`;
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      if (sound) {
        sound.pause();
      }
    };
  }, [sound]);

  useEffect(() => {
    if (testCompleted) {
      setTimeout(() => finishTest(), 600);
    }
  }, [testCompleted]);

  const playSound = async (soundFile) => {
    try {
      const audio = new Audio(soundFile);
      setSound(audio);
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
      setTestCompleted(true);
    }
  };

  const finishTest = async () => {
    if (!testCompleted) return;
    const score = questions.filter((item, index) => answers[index] === item.correct).length;
    const percentage = (score / questions.length) * 100;
    const passed = percentage >= 80;
    sessionStorage.setItem("postTestScore", score); 
    await playSound(passed ? tadaSound : failedSound);

    window.alert(
      `${passed ? "🎉 คุณผ่าน Post-Test!" : "❌ คุณยังไม่ผ่าน"}\nคุณได้คะแนน ${score}/${questions.length} (${percentage.toFixed(
        0
      )}%)`
    );

    if (!passed) {
      setTestCompleted(false);
      setCurrentQuestionIndex(0);
      setAnswers({});
      setProgress(0);
      navigate("/instruction");
    } else {
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
    display: "flex", 
    justifyContent: "center", 
    alignItems: "center", 
    minHeight: "100vh",
    padding: "20px",
    // background: "linear-gradient(to bottom right, #FFDEE9, #B5FFFC)",  //Optional background
  },
  contentContainer: {
    maxWidth: "600px",
    width: "100%", 
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
    transition: "background-color 0.3s ease", 
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
