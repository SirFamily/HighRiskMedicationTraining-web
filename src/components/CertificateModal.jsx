// components/CertificateModal.jsx
import React from "react";
import { motion } from "framer-motion";

const CertificateModal = ({ show, message, onClose, onCloseX }) => {
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
        {/* Close Button (X) */}
        <motion.button
          style={styles.closeButton}
          onClick={onCloseX}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          X
        </motion.button>

        <h3 style={styles.modalTitle}>🎉 ยินดีด้วย!</h3>
        <p style={styles.modalText}>{message}</p>
        <motion.button
          style={styles.modalButton}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
        >
          ยืนยัน
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
    position: "relative", // Add relative positioning for close button
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
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "none",
    border: "none",
    fontSize: "20px",
    cursor: "pointer",
    color: "#666",
    padding: "5px",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: "all 0.2s ease",
  },
};

export default CertificateModal;
