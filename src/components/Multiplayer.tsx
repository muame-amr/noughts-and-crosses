import { useNavigate } from "react-router-dom";

const Multiplayer: React.FC = () => {
    const [roomId, setRoomId] = useState<string | null>(null);
    const navigate = useNavigate();

    const createRoom = () => {
        const ws = new WebSocket('ws://localhost:8080');

        ws.onopen = () => {
            ws.send(JSON.stringify({ type: "CREATE_ROOM" }));
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);

            if (data.type === "ROOM_CREATED") {
                setRoomId(data.roomId);
                navigate(`game?roomId=${data.roomId}`);
            }
        }
    };

    return (<></>);
};

export default Multiplayer;