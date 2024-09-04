import { useNavigate } from "react-router-dom";

const Multiplayer: React.FC = () => {
	const navigate = useNavigate();

	const createRoom = () => {
		const ws = new WebSocket("ws://localhost:8080");

		ws.onopen = () => {
			ws.send(JSON.stringify({ type: "CREATE_ROOM" }));
		};

		ws.onmessage = (event) => {
			const data = JSON.parse(event.data);

			if (data.type === "ROOM_CREATED") {
				navigate(`game?roomId=${data.roomId}`);
			}
		};
	};

	const joinRoom = () => {
		const roomIdInput = window.prompt("Enter room ID");

		if (roomIdInput) {
			const ws = new WebSocket("ws://localhost:8080");

			ws.onopen = () => {
				ws.send(JSON.stringify({ type: "JOIN_ROOM", roomId: roomIdInput }));
			};

			ws.onmessage = (event) => {
				const data = JSON.parse(event.data);
				if (data.type === "ROOM_FULL") {
					navigate("/room-full");
				} else if (data.type === "PLAYER_JOINED") {
					navigate(`/game?roomId=${data.roomId}`);
				}
			};
		}
	};

	return (
		<div>
			<h2>Play with Friend</h2>
			<button onClick={createRoom}>Create Room</button>
			<button onClick={joinRoom}>Join Room</button>
		</div>
	);
};

export default Multiplayer;
