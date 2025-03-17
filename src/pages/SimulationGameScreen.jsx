import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Import images
import scenario1Image from "../assets/simulation/S__6643720_0.jpg";
import scenario2Image from "../assets/simulation/S__6643731_0.jpg";
import scenario3Image from "../assets/simulation/S__6643732_0.jpg";
import scenario4Image from "../assets/simulation/S__6643730_0.jpg";
import scenario5Image from "../assets/simulation/S__6643728_0.jpg";
import scenario6Image from "../assets/simulation/S__6643729_0.jpg";
import scenario7Image from "../assets/simulation/S__6643726_0.jpg";
import scenario8Image from "../assets/simulation/S__6643727_0.jpg";
import scenario10Image from "../assets/simulation/S__6643733_0.jpg";
import scenario11Image from "../assets/simulation/S__6643734_0.jpg";

// Import sound files
import buttonSound from "../assets/audio/sound-effect/comedy_pop_finger_in_mouth_001.mp3";
import tadaSound from "../assets/audio/sound-effect/ta-da_yrvBrlS.mp3";

const scenarios = [
  {
    id: 1,
    image: scenario1Image,
    question: "จากภาพ การพยาบาลที่สำคัญคือข้อใด?",
    options: [
      { text: "CPR รายงานแพทย์ และให้ยา Adrenaline ทุก 3-5 นาที", correct: true },
      { text: "ติด EKG ดูคลื่นหัวใจอีกรอบและรายงานแพทย์", correct: false },
      { text: "วัด V/S และรายงานแพทย์", correct: false },
      { text: "ให้ยา Adrenaline ค่อยรายงานแพทย์ทีหลังเพราะผู้ป่วยหัวใจเต้นช้าลง", correct: false },
    ],
  },
  {
    id: 2,
    image: scenario2Image,
    question: "การพยาบาลที่เหมาะสมสำหรับผู้ป่วยภาวะ Hypokalemia คือข้อใด?",
    options: [
      { text: "ให้ดื่มน้ำมาก ๆ เพื่อเพิ่มระดับโพแทสเซียม", correct: false },
      { text: "ให้ IV KCl ทางหลอดเลือดดำแบบฉีดเร็วเพื่อลดภาวะอ่อนแรง", correct: false },
      { text: "ให้ยาโพแทสเซียมเสริมตามแผนการรักษา และติดตามระดับโพแทสเซียมอย่างใกล้ชิด", correct: true },
      { text: "จำกัดอาหารที่มีโพแทสเซียม เช่น กล้วย, ส้ม, มันฝรั่ง", correct: false },
    ],
  },
//   {
//     id: 3,
//     image: scenario3Image,
//     question: "ผู้ป่วยได้รับ Pethidine 3 mg IV ผลข้างเคียงที่สำคัญจากการได้รับยาคือข้อใด?",
//     options: [
//       { text: "ท้องเสีย", correct: false },
//       { text: "หายใจลำบาก, กดการหายใจ", correct: true },
//       { text: "ภาวะน้ำตาลในเลือดต่ำ", correct: false },
//       { text: "หัวใจเต้นเร็ว, ความดันโลหิตสูง", correct: false },
//     ],
//   },
//   {
//     id: 4,
//     image: scenario4Image,
//     question: "ข้อใดเป็นข้อบ่งใช้หลักของยา Magnesium Sulfate ในทางสูติศาสตร์?",
//     options: [
//       { text: "ลดอาการคลื่นไส้อาเจียนในหญิงตั้งครรภ์", correct: false },
//       { text: "ป้องกันและรักษาภาวะชักจากครรภ์เป็นพิษ (Pre-eclampsia)", correct: true },
//       { text: "กระตุ้นการหดรัดตัวของมดลูก", correct: false },
//       { text: "รักษาภาวะความดันโลหิตต่ำ", correct: false },
//     ],
//   },
//   {
//     id: 5,
//     image: scenario5Image,
//     question: "จากภาพ EKG : AF with RVR rate 200/min จากภาพ การพยาบาลที่สำคัญคือข้อใด?",
//     options: [
//       { text: "ติด EKG ดูคลื่นหัวใจอีกรอบและรายงานแพทย์", correct: false },
//       { text: "รายงานแพทย์ให้ยา Adrenaline และติดตามอาการทุกๆ 15 นาที", correct: false },
//       { text: "รายงานแพทย์และให้สารน้ำโดยเร็ว หลังให้สารน้ำวัด V/S ทุกๆ 30 นาที", correct: false },
//       { text: "รายงานแพทย์ให้ยา Amiodarone และติดตาม V/S ทุกๆ 15 นาทีหลังให้ยา", correct: true },
//     ],
//   },
//   {
//     id: 6,
//     image: scenario6Image,
//     question: "จากภาพ EKG : AF with RVR rate 200/min การพยาบาลที่สำคัญคือข้อใด?",
//     options: [
//       { text: "ให้ผู้ป่วยนอนพักจัดท่านอนยกขาสูงและประเมิน V/S และประเมินซ้ำอีก 1 ชั่วโมง", correct: false },
//       { text: "ให้ผู้ป่วยนั่งพัก นาที จัดท่านอนศีรษะสูงและวัด V/S ทุก 4 ชั่วโมง", correct: false },
//       { text: "รายงานแพทย์ให้ยา Dopamine และติดตาม V/S ทุกๆ 15 นาทีหลังให้ยา", correct: false },
//       { text: "รายงานแพทย์ให้ยา Nicardipine และติดตาม V/S ทุกๆ 15 นาทีหลังให้ยา", correct: true },
//     ],
//   },
//   {
//     id: 7,
//     image: scenario7Image,
//     question: "จากภาพ การพยาบาลที่สำคัญคือข้อใด?",
//     options: [
//       { text: "ติดตามอาการหัวใจเต้นช้าลง", correct: false },
//       { text: "ติดตามระดับน้ำตาลในเลือดต่ำ", correct: false },
//       { text: "ติดตามอาการและเฝ้าระวังอาการหายใจช้า", correct: false },
//       { text: "ติดตาม V/S ทุกๆ 15 นาทีหลังได้รับยาและสังเกตอาการ Extravasation", correct: true },
//     ],
//   },
//   {
//     id: 8,
//     image: scenario8Image,
//     question: "จากภาพ การพยาบาลที่สำคัญคือข้อใด?",
//     options: [
//       { text: "แนะนำให้ผู้ป่วยงดอาหารอย่างน้อย 2 ชั่วโมงหลังได้รับยา", correct: false },
//       { text: "เฝ้าระวังอาการน้ำตาลในเลือดต่ำ (Hypoglycemia)", correct: true },
//       { text: "ให้ผู้ป่วยออกกำลังกายทันทีหลังได้รับยาเพื่อลดระดับน้ำตาลในเลือด", correct: false },
//       { text: "งดตรวจระดับน้ำตาลในเลือดหลังได้รับยา", correct: false },
//     ],
//   },
//   {
//     id: 9,
//     image: scenario3Image, // same image as scenario 3
//     question: "ผู้ป่วยได้รับ Pethidine 3 mg IV ผลข้างเคียงที่สำคัญคือข้อใด?",
//     options: [
//       { text: "ท้องเสีย", correct: false },
//       { text: "หายใจลำบาก, กดการหายใจ", correct: true },
//       { text: "ภาวะน้ำตาลในเลือดต่ำ", correct: false },
//       { text: "หัวใจเต้นเร็ว, ความดันโลหิตสูง", correct: false },
//     ],
//   },
//   {
//     id: 10,
//     image: scenario10Image,
//     question: "จากภาพ การพยาบาลควรเฝ้าระวังอาการข้างเคียงที่สำคัญในข้อใด?",
//     options: [
//       { text: "อาการท้องผูกและคลื่นไส้", correct: false },
//       { text: "อาการหายใจช้าและความดันโลหิตต่ำ", correct: true },
//       { text: "ความสับสนหรือมึนงง", correct: false },
//       { text: "อาการคันและง่วงนอน", correct: false },
//     ],
//   },
//   {
//     id: 11,
//     image: scenario11Image,
//     question: "ข้อใดเป็นการพยาบาลที่สำคัญในผู้ป่วยได้รับ 7.5% Sodium Bicarbonate?",
//     options: [
//       { text: "เฝ้าระวังภาวะเลือดเป็นกรด (Metabolic Acidosis) เพื่อป้องกันการหายใจลำบาก", correct: false },
//       { text: "ติดตามระดับ pH และอิเล็กโทรไลต์ในเลือดเพื่อตรวจสอบภาวะเลือดเป็นด่าง (Metabolic Alkalosis)", correct: true },
//       { text: "ลดการให้สารน้ำทางหลอดเลือดดำเพื่อลดการขับโซเดียมออกจากร่างกาย", correct: false },
//       { text: "กระตุ้นให้ผู้ป่วยดื่มน้ำมาก ๆ เพื่อลดการดูดซึมของยาในกระเพาะอาหาร", correct: false },
//     ],
//   },
];

const SimulationGameScreen = () => {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const navigate = useNavigate();

  // Function to play a sound effect using the HTML Audio API
  const playSound = async (soundFile) => {
    try {
      const audio = new Audio(soundFile);
      await audio.play();
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  };

  const handleAnswer = async (option, scenarioId) => {
    // Play button sound when an answer is selected
    await playSound(buttonSound);

    const newAnswers = { ...selectedAnswers, [scenarioId]: option };
    setSelectedAnswers(newAnswers);

    if (Object.keys(newAnswers).length === scenarios.length) {
      setTimeout(() => checkAnswers(newAnswers), 500);
    } else {
      setTimeout(() => setCurrentScenarioIndex(currentScenarioIndex + 1), 500);
    }
  };

  const checkAnswers = async (finalAnswers) => {
    let correctCount = 0;
    scenarios.forEach((scenario) => {
      const selectedOption = finalAnswers[scenario.id];
      if (selectedOption && selectedOption.correct) {
        correctCount++;
      }
    });
    setCorrectAnswers(correctCount);
    sessionStorage.setItem("simulationGameScore", correctCount); // Add this line
    const percentage = (correctCount / scenarios.length) * 100;
    let feedbackMessage = "ลองศึกษาทบทวนเนื้อหาเพิ่มเติมอีกสักนิดนะ 📚";
    if (percentage >= 80) {
      feedbackMessage = "เยี่ยมมาก! 🎉 คุณมีความรู้ดีมาก";
    } else if (percentage >= 60) {
      feedbackMessage = "ดีมาก! แต่ยังต้องพัฒนาอีกนิดนะ ✨";
    }

    await playSound(tadaSound);

    window.alert(
      `📋 สรุปผลการทดสอบ\nคุณตอบถูก ${correctCount}/${scenarios.length} ข้อ\n${feedbackMessage}`
    );
    navigate("/post-test");
  };

  return (
    <div style={styles.mainContainer}>
      <div style={styles.container}>
        <h1 style={styles.title}>🩺 สถานการณ์จำลอง</h1>
        <p style={styles.subtitle}>{scenarios[currentScenarioIndex].question}</p>
        <img
          src={scenarios[currentScenarioIndex].image}
          alt="scenario"
          style={styles.image}
        />
        <div style={styles.optionsContainer}>
          {scenarios[currentScenarioIndex].options.map((option, index) => (
            <button
              key={index}
              style={{
                ...styles.optionButton,
                ...(selectedAnswers[scenarios[currentScenarioIndex].id]?.text === option.text
                  ? styles.selectedOption
                  : {}),
              }}
              onClick={() =>
                handleAnswer(option, scenarios[currentScenarioIndex].id)
              }
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  mainContainer: {
    minHeight: "100vh",
    paddingTop: "50px",
    background: "linear-gradient(to bottom right, #B5FFFC, #FBF8EF)",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    paddingBottom: "60px",
  },
  title: {
    fontSize: "26px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "15px",
    textAlign: "center",
  },
  subtitle: {
    fontSize: "18px",
    color: "#555",
    textAlign: "center",
    margin: "20px 10px",
  },
  image: {
    width: "85%",
    height: "auto",
    borderRadius: "15px",
    marginBottom: "20px",
    boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
  },
  optionsContainer: {
    width: "100%",
  },
  optionButton: {
    backgroundColor: "#80CBC4",
    padding: "14px 20px",
    borderRadius: "15px",
    marginBottom: "10px",
    border: "none",
    cursor: "pointer",
    fontSize: "15px",
    color: "#FFF",
    fontWeight: "500",
    boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
  },
  selectedOption: {
    backgroundColor: "#4DB6AC",
  },
};

export default SimulationGameScreen;
