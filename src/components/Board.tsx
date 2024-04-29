import React, { useState } from "react";
import { CellValue } from "../utils/type";
import { calculateWinner } from "../utils/game";

interface SquareProps {
	value: CellValue;
	onClick: () => void;
}

const Square: React.FC<SquareProps> = ({ value, onClick }) => (
	<button
		type="button"
		onClick={onClick}
		className={`h-20 w-20 border-2 border-gray-500 font-bold text-4xl flex items-center justify-center p-2 
			${value === "X" ? "text-blue-500" : value === "O" ? "text-red-500" : ""}`}
	>
		{value || ""}
	</button>
);

const Board: React.FC = () => {
	const [squares, setSquares] = useState<CellValue[]>(Array(9).fill(null));
	const [currentPlayer, setCurrentPlayer] = useState<CellValue>("X");
	const [winner, setWinner] = useState<CellValue | null | "draw">(null);

	const handleClick = (i: number) => {
		if (squares[i] || winner) return;

		const newSquares = squares.slice();
		newSquares[i] = currentPlayer;
		setSquares(newSquares);

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
	};

	return (
		<div>
			<div className="mb-4 text-xl font-bold">{status}</div>
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
		</div>
	);
};

export default Board;
