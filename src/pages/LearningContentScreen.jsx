import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const styles = {
  container: {
    maxWidth: '800px', // Added max-width for better responsiveness
    width: '100%',
    margin: '20px auto', // Center the container
    padding: '30px',
    borderRadius: '15px',
    // boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)', // Added box shadow
    fontFamily: "'Prompt', sans-serif", // Added font family
    textAlign: 'center', // Center text within the container
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '15px',
  },
  description: {
    fontSize: '1.2rem',
    color: '#555',
    marginBottom: '25px',
    lineHeight: '1.6',
  },
  videoContainer: { // Renamed to be more generic
    width: '100%',
    marginBottom: '30px',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  iframe: {
    width: '100%',
    height: '315px', // Fixed height for consistency
    border: 'none',
    borderRadius: '10px',
  },
  button: {
    padding: '12px 20px',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#fff',
    background: '#3498DB',
    border: 'none',
    borderRadius: '25px',
    cursor: 'pointer',
    transition: '0.3s',
  },
  creditContainer: {
    marginTop: '16px',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    color: '#555',
  },
  link: {
    color: '#0066cc',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};

export default function LearningContentScreen() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📚 สื่อการเรียนรู้</h1>
      <p style={styles.description}>
      ยินดีต้อนรับสู่สื่อการเรียนรู้เกี่ยวกับการใช้ยาเสี่ยงสูงอย่างปลอดภัย  ที่นี่คุณจะได้เรียนรู้เกี่ยวกับวิธีการใช้ยาอย่างถูกต้อง  ป้องกันผลข้างเคียง  และดูแลสุขภาพของคุณให้ดีที่สุด
      </p>

      <div style={styles.videoContainer}>
        <iframe
          style={styles.iframe}
          src="https://www.canva.com/design/DAGhYwuHHzo/RlUxI_JSUc4cuwU_p2emTA/view?embed"
          title="Canva Presentation"
          allowFullScreen
          allow="autoplay; fullscreen"
        />
      </div>

      {/* <div style={styles.creditContainer}>
        <a
          href="https://www.canva.com/design/DAGhYwuHHzo/RlUxI_JSUc4cuwU_p2emTA/view?utm_content=DAGhYwuHHzo&utm_campaign=designshare&utm_medium=embeds&utm_source=link"
          target="_blank"
          rel="noopener noreferrer"
          style={styles.link}
        >
          นำเสนอนวัตกรรม
        </a>
        {' โดย ปาร์ค ฮันนี่บี.'}
      </div> */}

      <button style={styles.button} onClick={() => navigate('/matching-game')}>
        🎮 ไปที่เกมจับคู่
      </button>
    </div>
  );
}
