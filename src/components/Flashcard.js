import React from 'react';
import './Flashcard.css';

const Flashcard = ({ question, answer, isFlipped, handleFlip }) => {
    return (
        <div className="flashcard" onClick={handleFlip}>
            <div className={`flashcard-content ${isFlipped ? 'flipped' : ''}`}>
                <div className="flashcard-front">
                    {question}
                </div>
                <div className="flashcard-back">
                    {answer}
                </div>
            </div>
        </div>
    );
};

export default Flashcard;
