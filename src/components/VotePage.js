import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './VotePage.css';

const VotePage = () => {
    const navigate = useNavigate();
    const candidateRole = sessionStorage.getItem('candidateRole');
    const candidates = JSON.parse(sessionStorage.getItem('candidates')) || [];
    const initialVotes = candidates.map(candidate => ({ ...candidate, votes: 0 }));

    const [votes, setVotes] = useState(initialVotes);
    const [totalVotes, setTotalVotes] = useState(0);
    const [isVotingDisabled, setIsVotingDisabled] = useState(false);

    useEffect(() => {
        const savedVotes = JSON.parse(sessionStorage.getItem('votes'));
        if (savedVotes) {
            setVotes(savedVotes);
            setTotalVotes(savedVotes.reduce((acc, candidate) => acc + candidate.votes, 0));
        }
    }, []);
    

    const handleVote = (index) => {
        if (isVotingDisabled) return;

        const newVotes = [...votes];
        newVotes[index].votes += 1;
        setVotes(newVotes);
        sessionStorage.setItem('votes', JSON.stringify(newVotes));
        setTotalVotes(totalVotes + 1);

        setIsVotingDisabled(true);
        setTimeout(() => {
            setIsVotingDisabled(false);
        }, 5000);
    };

    const handleBack = () => {
        navigate('/candidate-profiles');
    };

    const setPassword = sessionStorage.getItem('setPassword');

    const handleResult = () => {
        const password = prompt('Please enter the admin password:');
        if (password === setPassword) {
            navigate('/results');
        } else {
            alert('Incorrect password. Access denied.');
        }
    };


    return (
        <div className="vote-page">
            <h1>Election Day</h1>
            <h2>Choose the Candidate for {candidateRole}</h2>
            <div className="candidates-container">
                {votes.map((candidate, index) => (
                    <div key={candidate.id} className="candidate">
                        {candidate.imgUrl && (
                            <img src={candidate.imgUrl} alt={candidate.name} className="candidate-img" />
                        )}
                        <h2>{candidate.name}</h2>
                        <p>{candidate.role}</p>
                        <button onClick={() => handleVote(index)} disabled={isVotingDisabled}>
                            {isVotingDisabled ? 'Voting disabled' : 'Vote'}
                        </button>
                    </div>
                ))}
            </div>
            <div className="vote-summary">
                <h4>Total Votes Cast: {totalVotes}</h4>
            </div>
            <div className="buttons-container">
            <button className="back-button" onClick={handleBack}>close</button>
            <div className="spacer"></div>
                <button className="result-button" onClick={handleResult}>Result</button>
            </div>
        </div>
    );
};

export default VotePage;
