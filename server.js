const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const cors = require("cors");
app.use(cors());

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json("server is runnig");
});

io.on("connection", (socket) => {
  console.log(`User ${socket.id} connected`);

  // Listen for audio stream from client
  socket.on("audio", (stream) => {
    console.log("audio..");
    // Broadcast the stream to all other clients
    socket.broadcast.emit("audio", stream);
  });

  socket.on("disconnect", () => {
    console.log(`User ${socket.id} disconnected`);
  });
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
