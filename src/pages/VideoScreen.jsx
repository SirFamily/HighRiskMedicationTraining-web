import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import buttonClickSound from '../assets/audio/sound-effect/comedy_pop_finger_in_mouth_001.mp3'; // Import the sound file

const VideoScreen = () => {
  const navigate = useNavigate();
  const audioRef = useRef(null);

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Reset audio to start
      audioRef.current.play().catch(error => {
        console.error("Error playing sound:", error);
      });
    }
  };

  const handleButtonClick = () => {
    playSound();
    setTimeout(() => {
      navigate('/matching-game');
    }, 300); // Delay navigation slightly to allow sound to play
  };

  return (
    <div style={styles.container}>
      <audio ref={audioRef} src={buttonClickSound} /> {/* Add audio element */}
      <div style={styles.contentContainer}>
        <h1 style={styles.title}>📚 สื่อการเรียนรู้</h1>
        <p style={styles.description}>
          ยินดีต้อนรับสู่หน้าสื่อการเรียนรู้! ที่นี่คุณสามารถรับชมวิดีโอเพื่อเสริมสร้างความเข้าใจของคุณ
        </p>

        <div style={styles.videoContainer}>
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/YA8dM3Pga7U?si=Cs9WC9E0xElvOEgf"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            style={styles.videoIframe}
          ></iframe>
        </div>

        <button style={styles.button} onClick={handleButtonClick}>
          🎮 ไปที่เกมจับคู่
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: "'Prompt', sans-serif",
    // background: 'linear-gradient(to right, #ff9a9e, #fad0c4)',
    padding: '20px',
  },
  contentContainer: {
    maxWidth: '800px',
    width: '100%',
    // backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '15px',
    // boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
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
  videoContainer: {
    width: '100%',
    marginBottom: '30px',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  videoIframe: {
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
    // boxShadow: '0px 4px 10px rgba(255, 94, 98, 0.5)',
  },
};

export default VideoScreen;
