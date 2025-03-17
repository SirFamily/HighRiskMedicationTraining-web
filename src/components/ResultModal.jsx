// components/ResultModal.jsx
import React from "react";
import { motion } from "framer-motion";

const ResultModal = ({ show, score, totalQuestions, feedback, onClose }) => {
  if (!show) return null;

  return (
    <motion.div 
      style={styles.modalOverlay} 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
    >
      <motion.div 
        style={styles.modalContent} 
        initial={{ scale: 0.8, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <h3 style={styles.modalTitle}>📋 สรุปผลการทดสอบ</h3>
        <p style={styles.modalText}>
          คะแนนของคุณ: {score}/{totalQuestions}
        </p>
        <p style={styles.modalText}>{feedback}</p>
        <motion.button 
          style={styles.modalButton} 
          whileHover={{ scale: 1.1 }} 
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
        >
          ยอมรับ
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

const styles = {
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
    textAlign: "center",
    maxWidth: "500px",
    width: "90%",
    transformOrigin: "center",
  },
  modalTitle: {
    fontSize: "24px",
    color: "#FF6F61",
    marginBottom: "15px",
  },
  modalText: {
    fontSize: "18px",
    margin: "10px 0",
    lineHeight: "1.6",
  },
  modalButton: {
    padding: "12px 30px",
    backgroundColor: "#FF6F61",
    color: "white",
    border: "none",
    borderRadius: "25px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    marginTop: "20px",
    transition: "all 0.2s ease",
  },
};

export default ResultModal;