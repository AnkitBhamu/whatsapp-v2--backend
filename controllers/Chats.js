function fetch_chats(data, socket, db_client) {
  let user1 = data[0];
  let user2 = data[1];
  let query = `SELECT * FROM msgstore WHERE (sender = '${user1}' and receiver = '${user2}') or (sender = '${user2}' and receiver = '${user1}') ORDER BY msgtime DESC;`;
  // console.log("Running query is: ", query);

  db_client
    .query(query)
    .then((result) => {
      socket.emit("chats_fetched", {
        users: [user1, user2],
        chats: result.rows,
      });
    })
    .catch((err) => console.log(err));
}

function get_user_status(mobile, socket, connections_live) {
  // console.log("user status request came :", mobile);
  if (connections_live.get(mobile)) {
    socket.emit("user_status", "online");
  } else {
    socket.emit("user_status", "offline");
  }
}

function all_msg_read(mobile, connections_live, db_client, socket) {
  // console.log("all message_read", mobile);
  if (connections_live.get(mobile)) {
    connections_live
      .get(mobile)
      .emit("all_msg_read", socket.handshake.auth.mobile);
  }

  let query = `UPDATE msgstore set msgread = true where sender = '${mobile}'  and receiver = '${socket.handshake.auth.mobile}';`;
  // console.log("queris : ", query);
  db_client
    .query(query)
    .then((response) => console.log("Successfully set"))
    .catch((err) => console.log(err));
}

function sendMsg(msg, connections_live, db_client) {
  let user_socket = connections_live.get(msg.receiver);
  if (user_socket) {
    // console.log("msg sent to the user");
    user_socket.emit("msg", msg);
  }

  // also add this message to the database;
  let query;
  let values;
  if (msg.msgtype === "text") {
    query = `INSERT INTO msgstore (sender,receiver,msg,msgtype,msgtime) VALUES ('${msg.sender}','${msg.receiver}','${msg.msg}','${msg.msgtype}','${msg.msgtime}' )`;
  } else {
    query = `INSERT INTO msgstore (sender,receiver,msg,msgtype,msgtime,media_data) VALUES ($1 ,$2,$3,$4,$5,$6)`;
    values = [
      msg.sender,
      msg.receiver,
      msg.msg,
      msg.msgtype,
      msg.msgtime,
      msg.media_data,
    ];
  }

  // console.log("query ran will be : ", query);
  db_client
    .query(query, values)
    .then(() => console.log("Message added to store!!"))
    .catch((err) => console.log(err));
}

module.exports = { fetch_chats, get_user_status, all_msg_read, sendMsg };
