const http = require("http");
const express = require("express");
const { Server } = require("socket.io");
const dotenv = require("dotenv");
const cors = require("cors");
const db_client = require("./db_client");
const users = require("./Auth/users");
const chats = require("./Auth/chats");
const {
  sendVideoOffer,
  sendVideoAnswer,
  sendIceCandidates,
} = require("./controllers/Videocall");

const {
  fetch_chats,
  get_user_status,
  all_msg_read,
  sendMsg,
} = require("./controllers/Chats");

dotenv.config();

// lets connect to postgres database
db_client
  .connect()
  .then((resp) => console.log("We are connected to postgres database!!"))
  .catch((err) =>
    console.log("Error in connecting to the postgres database!!", err)
  );

let app = express();

// for reading json data
app.use(express.json());

// for handling cors errors
app.use(cors());

app.use("/api", users);
app.use("/api", chats);

// creating the http server
let httpServer = http.createServer();

// listening from the app
app.listen(process.env.EXPRESS_PORT, () =>
  console.log("App listening on port", process.env.EXPRESS_PORT)
);

// create the socket io client
let io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
  maxHttpBufferSize: 1e8,
});

// listen on httpserver
httpServer.listen(process.env.HTTP_PORT, () => {
  console.log("Http server listening on port 9000");
});
httpServer.on("error", (err) => console.log(err));

// number of users online
let connections_live = new Map();

io.on("connection", (socket) => {
  console.log("Client connected!");

  // added to the live_socket connections
  let mobile_client = socket.handshake.auth.mobile;
  connections_live.set(mobile_client, socket);

  socket.on("disconnect", (reason) => {
    if (connections_live.delete(mobile_client)) {
      console.log("Client removed from live_connection due to ", reason);
    }
  });

  socket.on("fetch_chats", (data) => {
    fetch_chats(data, socket, db_client);
  });

  socket.on("user_status", (mobile) => {
    get_user_status(mobile, socket, connections_live);
  });

  socket.on("get_status_user", (data) => {
    if (connections_live.get(data.mobile)) {
      socket.emit("status_answer", connections_live.get(data.mobile).connected);
    } else {
      socket.emit("status_answer", false);
    }
  });

  socket.on("all_msg_read", (mobile) => {
    all_msg_read(mobile, connections_live, db_client, socket);
  });

  socket.on("msg_status", (data) => {
    socket.emit("msg_status_answer", "not read");
  });

  socket.on("msg", (msg) => {
    console.log("msg came is : ", msg);
    sendMsg(msg, connections_live, db_client);
  });

  socket.on("video-offer", (offer) => {
    sendVideoOffer(offer, connections_live);
  });

  socket.on("video-answer", (answer) => {
    sendVideoAnswer(answer, connections_live);
  });

  socket.on("ice-candidate", (candidate) => {
    sendIceCandidates(candidate, connections_live);
  });
});
