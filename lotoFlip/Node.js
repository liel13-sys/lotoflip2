const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });
let activeUsers = 0;

wss.on('connection', function connection(ws) {
    activeUsers++;
    broadcast({ type: 'activeUsers', count: activeUsers });

    ws.on('message', function incoming(message) {
        const data = JSON.parse(message);

        if (data.type === 'newUser') {
            ws.username = data.username;
        } else if (data.type === 'userLeft') {
            activeUsers--;
            broadcast({ type: 'activeUsers', count: activeUsers });
        } else {
            broadcast({ username: data.username, message: data.message });
        }
    });

    ws.on('close', function () {
        activeUsers--;
        broadcast({ type: 'activeUsers', count: activeUsers });
    });
});

function broadcast(data) {
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
}
console.log("Mostrando mensagem:", message);