import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminForm from './components/AdminForm';
import CandidateProfiles from './components/CandidateProfiles';
import VotePage from './components/VotePage';
import ResultsPage from './components/ResultsPage';
import './App.css';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<AdminForm />} />
                <Route path="/candidates" element={<CandidateProfiles />} />
                <Route path="/vote" element={<VotePage />} />
                <Route path="/results" element={<ResultsPage />} />
            </Routes>
        </div>
    );
}

export default App;
