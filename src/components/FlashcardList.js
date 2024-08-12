import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Flashcard from './Flashcard';
import './FlashcardList.css';
import { FaArrowRightLong } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";

const FlashcardList = () => {
    const [flashcards, setFlashcards] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    useEffect(() => {
        const fetchFlashcards = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/flashcards');
                setFlashcards(response.data);
            } catch (error) {
                console.error('Error fetching flashcards:', error);
            }
        };
        fetchFlashcards();
    }, []);

    const handleFlip = () => setIsFlipped(!isFlipped);
    const handleNext = () => {

        setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
    };
    const handlePrevious = () => {

        setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
    };

    if (flashcards.length === 0) return <div>Loading...</div>;

    const { question, answer } = flashcards[currentIndex];

    return (
        <div className="flashcard-list-container">
            <Flashcard
                question={question}
                answer={answer}
                isFlipped={isFlipped}
                handleFlip={handleFlip}
            />
            <div className="button-container">
                <button className="flashcard-button" onClick={handleNext}>Next <br></br><FaArrowRightLong /></button>
                <button className="flashcard-button" onClick={handlePrevious}> Previous<br></br><FaArrowLeft /></button>

            </div>
        </div>
    );
};

export default FlashcardList;
