import { Link } from "react-router-dom";
import Modal from "../components/Modal";
import Multiplayer from "../components/Multiplayer";
import { useState } from "react";

const HomePage: React.FC = () => {
	const [showModal, setShowModal] = useState(false);

	const openModal = () => {
		setShowModal(true);
	};

	const closeModal = () => {
		setShowModal(false);
	};

	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<h1 className="text-4xl font-bold mb-8">Tic Tac Toe</h1>
			<div className="flex flex-col space-y-4">
				<Link
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
					to={"/game"}
				>
					New Game
				</Link>
				<button
					className="bg-gray-400 text-white font-bold py-2 px-4 rounded opacity-50"
					onClick={openModal}
				>
					Play with Friend
				</button>
				<Modal isOpen={showModal} onClose={closeModal}>
					<div className="text-center">
						<h2 className="text-2xl font-bold mb-4">Play with Friend</h2>
						<Multiplayer />
					</div>
				</Modal>
			</div>
		</div>
	);
};

export default HomePage;
