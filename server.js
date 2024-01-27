const express = require('express');
const http = require('http');
const { Server: SocketIOServer } = require('socket.io');

const app = express();

// Enable CORS manually
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

const server = http.createServer(app);
const io = new SocketIOServer(server);
io.on('connection', socket => {
  // Handle other Socket.IO events here

  socket.on('draw', data => {
    socket.broadcast.emit('draw', data);
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Socket.IO server is running on port ${PORT}`);
});
