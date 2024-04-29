import React, { useState } from "react";
import { CellValue } from "../utils/type";
import { calculateWinner } from "../utils/game";
import { useNavigate } from "react-router-dom";
import useQueue from '../hooks/useQueue';

interface SquareProps {
	value: CellValue;
	onClick: () => void;
}

const Square: React.FC<SquareProps> = ({ value, onClick }) => {
	return (
		<button
			type="button"
			onClick={onClick}
			className={`h-20 w-20 border-2 border-gray-500 font-bold text-4xl flex items-center justify-center p-2 ${value === 'X'
				? 'text-blue-500'
				: value === 'O'
					? 'text-red-500'
					: ''
				} `}
		>
			{value || ""}
		</button>
	);
};

const Board: React.FC = () => {
	const navigate = useNavigate();
	const [squares, setSquares] = useState<CellValue[]>(Array(9).fill(null));
	const [currentPlayer, setCurrentPlayer] = useState<CellValue>("X");
	const [winner, setWinner] = useState<CellValue | null | "draw">(null);
	const [specialMode, setSpecialMode] = useState<boolean>(false);
	const [gameStarted, setGameStarted] = useState<boolean>(false);
	const { enqueue, dequeue, peek } = useQueue<number>();

	const handleClick = (i: number) => {
		if (squares[i] || winner) return; // Prevent a box being selected twice

		const newSquares = squares.slice();

		if (specialMode) {
			const maxCount = 3;
			const currCount = newSquares.filter((val) => val === currentPlayer).length;

			if (currCount >= maxCount) {
				// const oldestIndex = newSquares.indexOf(currentPlayer === 'X' ? 'X' : 'O');
				const oldestIndex: number = peek()!;
				if (oldestIndex !== -1) {
					newSquares[oldestIndex] = null;
					dequeue();
				}
			}

			enqueue(i);
		}

		newSquares[i] = currentPlayer;
		setSquares(newSquares);
		setGameStarted(true);

		const newWinner = calculateWinner(newSquares);
		if (newWinner) {
			setWinner(newWinner);
		} else if (!newSquares.includes(null)) {
			setWinner("draw");
		} else {
			setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
		}
	};

	const renderSquare = (i: number) => (
		<Square value={squares[i] || null} onClick={() => handleClick(i)} />
	);

	let status;
	if (winner === "draw") {
		status = "It's a draw!";
	} else if (winner) {
		status = `Winner: ${winner}`;
	} else {
		status = `Next player: ${currentPlayer}`;
	}

	const resetGame = () => {
		setSquares(Array(9).fill(null));
		setCurrentPlayer("X");
		setWinner(null);
		setGameStarted(false);
	};

	return (
		<div>
			<div className="mb-4 text-xl font-bold flex flex-col justify-between items-center gap-y-4">
				<span>{status}</span>
				<label className="relative inline-flex items-center cursor-pointer">
					<input
						type="checkbox"
						checked={specialMode}
						onChange={() => !gameStarted && setSpecialMode(!specialMode)} // Add condition to only allow toggling when the game hasn't started
						className="sr-only peer"
						disabled={gameStarted} // Disable the switch when the game has started
					/>
					<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
					<span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
						Special Mode
					</span>
				</label>
			</div>
			<div className="grid grid-cols-3 gap-2">
				{Array.from(Array(9), (_, i) => renderSquare(i))}
			</div>
			{(winner === "draw" || winner) && (
				<button
					type="button"
					onClick={resetGame}
					className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
				>
					Rematch
				</button>
			)}
			<button
				type="button"
				onClick={() => navigate('/')}
				className="mt-4 ml-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
			>
				Back to Home
			</button>
		</div>
	);
};

export default Board;
