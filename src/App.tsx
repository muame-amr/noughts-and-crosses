import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Board from "./pages/Board";
import HomePage from "./pages/HomePage";
import RoomFullPage from "./pages/RoomFullPage";

function App() {
	return (
		<BrowserRouter>
			<div className="flex justify-center items-center h-screen">
				<Routes>
					<Route path="" element={<Navigate to="/" />} />
					<Route path="/" element={<HomePage />} />
					<Route path="/game" element={<Board />} />
					<Route path="/room-full" element={<RoomFullPage />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
