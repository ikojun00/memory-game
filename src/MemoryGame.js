import React, { useState, useEffect } from 'react';
import './index.css';

const MemoryGame = () => {
  const symbols = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [counter, setCounter] = useState(0);
  const [bestScore, setBestScore] = useState(
    () => parseInt(localStorage.getItem('bestScore')) || Infinity
  );

  useEffect(() => {
    setCards(symbols);
  }, []);

  const shuffleCards = () => {
    const shuffledCards = symbols.sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
  };

  const handleCardClick = (index) => {
    if (flippedCards.includes(cards[index])) {
      if (counter > bestScore) {
        localStorage.setItem('bestScore', counter);
        setBestScore(counter);
      }
      setCounter(0);
      setFlippedCards([]);
      return;
    }

    setFlippedCards([...flippedCards, cards[index]]);
    setCounter((prevCounter) => prevCounter + 1);
    shuffleCards();
  };

  return (
    <div className="memory-game">
      <div className="score">
        Current Score: {counter} | Best Score: {bestScore}
      </div>
      {cards.map((card, index) => (
        <div
          key={index}
          className="card"
          onClick={() => handleCardClick(index)}
        >
          {card}
        </div>
      ))}
    </div>
  );
};

export default MemoryGame;