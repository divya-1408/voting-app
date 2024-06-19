import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CandidateProfiles.css';

const CandidateProfiles = () => {
    const noOfCandidates = parseInt(sessionStorage.getItem('noOfCandidates'), 10);
    const candidateRole = sessionStorage.getItem('candidateRole');
    const initialCandidates = Array.from({ length: noOfCandidates }, (_, index) => ({
        id: index + 1,
        name: '',
        role: '',
        imgUrl: ''
    }));

    const [candidates, setCandidates] = useState(initialCandidates);

    const navigate = useNavigate();

    const handleChange = (index, field, value) => {
        const newCandidates = [...candidates];
        newCandidates[index][field] = value;
        setCandidates(newCandidates);
    };

    const handleSubmit = () => {
        sessionStorage.setItem('candidates', JSON.stringify(candidates));
        navigate('/vote');
    };

    const handleVote = (id) => {
        alert(`Candidate ${id} updated`);
    };


    return (
        <div className="candidate-profiles">
            <h1>Candidate Registration for {candidateRole}</h1>
            <br> 
            
            </br>
            <div className="candidates-container">
                {candidates.map((candidate, index) => (
                    <div key={candidate.id} className="candidate">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleChange(index, 'imgUrl', URL.createObjectURL(e.target.files[0]))}
                        />
                        {candidate.imgUrl && (
                            <img src={candidate.imgUrl} alt={`Candidate ${index + 1}`} className="candidate-img" />
                        )}
                        <input
                            type="text"
                            placeholder="Name"
                            value={candidate.name}
                            onChange={(e) => handleChange(index, 'name', e.target.value)}
                            className="candidate-input"
                        />
                        <button className="upd" type="button" onClick={() => handleVote(candidate.id)}>
                            Update
                        </button>
                    </div>
                ))}
            </div>
            <button className="final-submit" onClick={handleSubmit}>Submit All</button>
        </div>
    );
};

export default CandidateProfiles;