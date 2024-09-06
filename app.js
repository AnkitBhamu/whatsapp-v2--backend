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

  // client asks for status of a user
  socket.on("get_status_user", (data) => {
    if (connections_live.get(data.mobile)) {
      socket.emit("status_answer", connections_live.get(data.mobile).connected);
    } else {
      socket.emit("status_answer", false);
    }
  });

  //  client on sending msg to a user
});
