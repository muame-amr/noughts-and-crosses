import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
    const navigate = useNavigate();

    const startNewGame = () => {
        navigate('/game');
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold mb-8">Tic Tac Toe</h1>
            <div className="flex flex-col space-y-4">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={startNewGame}
                >
                    New Game
                </button>
                <button
                    className="bg-gray-400 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed"
                    disabled
                >
                    Play with Friend
                </button>
            </div>
        </div >
    );
};

export default HomePage;