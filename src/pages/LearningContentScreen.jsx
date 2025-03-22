import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// Import the images you want to display
import image1 from '../assets/Slides/1.jpg';
import image2 from '../assets/Slides/2.jpg';
import image3 from '../assets/Slides/3.jpg';
import image4 from '../assets/Slides/4.jpg';
import image5 from '../assets/Slides/5.jpg';
import image6 from '../assets/Slides/6.jpg';
import image7 from '../assets/Slides/7.jpg';
import image8 from '../assets/Slides/8.jpg';
import image9 from '../assets/Slides/9.jpg';
import image10 from '../assets/Slides/10.jpg';
import image11 from '../assets/Slides/11.jpg';
import image12 from '../assets/Slides/12.jpg';
import image13 from '../assets/Slides/13.jpg';
import image14 from '../assets/Slides/14.jpg';
import image15 from '../assets/Slides/15.jpg';
import image16 from '../assets/Slides/16.jpg';
import image17 from '../assets/Slides/17.jpg';
import image18 from '../assets/Slides/18.jpg';

// Import sound effect
import buttonClickSound from '../assets/audio/sound-effect/comedy_pop_finger_in_mouth_001.mp3';

const styles = {
  // ... (rest of your styles)
  container: {
    maxWidth: '800px',
    width: '100%',
    margin: '20px auto',
    padding: '30px',
    borderRadius: '15px',
    fontFamily: "'Prompt', sans-serif",
    textAlign: 'center',
    // backgroundColor: 'white',
    // boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    position: 'relative',
    overflow: 'hidden',
  },
  gradientAccent: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '5px',
    // background: 'linear-gradient(to right, #3498DB, #9B59B6)',
    borderTopLeftRadius: '15px',
    borderTopRightRadius: '15px',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#333',
    marginTop: '25px',
    marginBottom: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: '2.2rem',
    marginRight: '10px',
  },
  description: {
    fontSize: '1.2rem',
    color: '#555',
    marginBottom: '25px',
    lineHeight: '1.6',
    padding: '0 10px',
  },
  imageContainerWrapper: {
    position: 'relative',
    marginBottom: '30px',
    cursor: 'pointer',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
    transition: 'transform 0.3s, box-shadow 0.3s',
  },
  imageContainer: {
    width: '100%',
    borderRadius: '12px',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: '12px',
    display: 'block',
  },
  imageCounter: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '0.9rem',
    fontWeight: 'bold',
    color: '#333',
  },
  imageHint: {
    position: 'absolute',
    bottom: '10px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: 'rgba(255, 255, 255, 0.88)',
    padding: '5px 15px',
    borderRadius: '20px',
    fontSize: '0.9rem',
    fontWeight: 'medium',
    color: '#444',
  },
  navigationContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '10px',
  },
  buttonPrev: {
    padding: '10px 20px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: '#fff',
    background: 'linear-gradient(to right, #3498DB, #2980B9)',
    border: 'none',
    borderRadius: '25px',
    cursor: 'pointer',
    transition: '0.3s',
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  buttonNext: {
    padding: '10px 20px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: '#fff',
    background: 'linear-gradient(to right, #2980B9, #3498DB)',
    border: 'none',
    borderRadius: '25px',
    cursor: 'pointer',
    transition: '0.3s',
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  buttonGame: {
    padding: '10px 20px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: '#fff',
    background: 'linear-gradient(to right, #9B59B6, #E74C3C)',
    border: 'none',
    borderRadius: '25px',
    cursor: 'pointer',
    transition: '0.3s',
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  buttonGameDisabled: {
    padding: '10px 20px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: '#ccc',
    background: '#ddd',
    border: 'none',
    borderRadius: '25px',
    cursor: 'not-allowed',
    transition: '0.3s',
    display: 'flex',
    alignItems: 'center',
    boxShadow: 'none',
  },
  buttonText: {
    marginLeft: '5px',
    marginRight: '5px',
  },
  // Fullscreen Modal Styles
  fullscreenOverlay: {
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    zIndex: '9999',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullscreenImage: {
    maxHeight: '90vh',
    maxWidth: '90vw',
    objectFit: 'contain',
  },
  closeButton: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: 'white',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    border: 'none',
    fontSize: '24px',
  },
  navButton: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: 'white',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    border: 'none',
    fontSize: '24px',
  },
  prevButton: {
    left: '20px',
    top: '50%',
    transform: 'translateY(-50%)',
  },
  nextButton: {
    right: '20px',
    top: '50%',
    transform: 'translateY(-50%)',
  },
  fullscreenCounter: {
    position: 'absolute',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: 'white',
    padding: '5px 15px',
    borderRadius: '20px',
    fontSize: '1rem',
  },
};

export default function LearningContentScreen() {
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [canGoToGame, setCanGoToGame] = useState(false);
  const audioRef = useRef(null);

  const images = [
    image1, image2, image3, image4, image5, image6, image7, image8,
    image9, image10, image11, image12, image13, image14, image15, image16,
    image17, image18,
  ];
  const lastImageIndex = images.length - 1;

  useEffect(() => {
    if (currentImage === lastImageIndex) {
      setCanGoToGame(true);
    } else {
      setCanGoToGame(false);
    }
  }, [currentImage, lastImageIndex]);

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Reset audio to start
      audioRef.current.play().catch(error => {
        console.error("Error playing sound:", error);
      });
    }
  };

  const nextImage = (e) => {
    if (e) e.stopPropagation();
    playSound();
    if (currentImage < lastImageIndex) {
      setCurrentImage((prev) => prev + 1);
    }
  };

  const prevImage = (e) => {
    if (e) e.stopPropagation();
    playSound();
    if (currentImage > 0) {
      setCurrentImage((prev) => prev - 1);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleKeyDown = (e) => {
    if (isFullscreen) {
      if (e.key === 'Escape') {
        setIsFullscreen(false);
      } else if (e.key === 'ArrowRight') {
        nextImage();
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      }
    }
  };

  const isFirstImage = currentImage === 0;
  const isLastImage = currentImage === lastImageIndex;

  return (
    <div
      style={styles.container}
      onKeyDown={handleKeyDown}
      tabIndex="0"
    >
      <audio ref={audioRef} src={buttonClickSound} />
      <div style={styles.gradientAccent}></div>
      <h1 style={styles.title}>
        <span style={styles.emoji}>📚</span> สื่อการเรียนรู้
      </h1>
      <p style={styles.description}>
        ยินดีต้อนรับสู่สื่อการเรียนรู้เกี่ยวกับการใช้ยาเสี่ยงสูงอย่างปลอดภัย ที่นี่คุณจะได้เรียนรู้เกี่ยวกับวิธีการใช้ยาอย่างถูกต้อง ป้องกันผลข้างเคียง และดูแลสุขภาพของคุณให้ดีที่สุด
      </p>

      <div
        style={{
          ...styles.imageContainerWrapper,
          transform: isFullscreen ? 'none' : 'scale(1)',
          ':hover': {
            transform: 'scale(1.01)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
          }
        }}
        onClick={toggleFullscreen}
      >
        <div style={styles.imageCounter}>
          {currentImage + 1} / {images.length}
        </div>
        <div style={styles.imageContainer}>
          <img
            style={styles.image}
            src={images[currentImage]}
            alt={`Learning Content Slide ${currentImage + 1}`}
          />
        </div>
        <div style={styles.imageHint}>
          คลิกเพื่อดูแบบเต็มจอ
        </div>
      </div>

      <div style={styles.navigationContainer}>
        <button
          style={styles.buttonPrev}
          onClick={prevImage}
          disabled={isFirstImage}
        >
          <span>⬅️</span>
        </button>

        <button
          style={canGoToGame ? styles.buttonGame : styles.buttonGameDisabled}
          onClick={() => {
            if (canGoToGame) {
              playSound();
              setTimeout(() => {
                navigate('/matching-game', { replace: true });
              }, 300);
            }
          }}
          disabled={!canGoToGame}
        >
          <span>🎮</span>
        </button>

        <button
          style={styles.buttonNext}
          onClick={nextImage}
          disabled={isLastImage}
        >
          <span>➡️</span>
        </button>
      </div>

      {/* Fullscreen Image Modal */}
      {isFullscreen && (
        <div style={styles.fullscreenOverlay} onClick={toggleFullscreen}>
          <button
            style={styles.closeButton}
            onClick={toggleFullscreen}
          >
            ✕
          </button>

          <button
            style={{ ...styles.navButton, ...styles.prevButton }}
            onClick={prevImage}
            disabled={isFirstImage}
          >
            ‹
          </button>

          <img
            style={styles.fullscreenImage}
            src={images[currentImage]}
            alt={`Learning Content Slide ${currentImage + 1} Fullscreen`}
            onClick={(e) => e.stopPropagation()}
          />

          <button
            style={{ ...styles.navButton, ...styles.nextButton }}
            onClick={nextImage}
            disabled={isLastImage}
          >
            ›
          </button>

          <div style={styles.fullscreenCounter}>
            {currentImage + 1} / {images.length}
          </div>
        </div>
      )}
    </div>
  );
}
