import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [flashcards, setFlashcards] = useState([]);

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

    const handleAddFlashcard = async () => {
        if (!question.trim() || !answer.trim()) {
            alert('Both question and answer are required.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/flashcards', { question, answer });
            setFlashcards([...flashcards, response.data]); // Add new flashcard to the list
            setQuestion('');
            setAnswer('');
            alert('Flashcard added successfully!');
        } catch (error) {
            console.error('Error adding flashcard:', error);
            alert('Failed to add flashcard. Please try again.');
        }
    };

    const handleDeleteFlashcard = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/flashcards/${id}`);
            setFlashcards(flashcards.filter(flashcard => flashcard.id !== id));
            alert('Flashcard deleted successfully!');
        } catch (error) {
            console.error('Error deleting flashcard:', error);
            alert('Failed to delete flashcard. Please try again.');
        }
    };

    return (
        <div className="container">
            <h1 className="heading">Admin Dashboard</h1>
            <div className="form-container">
                <input
                    type="text"
                    placeholder="Question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="input"
                />
                <input
                    type="text"
                    placeholder="Answer"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    className="input"
                />
                <button onClick={handleAddFlashcard} className="button">
                    Add Flashcard
                </button>
            </div>
            <div className="flashcard-list">
                {flashcards.map(flashcard => (
                    <div key={flashcard.id} className="flashcard">
                        <p><strong>Question:</strong> {flashcard.question}</p>
                        <p><strong>Answer:</strong> {flashcard.answer}</p>
                        <button onClick={() => handleDeleteFlashcard(flashcard.id)} className="button delete-button">
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;

