const http = require("http");
const express = require("express");
const { Server } = require("socket.io");
const dotenv = require("dotenv");
const cors = require("cors");
const { Client } = require("pg");
const db_client = require("./db_client");
const users = require("./Auth/users");
const chats = require("./Auth/chats");

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

// handling websockets thing
let connections_live = new Map();

io.on("connection", (socket) => {
  console.log("Client came!");

  // added to the live_socket connections
  let mobile_client = socket.handshake.auth.mobile;
  connections_live.set(mobile_client, socket);

  socket.on("disconnect", (reason) => {
    if (connections_live.delete(mobile_client)) {
      console.log("Client removed from live_connection due to ", reason);
    }
  });

  socket.on("user_status", (mobile) => {
    console.log("user status request came :", mobile);
    if (connections_live.get(mobile)) {
      socket.emit("user_status", "online");
    } else {
      socket.emit("user_status", "offline");
    }
  });

  // client asks for status of a user
  socket.on("get_status_user", (data) => {
    if (connections_live.get(data.mobile)) {
      socket.emit("status_answer", connections_live.get(data.mobile).connected);
    } else {
      socket.emit("status_answer", false);
    }
  });

  socket.on("all_msg_read", (mobile) => {
    // means the user is live notify him that all msgs are read
    console.log("all message_read", mobile);
    if (connections_live.get(mobile)) {
      connections_live
        .get(mobile)
        .emit("all_msg_read", socket.handshake.auth.mobile);
    }
  });

  // getting the message status of the chat
  socket.on("msg_status", (data) => {
    socket.emit("msg_status_answer", "not read");
  });

  //  client on sending msg to a user
  socket.on("msg", (msg) => {
    // sending this to the user if he/she is online and then adding it to msgstore table
    console.log("msg came is : ", msg);
    sendMsg(msg);
  });
});

function sendMsg(msg) {
  let user_socket = connections_live.get(msg.receiver);

  if (user_socket) {
    console.log("msg sent to the user");
    user_socket.emit("msg", msg);
  }

  // also add this message to the database;
  let query = `INSERT INTO msgstore (sender,receiver,msg,msgtype,msgtime) VALUES ('${msg.sender}','${msg.receiver}','${msg.msg}','${msg.msgtype}','${msg.msgtime}' )`;

  console.log("query ran will be : ", query);
  db_client
    .query(query)
    .then(() => console.log("Message added to store!!"))
    .catch((err) => console.log(err));
}
