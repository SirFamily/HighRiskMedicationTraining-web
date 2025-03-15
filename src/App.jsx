import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomeScreen from './pages/HomeScreen';
// import PreTestScreen from './pages/PreTestScreen';
// import LearningContentScreen from './pages/LearningContentScreen';
// import MatchingGameScreen from './pages/MatchingGameScreen';
// import SpellingGameScreen from './pages/SpellingGameScreen';
// import SimulationGameScreen from './pages/SimulationGameScreen';
// import PostTestScreen from './pages/PostTestScreen';
// import InputNameScreen from './pages/InputNameScreen';
// import CertificateScreen from './pages/CertificateScreen';
// import FeedbackScreen from './pages/FeedbackScreen';
// import InstructionScreen from './pages/InstructionScreen';
// import VideoScreen from './pages/VideoScreen';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      {/* <Route path="/pre-test" element={<PreTestScreen />} />
      <Route path="/instruction" element={<InstructionScreen />} />
      <Route path="/learning-content" element={<LearningContentScreen />} />
      <Route path="/video" element={<VideoScreen />} />
      <Route path="/matching-game" element={<MatchingGameScreen />} />
      <Route path="/spelling-game" element={<SpellingGameScreen />} />
      <Route path="/simulation-game" element={<SimulationGameScreen />} />
      <Route path="/post-test" element={<PostTestScreen />} />
      <Route path="/input-name" element={<InputNameScreen />} />
      <Route path="/feedback" element={<FeedbackScreen />} />
      <Route path="/certificate" element={<CertificateScreen />} /> */}
    </Routes>
  );
};

export default App;
