/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import cors from 'cors';
import express from 'express';
import http from 'http';
import * as path from 'path';
import { Server } from 'socket.io';

const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(cors());
app.use(express.json());
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

const io = new Server(server, {
  cors: {
    // TODO localhost VS 127.0.0.1
    origin: 'http://localhost:4200',
  },
});

io.on('connection', (socket) => {
  console.log(`⚡: User ${socket.id} just connected!`);
  socket.on('mes  sage', (event) => {
    console.log('event: ', event);
    socket.broadcast.emit('ghost', {
      event,
      from: socket.id.slice(8),
    });
  });
  socket.on('disconnect', () => {
    console.log(`🔥: User ${socket.id} disconnected`);
  });
});

server.listen(PORT, () => {
  console.log(`Listening WS at ${PORT}`);
});

// app.get('/api', (req, res) => {
//   res.send({ message: 'Welcome to babylon-api!' });
// });

// const port = process.env.PORT || 3333;
// const server = app.listen(port, () => {
//   console.log(`Listening at http://localhost:${port}/api`);
// });
// server.on('error', console.error);
