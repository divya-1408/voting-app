// src/components/ResultsPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ResultsPage.css';

const ResultsPage = () => {
    const navigate = useNavigate();
    const votes = JSON.parse(sessionStorage.getItem('votes')) || [];

    const handleClose = () => {
        navigate('/');
    };

    return (
        <div className="results-page">
            <h1>Result Day</h1>
            <div className="candidates-container">
                {votes.map((candidate, index) => (
                    <div key={candidate.id} className="candidate">
                        {candidate.imgUrl && (
                            <img src={candidate.imgUrl} alt={candidate.name} className="candidate-img" />
                        )}
                        <h2>{candidate.name}</h2>
                        <p>Total Votes: {candidate.votes}</p>
                    </div>
                ))}
            </div>
            <br>
            
            
            </br>
            <button className="close-button" onClick={handleClose}>Close</button>
        </div>
    );
};

export default ResultsPage;
