import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ResultModal from "../components/ResultModal";

// Import your sound files
import buttonSound from "../assets/audio/sound-effect/comedy_pop_finger_in_mouth_001.mp3";
import scoreSound from "../assets/audio/sound-effect/ta-da_yrvBrlS.mp3";

const originalQuestions  = [
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

const PreTestScreen = () => {
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [progress, setProgress] = useState(0);
  const [modalData, setModalData] = useState({
    show: false,
    score: 0,
    feedback: "",
  });
  const navigate = useNavigate();

  // สุ่มคำถามเมื่อเริ่มต้น
  useEffect(() => {
    const shuffleQuestions = () => {
      const shuffled = [...originalQuestions];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };
    
    setShuffledQuestions(shuffleQuestions());
  }, []);

  // ฟังก์ชันเล่นเสียง
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

    const newProgress = ((currentQuestionIndex + 1) / shuffledQuestions.length) * 100;
    setProgress(newProgress);

    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      checkResults(newAnswers);
    }
  };

  const checkResults = async (finalAnswers) => {
    const score = shuffledQuestions.filter(
      (item, index) => finalAnswers[index] === item.correct
    ).length;
    const percentage = (score / shuffledQuestions.length) * 100;
    
    sessionStorage.setItem("preTestScore", score);

    let feedbackMessage = "ลองศึกษาทบทวนเนื้อหาเพิ่มเติมอีกสักนิดนะ 📚";
    if (percentage >= 80) {
      feedbackMessage = "เยี่ยมมาก! 🎉";
    } else if (percentage >= 60) {
      feedbackMessage = "ดีมาก! แต่ยังต้องพัฒนาอีกนิดนะ ✨";
    }

    await playSound(scoreSound);

    setModalData({
      show: true,
      score,
      feedback: feedbackMessage,
    });
  };

  const handleCloseModal = () => {
    setModalData({ ...modalData, show: false });
    navigate("/instruction");
  };

  // แสดงหน้าจอโหลดระหว่างรอสลับคำถาม
  if (shuffledQuestions.length === 0) {
    return <div style={styles.container}>กำลังเตรียมคำถาม...</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.contentContainer}>
        <div style={styles.progressBar}>
          <div style={{ ...styles.progressFill, width: `${progress}%` }}></div>
        </div>
        <p style={styles.question}>
          {shuffledQuestions[currentQuestionIndex].question}
        </p>
        <div style={styles.buttonContainer}>
          <button style={styles.answerButton} onClick={() => handleAnswer(true)}>
            TRUE
          </button>
          <button style={styles.answerButton} onClick={() => handleAnswer(false)}>
            FALSE
          </button>
        </div>
        <ResultModal
          show={modalData.show}
          score={modalData.score}
          totalQuestions={shuffledQuestions.length}
          feedback={modalData.feedback}
          onClose={handleCloseModal}
        />
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex", // Add flexbox
    justifyContent: "center", // Center horizontally
    alignItems: "center", // Center vertically
    minHeight: "100vh",
    padding: "20px",
    // background: "linear-gradient(to bottom right, #FFDEE9, #B5FFFC)",
  },
  contentContainer: {
    maxWidth: "600px",
    width: "100%", // Make content container take full width
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
    transition: "background-color 0.3s ease", // Add transition for hover effect
  },
};

export default PreTestScreen;
