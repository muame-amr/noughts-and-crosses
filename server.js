import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });
const rooms = {};

wss.on('connection', (ws) => {
    console.log('New client connected');

    ws.on('message', (message) => {
        const data = JSON.parse(message);
        console.log(data);

        if (data.type === "CREATE_ROOM") {
            const roomId = generateRoomId();
            rooms[roomId] = { players: [ws] };

            ws.send(JSON.stringify({ type: 'ROOM_CREATED', roomId }));
        } else if (data.type === "JOIN_ROOM") {
            const { roomId } = data;
            const room = rooms[roomId];

            if (room && room.players.length < 2) {
                room.players.push(ws);
                room.players.forEach((player) =>
                    player.send(JSON.stringify({ type: 'PLAYER_JOINED', roomId }))
                );
            } else {
                ws.send(JSON.stringify({ type: 'ROOM_FULL' }));
            }
        }

        ws.on('close', () => {
            console.log('Client Disconnected');

        });
    });
});

function generateRoomId() {
    return Math.random().toString(36).substring(2, 8);
}

console.log('WebSocket server is running on ws://localhost:8080');
