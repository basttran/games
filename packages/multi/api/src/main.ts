/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';
import cors from 'cors';
import http from 'http'; 
import { Server } from 'socket.io';

const app = express();
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`Listening at http://localhost:${PORT}/api`);
// });

// app.get('/api', (req, res) => {
//   res.json({ message: 'Welcome to multi-api!' });
// });

const io = new Server(server, {
  cors: {
    // TODO localhost VS 127.0.0.1
    origin: "http://127.0.0.1:4200",
  },
})

io.on("connection", (socket) => {
  console.log(`⚡: User ${socket.id} just connected!`);  socket.on("message", (body) => {
    socket.broadcast.emit("message", {
      body,
      from: socket.id.slice(8),
    });
  });
  socket.on('message', (event) => {
    console.log('event: ', event);
    console.log(`°|°: User ${socket.id} clicket at X: ${event.x} Y:${event.y}`);
  });
  socket.on('disconnect', () => {
    console.log(`🔥: User ${socket.id} disconnected`);
  });
});

server.listen(PORT, () => {
  console.log(`Listening WS at ${PORT}`)
});