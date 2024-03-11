const { WebSocketServer } = require('ws');

const ws = new WebSocketServer({ port: 4444 });

let clients = [];

ws.on('connection', (ws, req) => {
  const parts = req.url.split('/');
  const name = parts[parts.length - 1].trim();

  clients.push({ ws, name });

  ws.send(JSON.stringify({
    name: "moderator",
    content: `Welcome ${name}!`
  }));

  ws.on('close', () => {
    clients = clients.filter(client => client.name !== name);
  });

  ws.on('error', console.error);

  ws.on('message', data => {
    const content = data.toString();

    console.log(`Received message : ${content}`)

    clients
      .forEach(client => client.ws.send(JSON.stringify({
        name,
        content
      })));
  });
});
