import './xo.css';
import React, { useState } from 'react';
import circle from '../assets/R.jpg';
import cros from '../assets/OIP (1).jpg';

const Game = () => {
    const [board, setBoard] = useState(Array(9).fill(null)); // Initialize board state
    const [isXNext, setIsXNext] = useState(true); // Track current player
    const [winner, setWinner] = useState(null); // Track winner

    // Function to handle cell click
    const handleClick = (index) => {
        if (board[index] || winner) return; // Ignore if cell is filled or game has ended

        const newBoard = board.slice();
        newBoard[index] = isXNext ? 'x' : 'o';
        setBoard(newBoard);
        setIsXNext(!isXNext);
        checkWinner(newBoard);
    };

    // Function to check for winner
    const checkWinner = (board) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let [a, b, c] of lines) {
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                setWinner(board[a]);
                return;
            }
        }

        if (board.every(cell => cell)) {
            setWinner('draw');
        }
    };

    // Function to reset the game
    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setIsXNext(true);
        setWinner(null);
    };

    return (
        <div className='container'>
          {winner ? (
    <h1 className="title">
        {winner === 'draw' ? (
            "It's a draw!"
        ) : (
            <>
                Congratulations <span>{winner.toUpperCase()}</span> won!
            </>
        )}
    </h1>
) : (
    <h1 className="title">
        Tic Tac Toe game <span>xo-game</span>
    </h1>
)}

            <div className="board">
                {board.map((value, index) => (
                    <div
                        key={index}
                        className="boxes"
                        onClick={() => handleClick(index)}
                    >
                        {value === 'x' && <img src={cros} alt="X" />}
                        {value === 'o' && <img src={circle} alt="O" />}
                    </div>
                ))}
            </div>
          
            <button className="reset" onClick={resetGame}>Reset</button>
        </div>
    );
};

export default Game;
