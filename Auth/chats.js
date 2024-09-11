const express = require("express");
const db_client = require("../db_client");

let router = express.Router();

// for fetching chats with a user
router.get("/chats/fetch", (req, res) => {
  let user1 = req.query.user1;
  let user2 = req.query.user2;

  console.log("Request body is : ", req.body);

  let query = `SELECT * FROM msgstore WHERE (sender = '${user1}' and receiver = '${user2}') or (sender = '${user2}' and receiver = '${user1}') ORDER BY msgtime DESC;`;
  console.log("Running query is: ", query);

  db_client
    .query(query)
    .then((result) => {
      res.json(result.rows).status(200);
    })
    .catch((err) => res.json(err).status(500));
});

module.exports = router;
