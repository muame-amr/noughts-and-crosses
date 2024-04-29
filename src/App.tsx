import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Board from "./components/Board";
import HomePage from "./components/HomePage";

function App() {
	return (
		<BrowserRouter>
			<div className="flex justify-center items-center h-screen">
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/game" element={<Board />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
