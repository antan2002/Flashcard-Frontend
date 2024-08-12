import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FlashcardList from './components/FlashcardList';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<FlashcardList />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
