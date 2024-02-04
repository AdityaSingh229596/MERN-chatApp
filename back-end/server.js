const express = require('express');
const { createServer } = require('http'); // Use 'http' instead of 'node:http'
const { Server } = require('socket.io');
const dotenv = require('dotenv');

const app = express();
const server = createServer(app);
const io = new Server(server);
const chats= require('./Data/dummyData');
const connectDB = require('./config/connectDB');

app.use(express.json())
connectDB()
dotenv.config()

// Move the socket.io connection logic outside of the route handler
io.on('connection', (socket) => {
  console.log('a user connected');
});

app.get('/', (req, res) => {
  res.send('homepage')
 });

app.get('/api/chat', (req, res) => {
 res.json(chats)
});

app.get('/api/chat/:id', (req, res) => {
  const id=req.params.id
  const data=chats.find((c)=>c._id === id)
 res.json(data)
});

const PORT =process.env.PORT

server.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
